<template>
    <b-container fluid>
      <b-container v-if="isEdit" fluid>
        <b-alert v-model="showalert" dismissible :variant="variant">{{this.message}}</b-alert>
        <h1>Profile</h1>
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
                <b-button variant="primary" type="submit">Save</b-button>
                <b-button @click="editForm(false)" variant="primary">Cancel</b-button>
              </b-col>
            </b-row>
        </b-form>
      </b-container>
      <b-container v-if="!isEdit" fluid>
        <h1>Profile</h1>
        <b-card>
          <b-card-text>
            {{ firstname  }} {{ lastname  }}<br>
            {{ email }}
          </b-card-text>

          <b-card-text>Last Login Date: {{ lastLoginDate }}</b-card-text>
          <b-card-text>Registered Date: {{ createDate }}</b-card-text>

          <b-button @click="editForm(true)" variant="primary">Edit</b-button>
        </b-card>
      </b-container>
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
      message: '',
      isEdit: false
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
              this.showalert = true
              this.variant = 'info'
              this.message = 'User successfully updated.'
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
    editForm: function (bool) {
      this.isEdit = bool
    }
  }
}
</script>

<style scoped>

</style>
