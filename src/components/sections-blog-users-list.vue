<template>
  <div
    class="flex flex-col bg-white max-w-sm px-6 py-4 mx-auto rounded-lg shadow-md"
  >
    <ul class="-mx-4">
      <li class="flex items-center mt-6">
        <img
          class="w-10 h-10 object-cover rounded-full mx-4"
          src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80"
          alt="avatar"
        />
        <p>
          <a class="text-gray-700 font-bold mx-1 hover:underline" href="#"
            >Alex John</a
          >
          <span class="text-gray-700 text-sm font-light">Created 23 Posts</span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['data']
}
</script>
