<template>
  <div
    class="flex flex-col bg-white max-w-sm px-6 py-4 mx-auto rounded-lg shadow-md"
  >
    <ul class="-mx-4">
      <li class="flex items-center">
        <img
          class="w-10 h-10 object-cover rounded-full mx-4"
          :src="data.photo"
          alt="avatar"
        />
        <p>
          <a class="text-gray-700 font-bold mx-1">{{ data.name }}</a>
          <button
            @click.stop.prevent="removeIdol(data.id)"
            class="ml-3 px-2 py-1 font-medium tracking-wide text-green-500 capitalize transition-colors duration-300 transform  border border-green-500 rounded-lg hover:border-green-700 hover:text-green-700"
          >
            Following
          </button>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import followshipsAPI from './../apis/followships'
import { Toast } from './../utils/helpers'

export default {
  props: ['data'],
  methods: {
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
    }
  },
  computed: {
    ...mapState(['currentUser'])
  }
}
</script>
