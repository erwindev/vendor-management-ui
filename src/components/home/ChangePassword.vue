<template>
    <b-container>
      <h1>Change Password</h1>
      <b-form @submit.prevent="changepassword">
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
              <b-button type="submit">Change Password</b-button>
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
      password: '',
      newpassword: '',
      confirmpassword: ''
    }
  },
  methods: {
    changepassword: function (e) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          let password = e.target.elements.password.value
          let new_password = e.target.elements.newpassword.value
          let id = this.$store.getters.user.id
          this.$store
            .dispatch('changepassword', { id, password, new_password })
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
