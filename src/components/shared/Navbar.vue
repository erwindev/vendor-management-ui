<template>
    <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand :to="{name: 'home'}">VMS</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-item v-if="!isLoggedIn" :to="{name: 'login'}">Login</b-nav-item>
                  <b-nav-item v-if="isLoggedIn" :to="{name: 'dashboard'}">Dashboard</b-nav-item>
                  <b-nav-item-dropdown v-if="isLoggedIn" right>
                      <template v-slot:button-content>
                          User
                      </template>
                      <b-dropdown-item href="javascript:alert('My Profile')">Profile</b-dropdown-item>
                      <b-dropdown-item href="#" @click="logout()">Logout</b-dropdown-item>
                  </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
export default {
  name: 'vmsui-navbar',
  computed: {
    isLoggedIn: function () { return this.$store.getters.isLoggedIn },
    user: function () { return this.$store.getters.user }
  },
  methods: {
    logout: function () {
      this.$store
        .dispatch('logout')
        .then(() => this.$router.push('/'))
        .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>

</style>
