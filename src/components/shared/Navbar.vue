<template>
    <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand :to="{name: 'home'}">VMS</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-item v-if="!isLoggedIn" v-on:click="showLogin()">Login</b-nav-item>
                  <b-nav-item v-if="isLoggedIn" v-on:click="showDasboard('dashboardlanding')">Dashboard</b-nav-item>
                  <b-nav-item-dropdown v-if="isLoggedIn" right>
                      <template v-slot:button-content>
                          Account
                      </template>
                      <b-dropdown-item v-on:click="showDasboard('edituserprofile')">Profile</b-dropdown-item>
                      <b-dropdown-item v-on:click="showDasboard('changePassword')">Change Password</b-dropdown-item>
                      <b-dropdown-item href="#" @click="logout()">Logout</b-dropdown-item>
                  </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
import {
  DASHBOARD
} from '../../store/mutation-types'

export default {
  name: 'vmsui-navbar',
  computed: {
    isLoggedIn: function () { return this.$store.getters.isLoggedIn },
    user: function () { return this.$store.getters.user }
  },
  methods: {
    showLogin: function () {
      this.$router.push({name: 'login'})
    },
    showDasboard: function (screenName) {
      this.$store.commit(DASHBOARD, screenName)
      let name = 'dashboard'
      if (this.$route.name !== name) { this.$router.push({name: name, params: { screenName: screenName }}) }
    },
    logout: function () {
      this.$store
        .dispatch('logout')
        .then(() => {
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
          this.$router.push('/')
        })
    }
  }
}
</script>

<style scoped>

</style>
