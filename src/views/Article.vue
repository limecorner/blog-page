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
                <span class="font-light text-gray-600">{{
                  relativeTimeFromNow(article.createdAt)
                }}</span>
                <!-- <a
                  class="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500"
                  href="#"
                  >{{ article.Category.name }}</a
                > -->
              </div>
              <div class="mt-2">
                <div class="flex justify-between">
                  <p class="mt-2 text-orange-500">{{ article.permission }}</p>
                </div>
                <p class="mt-2 text-gray-600">{{ article.content }}</p>
                <p class="mt-2 text-gray-600">{{ article.clapCount }}</p>
              </div>
              <div class="flex justify-between items-center mt-4"></div>
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
      relativeTimeFromNow
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
    }
  }
}
</script>

<style></style>
