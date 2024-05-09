<template>
  <div id="app" class="font-roboto bg-gray-100">
    <navbar></navbar>
    <router-view />

    <simple-footer></simple-footer>
  </div>
</template>

<script>
import Navbar from './components/navigation-navbar-simple'
import SimpleFooter from './components/navigation-footer-simple-with-icon'

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

::-webkit-scrollbar-track {
  background: #2d3748;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e0;
}

::-webkit-scrollbar-thumb:hover {
  background: #2d3748;
}
</style>
