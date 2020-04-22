<template>
    <b-container class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
      <b-alert v-model="showalert" dismissible :variant="variant">{{this.message}}</b-alert>
      <h1>Edit Profile</h1>
      <b-form @submit.prevent="updateuser">
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
              <span>{{ email }}</span>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group label="Last Login Date">
              <span>{{ lastLoginDate }}</span>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group label="Join Date">
              <span>{{ createDate }}</span>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group label="Last Updated Date">
              <span>{{ updatedDate }}</span>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-6">
              <b-button variant="primary" type="submit">Update Profile</b-button>
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
      email: '',
      lastLoginDate: '',
      createDate: '',
      updatedDate: '',
      showalert: false,
      variant: 'info',
      message: ''
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    getUser: function () {
      let userId = this.$store.getters.user.id
      this.$store
        .dispatch('getuser', userId)
        .then(() => {
          let user = this.$store.getters.user
          this.firstname = user.firstname
          this.lastname = user.lastname
          this.lastLoginDate = user.last_login_date
          this.createDate = user.create_date
          this.updatedDate = user.updated_date
          this.email = user.email
        })
        .catch(err => console.log(err))
    },
    updateuser: function (e) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          let firstname = e.target.elements.firstname.value
          let lastname = e.target.elements.lastname.value
          let id = this.$store.getters.user.id
          this.$store
            .dispatch('updateuser', { id, firstname, lastname })
            .then(() => {
              this.$router.push('/dashboard')
            })
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
