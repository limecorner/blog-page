<template>
  <div class="font-roboto bg-gray-100 overflow-auto" style="height: 80%;">
    <div class="px-6 py-8">
      <div class="flex justify-between container mx-auto">
        <div class="w-full lg:w-8/12">
          <div class="flex items-center justify-between">
            <h1 class="text-xl font-bold text-gray-700 md:text-2xl">
              {{ currentUser.name }}
            </h1>
            <!-- <post-filter></post-filter> -->
          </div>
          <div class="post-container">
            <div class="mt-6" v-for="post in posts" :key="post.id">
              <post :data="post"></post>
            </div>
          </div>
        </div>
        <div class="-mx-8 w-4/12 hidden lg:block">
          <div class="px-8">
            <h1 class="mb-4 text-xl font-bold text-gray-700">
              {{ currentUser.name }}
            </h1>
            <p>{{ currentUser.Fans.length }} Followers</p>
            <p>{{ currentUser.bio }}</p>
          </div>
          <div class="mt-10 px-8">
            <h1 class="mb-4 text-xl font-bold text-gray-700">Following</h1>
            <!-- <users-list ></users-list> -->
            <div class="mt-6" v-for="idol in currentUser.Idols" :key="idol.id">
              <users-list :data="idol"></users-list>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import PostFilter from './../components/elements-select-option.vue'
import Post from './../components/elements-blog-post-article-review.vue'
import UsersList from './../components/sections-blog-users-list.vue'

import articlesAPI from './../apis/articles'
// import responsesAPI from './../apis/responses'
import { Toast } from './../utils/helpers'
import { mapState } from 'vuex'

export default {
  name: 'User',
  components: {
    // PostFilter,
    Post,
    UsersList
  },
  data() {
    return {
      posts: []
    }
  },
  methods: {
    async fetchArticles(userId) {
      try {
        this.isLoading = true
        const queryString = `?userId=${userId}`
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
    const { id: userId } = this.$route.params
    this.fetchArticles(userId)
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  }
}
</script>
