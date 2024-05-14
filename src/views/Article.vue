<template>
  <div class="font-roboto bg-gray-100">
    <div class="px-6 py-8">
      <div class="flex justify-center container mx-auto">
        <div class="w-full lg:w-8/12">
          <div class="mt-6">
            <div class="max-w-4xl px-10 py-6 bg-white rounded-lg shadow-md">
              <h1 class="text-4xl text-gray-700 font-bold hover:underline">
                {{ article.title }}
              </h1>
              <!-- <div>
                <a class="flex items-center" href="#">
                  <img
                    class="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
                    :src="article.image"
                    alt="avatar"
                  />
                </a>
              </div> -->
              <div class="">
                <h2 class="text-gray-700 font-bold hover:underline">
                  {{ article.User.name }}
                </h2>

                <!-- <a
                  class="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500"
                  href="#"
                  >{{ article.Category.name }}</a
                > -->
              </div>
              <div class="flex justify-between items-center">
                <span class="font-light text-gray-600">{{
                  relativeTimeFromNow(article.createdAt)
                }}</span>
                <a
                  class="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500"
                  href="#"
                  >{{ article.Category.name }}</a
                >
              </div>
              <div class="mt-2">
                <div class="">
                  <p class="mt-2 text-orange-500">
                    觀看權限: {{ article.permission }}
                  </p>
                </div>
                <p class="mt-2 text-gray-600">{{ article.content }}</p>
              </div>
              <div class="flex justify-between items-center mt-4">
                <p class="mt-2 text-gray-600">{{ article.clapCount }}</p>
                <div>
                  <button
                    class="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 mr-5"
                  >
                    <router-link
                      :to="{ name: 'edit-article', params: { id: article.id } }"
                      >編輯</router-link
                    >
                  </button>

                  <button
                    @click.stop.prevent="removeArticle(article.id)"
                    class="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-lg hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-80"
                  >
                    刪除
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-for="{ content, id, createdAt, User } in article.Responses"
        :key="id"
        class="flex justify-center container mx-auto"
      >
        <div class="w-full lg:w-8/12">
          <div class="mt-6">
            <div class="max-w-4xl px-10 py-6 bg-white rounded-lg shadow-md">
              <!-- <div>
                <a class="flex items-center" href="#">
                  <img
                    class="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
                    :src="article.image"
                    alt="avatar"
                  />
                </a>
              </div> -->

              <div class="">
                <h2 class="text-gray-700 font-bold hover:underline">
                  {{ User.name }}
                </h2>
                <span class="font-light text-gray-600">{{
                  relativeTimeFromNow(createdAt)
                }}</span>
              </div>
              <h1 class="text-4xl text-gray-700 font-bold hover:underline">
                {{ content }}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import articlesAPI from './../apis/articles'
import { Toast, relativeTimeFromNow } from './../utils/helpers'

export default {
  name: 'Article',

  data() {
    return {
      article: {
        Category: {
          name: ''
        },
        Responses: [
          {
            User: {
              name: ''
            }
          }
        ],
        User: {
          name: ''
        }
      },
      relativeTimeFromNow,
      isDeleteProcessing: false
    }
  },
  created() {
    const { id } = this.$route.params
    this.fetchArticle(id)
  },
  methods: {
    async fetchArticle(id) {
      try {
        this.isLoading = true
        const { data } = await articlesAPI.getArticle({ id })
        this.article = data.article
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法閱讀此文章，請稍後再試'
        })
      }
    },
    async removeArticle(id) {
      try {
        this.isDeleteProcessing = true
        const { data } = await articlesAPI.deletArticle(id)

        if (data.success === true) {
          Toast.fire({
            icon: 'success',
            title: '刪除文章成功'
          })
          setTimeout(() => this.$router.push('/articles'), 1000)
        }
      } catch (error) {
        this.isDeleteProcessing = false
        const errorMessage = error.response.data.message
        Toast.fire({
          icon: 'error',
          title: errorMessage ? errorMessage : '無法刪除文章，請稍後再試'
        })
      }
    }
  }
}
</script>

<style></style>
