<template>
  <b-container fluid="true">
    <vmsui-navbar/>
    <router-view />
  </b-container>
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
