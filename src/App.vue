<template>
  <div id="app" class="font-roboto bg-gray-100 h-full">
    <div class="h-full">
      <navbar />
      <router-view />
    </div>
    <simple-footer class="footer" />
  </div>
</template>

<script>
import Navbar from './components/navigation-navbar-simple.vue'
import SimpleFooter from './components/navigation-footer-simple-with-icon.vue'

export default {
  name: 'app',
  components: {
    Navbar,
    SimpleFooter
  }
}
</script>

<style>
@import 'assets/css/app.css';

::-webkit-scrollbar {
  width: 5px;
}

/* ::-webkit-scrollbar-track {
  background: #2d3748;
} */

::-webkit-scrollbar-thumb {
  background: darkgrey;
}

::-webkit-scrollbar-thumb:hover {
  background: #2d3748;
}

html,
body {
  height: 100%;
  margin: 0;
}
.footer {
  height: 50px;
  margin-top: -50px;
}
</style>
