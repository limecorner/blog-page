<template>
  <div class="font-roboto bg-gray-100 overflow-auto" style="height: 80%;">
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
import articlesAPI from '../apis/articles'
import { Toast } from '../utils/helpers'

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
      isLoading: false,
      posts: []
    }
  },
  methods: {
    async fetchArticles(categoryId) {
      try {
        this.isLoading = true
        const queryString = categoryId ? `?categoryId=${categoryId}` : ''
        const { data } = await articlesAPI.getArticles(queryString)
        if (data.success === true) {
          this.posts = data.articles
        }

        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法取得文章，請稍後再試'
        })
      }
    }
  },
  created() {
    const { id } = this.$route.params
    this.fetchArticles(id)
  }
}
</script>

<style scoped>
@import '../assets/css/app.css';

/* .post-container {
  height: 800px;
  overflow: auto;
} */
</style>
