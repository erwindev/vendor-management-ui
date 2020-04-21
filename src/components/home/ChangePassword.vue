<template>
    <b-container>
      <b-alert v-model="showalert" dismissible :variant="variant">{{this.message}}</b-alert>
      <h1>Change Password</h1>
      <b-form name="changPasswordForm" @submit.prevent="changepassword">
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
              <b-form-group label="New Password">
              <b-form-input v-model="newpassword" v-validate="'required'" name="newpassword" type="password" ref="newpassword"></b-form-input>
              <span v-show="errors.has('newpassword')" class="text-danger">{{ errors.first('newpassword') }}</span>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group label="Confirm Password">
              <b-form-input v-model="confirmpassword" v-validate="'required|confirmed:newpassword'" name="confirmpassword" type="password"></b-form-input>
              <span v-show="errors.has('confirmpassword')" class="text-danger">{{ errors.first('confirmpassword') }}</span>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-6">
              <b-button variant="primary" type="submit" >Change Password</b-button>
            </b-col>
          </b-row>
      </b-form>
    </b-container>
</template>

<script>
export default {
  name: 'ChangePassword',
  data () {
    return {
      password: '',
      newpassword: '',
      confirmpassword: '',
      showalert: false,
      variant: 'info',
      message: ''
    }
  },
  methods: {
    changepassword: function (e) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          let password = e.target.elements.password.value
          let newpassword = e.target.elements.newpassword.value
          let id = this.$store.getters.user.id
          this.$store
            .dispatch('changepassword', { id, password, newpassword })
            .then(resp => {
              this.resetForm(this.$validator)
              this.showalert = true
              this.variant = 'info'
              this.message = 'Password successfully changed.'
            })
            .catch(err => {
              this.showalert = true
              this.variant = 'danger'
              this.message = err.response.data.message
              console.log(err)
            })
        }
      })
    },
    resetForm (validator) {
      this.password = null
      this.newpassword = null
      this.confirmpassword = null
      validator.reset()
    }

  }
}
</script>

<style scoped>

</style>
