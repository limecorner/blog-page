<template>
  <div class="container py-3 mx-auto">
    <section class="bg-white dark:bg-gray-900">
      <div
        class="container flex items-center justify-center min-h-screen px-6 mx-auto"
      >
        <form class="w-full max-w-md" @submit.prevent.stop="handleSubmit">
          <div class="flex justify-center mx-auto">
            <img
              class="w-auto h-7 sm:h-8"
              src="https://merakiui.com/images/logo.svg"
              alt=""
            />
          </div>

          <div class="flex items-center justify-center mt-6">
            <router-link
              to="/signin"
              class="w-1/3 pb-4 font-medium text-center text-gray-500 capitalize border-b dark:border-gray-400 dark:text-gray-300"
            >
              sign in
            </router-link>

            <router-link
              to="/signup"
              class="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white"
            >
              sign up
            </router-link>
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
              id="name"
              v-model="name"
              name="name"
              placeholder="Username"
              type="text"
              required
              class="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div class="relative flex items-center mt-6">
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </span>

            <input
              id="email"
              v-model="email"
              name="email"
              placeholder="Email"
              type="email"
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
              id="password"
              v-model="password"
              name="password"
              placeholder="Password"
              type="password"
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
              id="passwordCheck"
              v-model="passwordCheck"
              name="passwordCheck"
              placeholder="Confirm Password"
              type="password"
              required
              class="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
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
              Sign Up
            </button>

            <div class="mt-6 text-center ">
              <router-link
                to="/signin"
                class="text-sm text-blue-500 hover:underline dark:text-blue-400"
              >
                Already have an account?
              </router-link>
            </div>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import authorizationAPI from './../apis/authorization'
import { Toast } from './../utils/helpers'
import LittleSpinner from './../components/little-spinner.vue'

export default {
  components: {
    LittleSpinner
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      passwordCheck: '',
      isProcessing: false
    }
  },
  methods: {
    async handleSubmit() {
      try {
        if (
          !this.name.trim() ||
          !this.email.trim() ||
          !this.password.trim() ||
          !this.passwordCheck.trim()
        ) {
          Toast.fire({
            icon: 'warning',
            title: '請確認已填寫所有欄位'
          })
          return
        }

        if (this.password !== this.passwordCheck) {
          Toast.fire({
            icon: 'error',
            title: '兩次輸入的密碼不同'
          })
          this.passwordCheck = ''
          return
        }

        this.isProcessing = true

        const { data } = await authorizationAPI.signUp({
          name: this.name,
          email: this.email,
          password: this.password,
          passwordCheck: this.passwordCheck
        })

        if (data.success === true) {
          Toast.fire({
            icon: 'success',
            title: data.message
          })
          this.$router.push('/signin')
        }
      } catch (error) {
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: `無法註冊 - ${error.response.data.message}`
        })
      }
    }
  }
}
</script>
