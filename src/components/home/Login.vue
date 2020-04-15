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
                <b-button type="submit">Register</b-button>
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
            console.log('Logged in')
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
