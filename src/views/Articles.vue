<template>
  <div
    class="font-roboto bg-gray-100 overflow-scroll"
    style="height: 80%;"
    @scroll="handleScroll"
  >
    <div class="px-6 py-8">
      <div class="flex justify-between container mx-auto">
        <div class="w-full lg:w-8/12">
          <div class="flex items-center justify-between">
            <h1 class="text-xl font-bold text-gray-700 md:text-2xl">Post</h1>
            <!-- <post-filter></post-filter> -->
          </div>
          <div class="post-container">
            <div class="mt-6" v-for="post in posts" :key="post.id">
              <post :data="post"></post>
            </div>
            <p v-show="isLoading" class="mt-5 text-center">取得更多文章中</p>
          </div>
          <!-- <div class="mt-8">
            <Pagination></Pagination>
          </div> -->
        </div>
        <!-- <div class="-mx-8 w-4/12 hidden lg:block">
          <div class="px-8">
            <h1 class="mb-4 text-xl font-bold text-gray-700">Authors</h1>
            <users-list></users-list>
          </div>
          <div class="mt-10 px-8">
            <h1 class="mb-4 text-xl font-bold text-gray-700">Categories</h1>
            <categories></categories>
          </div>
          <div class="mt-10 px-8">
            <h1 class="mb-4 text-xl font-bold text-gray-700">Recent Post</h1>
            <recent-post></recent-post>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
// import PostFilter from './../components/elements-select-option.vue'
import Post from './../components/elements-blog-post-article-review.vue'
// import Pagination from './../components/elements-pagination.vue'
// import UsersList from './../components/sections-blog-users-list.vue'
// import Categories from './../components/sections-categories-list.vue'
// import RecentPost from './../components/sections-recent-article.vue'
import articlesAPI from './../apis/articles'
import { Toast } from './../utils/helpers'

export default {
  name: 'Articles',
  components: {
    // PostFilter,
    Post
    // Pagination,
    // UsersList,
    // Categories,
    // RecentPost
  },
  data() {
    return {
      posts: []
    }
  },
  methods: {
    async fetchArticles(limit, offset) {
      try {
        this.isLoading = true
        const queryString = `?limit=${limit}&offset=${offset}`

        const { data } = await articlesAPI.getArticles(queryString)
        console.log('dataQQ', data)
        if (data.success === true) {
          return data.articles
        }

        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法取得文章，請稍後再試'
        })
      }
    },
    async handleScroll(e) {
      // https://javascript.info/size-and-scroll
      let bottomOfWindow =
        e.srcElement.scrollTop + e.srcElement.clientHeight ===
        e.srcElement.scrollHeight

      if (bottomOfWindow) {
        const newArticles = await this.fetchArticles(3, this.posts.length)
        this.posts.push(...newArticles)
      }
    }
  },
  async created() {
    this.posts = await this.fetchArticles(3, 0)
  }
}
</script>

<style scoped>
/* @import '../assets/css/app.css'; */

/* .post-container {
  height: 800px;
  overflow: auto;
} */
</style>
