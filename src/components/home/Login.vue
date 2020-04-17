<template>
     <b-container>
        <h1>Sign In</h1>
        <b-form @submit.prevent="login">
            <b-row>
              <b-col class="col-lg-6">
                <b-form-group
                  label="Email"
                >
                <b-form-input id="email"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col class="col-lg-6">
                <b-form-group
                  label="Password"
                >
                <b-form-input id="password" type="password"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col class="col-lg-6">
                <b-button type="submit">Login</b-button>
              </b-col>
            </b-row>
        </b-form>
        <br>
        <router-link :to="{name: 'register'}">Click to Register!</router-link>
     </b-container>
</template>

<script>
import router from '../../router'
import axios from 'axios'

export default {
  name: 'Login',
  methods: {
    login: (e) => {
      e.preventDefault()
      let email = e.target.elements.email.value
      let password = e.target.elements.password.value

      let login = () => {
        let data = {
          email: email,
          password: password
        }

        axios.post('http://localhost:5000/api/v1/auth/login', data)
          .then((response) => {
            let isAdmin = response.data.is_admin
            localStorage.setItem('user', JSON.stringify(response.data))
            localStorage.setItem('jwt', response.data.token)

            if (localStorage.getItem('jwt') != null) {
              if (isAdmin === 1) {
                router.push('admin')
              } else {
                router.push('dashboard')
              }
            }
            router.push('/dashboard')
          })
          .catch((errors) => {
            console.log('Cannot log in')
          })
      }
      login()
    }
  }
}
</script>

<style scoped>

</style>
