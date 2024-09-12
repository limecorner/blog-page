<template>
  <div class="container py-3 mx-auto overflow-auto" style="height: 80%;">
    <section class="bg-white dark:bg-gray-900">
      <div class="container flex items-center justify-center px-6 py-6 mx-auto">
        <form
          class="w-full max-w-md"
          @submit.prevent.stop="handleSubmit"
          enctype="multipart/form-data"
        >
          <div class="flex justify-center mx-auto">
            <img
              class="w-auto h-7 sm:h-8"
              src="https://merakiui.com/images/logo.svg"
              alt=""
            />
          </div>

          <div class="relative flex items-center mt-8">
            <span class="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </span>

            <input
              v-model="name"
              name="name"
              placeholder="使用者名稱"
              type="text"
              required
              class="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div class="relative flex items-center mt-4">
            <span class="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </span>

            <input
              id="bio"
              v-model="bio"
              name="bio"
              placeholder="自介"
              type="bio"
              class="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div class="mt-4">
            <label
              for="photo"
              class="block text-sm text-gray-500 dark:text-gray-300"
              >Photo</label
            >

            <input
              type="file"
              name="photo"
              class="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
              @change="handleFileChange"
            />

            <div class="flex justify-center items-center mt-4">
              <img
                :src="currentUser.photo"
                class="mx-4 w-20 h-20 object-cover rounded-full hidden sm:block"
              />
            </div>
          </div>

          <div class="mt-6">
            <LittleSpinner
              v-if="isProcessing"
              class="bg-blue-400 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            />
            <button
              v-else
              class="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            >
              編輯
            </button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import usersAPI from './../apis/users'
import { Toast } from './../utils/helpers'
import LittleSpinner from './../components/little-spinner.vue'
import store from './../store'

export default {
  components: {
    LittleSpinner
  },
  data() {
    return {
      name: '',
      bio: '',
      isProcessing: false
    }
  },
  methods: {
    async handleSubmit(e) {
      try {
        if (!this.name.trim()) {
          Toast.fire({
            icon: 'warning',
            title: '請確認已填寫所有欄位'
          })
          return
        }

        this.isProcessing = true

        const form = e.target
        const formData = new FormData(form)
        const { data } = await usersAPI.editUserInfo(
          this.currentUser.id,
          formData
        )
        await store.dispatch('fetchCurrentUser')
        if (data.success === true) {
          Toast.fire({
            icon: 'success',
            title: data.message
          })
          this.$router.push('/articles')
        }
      } catch (error) {
        console.log('error', error)
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: `編輯個人資料失敗`
        })
      }
    },
    handleFileChange(e) {
      const files = e.target.files
      if (files.length === 0) {
        // 使用者沒有選擇上傳的檔案
        this.currentUser.photo = ''
        return
      } else {
        // 否則產生預覽圖
        const imageURL = window.URL.createObjectURL(files[0])
        this.currentUser.photo = imageURL
      }
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  async created() {
    await store.dispatch('fetchCurrentUser')
    this.name = this.currentUser.name
    this.bio = this.currentUser.bio
  }
}
</script>
