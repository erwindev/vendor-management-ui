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
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login: function (e) {
      let email = e.target.elements.email.value
      let password = e.target.elements.password.value
      this.$store
        .dispatch('login', { email, password })
        .then(() => this.$router.push('/dashboard'))
        .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>

</style>
