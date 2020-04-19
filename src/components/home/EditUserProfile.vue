<template>
    <b-container>
      <h1>Edit Profile</h1>
      <b-form @submit.prevent="updateuser">
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group label="First Name">
              <b-form-input v-model="user.firstname" v-validate="'required|min:3'" name="firstname"></b-form-input>
              <span v-show="errors.has('firstname')" class="text-danger">{{ errors.first('firstname') }}</span>
            </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group label="Last Name">
              <b-form-input v-model="user.lastname" v-validate="'required|min:3'" name="lastname"></b-form-input>
              <span v-show="errors.has('lastname')" class="text-danger">{{ errors.first('lastname') }}</span>
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
              <b-form-group label="Confirm Password">
              <b-form-input v-model="confirmpassword" v-validate="'required|confirmed:password'" name="confirmpassword" type="password" ref="password"></b-form-input>
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
  name: 'EditUserProfile',
  data () {
    return {
      firstname: '',
      lastname: '',
      password: '',
      confirmpassword: ''
    }
  },
  computed: {
    user: function () { return this.$store.getters.user }
  },
  methods: {
    updateuser: function (e) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          let firstname = e.target.elements.firstname.value
          let lastname = e.target.elements.lastname.value
          let password = e.target.elements.password.value
          this.$store
            .dispatch('edituser', { firstname, lastname, password })
            .then(() => this.$router.push('/dashboard'))
            .catch(err => console.log(err))
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
