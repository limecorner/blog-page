<template>
  <div class="max-w-4xl px-10 py-6 bg-white rounded-lg shadow-md">
    <div class="flex justify-between items-center">
      <span class="font-light text-gray-600">{{
        relativeTimeFromNow(data.createdAt)
      }}</span>
      <a
        class="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500"
        href="#"
        >{{ data.Category.name }}</a
      >
    </div>
    <div class="mt-2">
      <div class="flex justify-between">
        <a class="text-2xl text-gray-700 font-bold hover:underline" href="#">{{
          data.title
        }}</a>
        <p class="mt-2 text-orange-500">{{ data.permission }}</p>
      </div>
      <p class="mt-2 text-gray-600">{{ data.content }}</p>
    </div>
    <div class="flex justify-between items-center mt-4">
      <router-link
        :to="{ name: 'article', params: { id: data.id } }"
        class="text-blue-500 hover:underline"
        href="#"
        >Read more</router-link
      >
      <div>
        <a class="flex items-center" href="#">
          <!-- <img
            class="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
            :src="data.image"
            alt="avatar"
          /> -->
          <h1 class="text-gray-700 font-bold hover:underline">
            {{ data.User.name }}
          </h1>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { relativeTimeFromNow } from './../utils/helpers'

export default {
  data() {
    return {
      relativeTimeFromNow
    }
  },
  props: ['data']
}
</script>
