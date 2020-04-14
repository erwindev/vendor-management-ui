<template>
  <div id="app">
    <vmsui-navbar/>
    <b-container>
        <router-view />
   </b-container>
  </div>
</template>

<script>
import Navbar from '@/components/shared/Navbar.vue'
export default {
  name: 'app',
  components: {
    'vmsui-navbar': Navbar
  }
}
</script>

<style>
</style>
