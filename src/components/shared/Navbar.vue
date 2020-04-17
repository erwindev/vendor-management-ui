<template>
    <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand :to="{name: 'home'}">VMS</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-item :to="{name: 'dashboard'}">Dashboard</b-nav-item>            
                <b-nav-item-dropdown right>
                    <template v-slot:button-content>
                        User
                    </template>
                    <b-dropdown-item :to="{name: 'login'}">Login</b-dropdown-item>
                    <b-dropdown-item href="javascript:alert('My Profile')">Profile</b-dropdown-item>
                    <b-dropdown-item href="#" @click="logout()">Logout Out</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
import router from '../../router'
import axios from 'axios'

export default {
  name: 'vmsui-navbar',
  methods: {
    logout: function () {
      axios.post('http://localhost:5000/api/v1/auth/logout', {}, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('jwt')
        }
      })
        .then((response) => {
          localStorage.removeItem('jwt')
          localStorage.removeItem('user')
          router.push('/login')
        })
        .catch((errors) => {
          console.log('Cannot log out')
        })
    }
  }
}
</script>

<style scoped>

</style>
