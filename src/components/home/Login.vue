<template>
     <b-container>
       <b-alert v-model="showalert" dismissible :variant="variant">{{this.message}}</b-alert>
        <h1>Login In</h1>
        <b-form @submit.prevent="login">
            <b-row>
              <b-col class="col-lg-6">
                <b-form-group label="Email">
                  <b-form-input v-model="email" v-validate="'required|email'" name="email"></b-form-input>
                  <span v-show="errors.has('email')" class="text-danger">{{ errors.first('email') }}</span>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col class="col-lg-6">
                <b-form-group label="Password">
                  <b-form-input v-model="password" v-validate="'required'" name="password" type="password"></b-form-input>
                  <span v-show="errors.has('password')" class="text-danger">{{ errors.first('password') }}</span>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col class="col-lg-6">
                <b-button variant="primary" type="submit">Login</b-button>
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
      password: '',
      showalert: false,
      variant: 'info',
      message: ''
    }
  },
  methods: {
    login: function (e) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          let email = e.target.elements.email.value
          let password = e.target.elements.password.value
          this.$store
            .dispatch('login', { email, password })
            .then(() => this.$router.push('/dashboard'))
            .catch(err => {
              this.showalert = true
              this.variant = 'danger'
              this.message = err.response.data.result.message
              console.log(err)
            })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
