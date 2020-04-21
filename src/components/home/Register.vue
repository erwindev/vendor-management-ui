<template>
    <b-container>
      <b-alert v-model="showalert" dismissible :variant="variant">{{this.message}}</b-alert>
      <h1>Register</h1>
      <b-form @submit.prevent="register">
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group label="First Name">
              <b-form-input v-model="firstname" v-validate="'required|min:3'" name="firstname"></b-form-input>
              <span v-show="errors.has('firstname')" class="text-danger">{{ errors.first('firstname') }}</span>
            </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group label="Last Name">
              <b-form-input v-model="lastname" v-validate="'required|min:3'" name="lastname"></b-form-input>
              <span v-show="errors.has('lastname')" class="text-danger">{{ errors.first('lastname') }}</span>
              </b-form-group>
            </b-col>
          </b-row>
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
              <b-form-input v-model="password" v-validate="'required'" name="password" type="password" ref="password"></b-form-input>
              <span v-show="errors.has('password')" class="text-danger">{{ errors.first('password') }}</span>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group label="Confirm Password">
              <b-form-input v-model="confirmpassword" v-validate="'required|confirmed:password'" name="confirmpassword" type="password"></b-form-input>
              <span v-show="errors.has('confirmpassword')" class="text-danger">{{ errors.first('confirmpassword') }}</span>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-6">
              <b-button type="submit">Register</b-button>
            </b-col>
          </b-row>
      </b-form>
    </b-container>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmpassword: '',
      showalert: false,
      variant: 'info',
      message: ''
    }
  },
  methods: {
    register: function (e) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          let firstname = e.target.elements.firstname.value
          let lastname = e.target.elements.lastname.value
          let email = e.target.elements.email.value
          let password = e.target.elements.password.value
          this.$store
            .dispatch('register', { firstname, lastname, email, password })
            .then(() => this.$router.push('/login'))
            .catch(err => {
              this.showalert = true
              this.variant = 'danger'
              this.message = err.response.data.message
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
