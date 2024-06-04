<template>
  <div class="max-w-4xl px-10 py-6 bg-white rounded-lg shadow-md">
    <div class="flex justify-between items-center">
      <span class="font-light text-gray-600">{{
        relativeTimeFromNow(data.createdAt)
      }}</span>
      <router-link
        :to="{ name: 'categories', params: { id: data.Category.id } }"
        class="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500"
      >
        {{ data.Category.name }}
      </router-link>
    </div>
    <div class="mt-2">
      <div class="flex justify-between">
        <a class="text-2xl text-gray-700 font-bold">{{ data.title }}</a>
        <p class="mt-2 text-orange-500">{{ data.permission }}</p>
      </div>
      <p class="mt-2 text-gray-600 truncate">{{ data.content }}</p>
    </div>
    <div class="flex justify-between items-center mt-4">
      <router-link
        :to="{ name: 'article', params: { id: data.id } }"
        class="text-blue-500 hover:underline"
        >Read more</router-link
      >
      <div>
        <a class="flex items-center">
          <!-- <img
            class="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
            :src="data.image"
            alt="avatar"
          /> -->
          <h1 class="text-gray-700 font-bold cursor-auto">
            {{ data.User.name }}
          </h1>
          <template v-if="currentUser.id !== data.User.id">
            <button
              v-if="isIdol(data.User.id)"
              @click.stop.prevent="removeIdol(data.User.id)"
              class="ml-3 px-2 py-1 font-medium tracking-wide text-green-500 capitalize transition-colors duration-300 transform border border-green-500 rounded-lg hover:border-green-700 hover:text-green-700"
            >
              Following
            </button>
            <button
              v-else
              @click.stop.prevent="addIdol(data.User)"
              class="ml-3 px-2 py-1 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-600 rounded-lg hover:bg-green-400"
            >
              Follow
            </button>
          </template>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { relativeTimeFromNow } from './../utils/helpers'
import followshipsAPI from './../apis/followships'
import { Toast } from './../utils/helpers'

export default {
  data() {
    return {
      relativeTimeFromNow
    }
  },
  methods: {
    async addIdol({ id, name }) {
      try {
        const { data } = await followshipsAPI.postIdol(id)
        if (data.success === true) {
          this.currentUser.Idols.push({ id, name })
          Toast.fire({
            icon: 'success',
            title: '成功追蹤此偶像'
          })
        }
      } catch (error) {
        const errorMessage = error.response.data.message
        Toast.fire({
          icon: 'error',
          title: errorMessage ? errorMessage : '無法追蹤此偶像，請稍後再試'
        })
      }
    },
    async removeIdol(id) {
      try {
        const { data } = await followshipsAPI.deleteIdol(id)
        if (data.success === true) {
          this.currentUser.Idols = this.currentUser.Idols.filter(
            (idol) => idol.id !== id
          )
          Toast.fire({
            icon: 'success',
            title: '成功取消追蹤此偶像'
          })
        }
      } catch (error) {
        const errorMessage = error.response.data.message
        Toast.fire({
          icon: 'error',
          title: errorMessage ? errorMessage : '無法取消追蹤此偶像，請稍後再試'
        })
      }
    },
    isIdol(idolId) {
      const index = this.currentUser.Idols.findIndex(
        (idol) => idol.id === idolId
      )
      return index !== -1
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },

  props: ['data']
}
</script>
