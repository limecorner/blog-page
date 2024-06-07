<template>
  <div class="font-roboto bg-gray-100 overflow-scroll" style="height: 80%;">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Post from './../components/elements-blog-post-article-review.vue'
import articlesAPI from './../apis/articles'
import { Toast } from './../utils/helpers'

export default {
  name: 'Articles',
  components: {
    Post
  },
  data() {
    return {
      posts: []
    }
  },
  methods: {
    async fetchArticles() {
      try {
        this.isLoading = true

        const { data } = await articlesAPI.getArticles()
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
    }
  },
  async created() {
    this.posts = await this.fetchArticles()
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
