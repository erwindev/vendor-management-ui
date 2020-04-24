<template>
    <b-container class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
      <b-alert v-model="showalert" dismissible :variant="variant">{{this.message}}</b-alert>
      <h1>Add Contact</h1>
      <b-form name="changPasswordForm" @submit.prevent="changepassword">
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group label="Name">
              <b-form-input v-model="name" v-validate="'required'" name="name" ></b-form-input>
              <span v-show="errors.has('name')" class="text-danger">{{ errors.first('name') }}</span>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group label="Email">
              <b-form-input v-model="email" v-validate="'required'" name="email" ></b-form-input>
              <span v-show="errors.has('email')" class="text-danger">{{ errors.first('email') }}</span>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group label="Phone 1">
              <b-form-input v-model="phone1" v-validate="'required'" name="phone1" ></b-form-input>
              <span v-show="errors.has('phone1')" class="text-danger">{{ errors.first('phone1') }}</span>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group label="Phone 2">
              <b-form-input v-model="phone2" v-validate="'required'" name="phone2" ></b-form-input>
              <span v-show="errors.has('phone2')" class="text-danger">{{ errors.first('phone2') }}</span>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group label="Street 1">
              <b-form-input v-model="street1" v-validate="'required'" name="street1" ></b-form-input>
              <span v-show="errors.has('street1')" class="text-danger">{{ errors.first('street1') }}</span>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group label="Street 2">
              <b-form-input v-model="street2" v-validate="'required'" name="street2" ></b-form-input>
              <span v-show="errors.has('street2')" class="text-danger">{{ errors.first('street2') }}</span>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group label="City">
              <b-form-input v-model="city" v-validate="'required'" name="city" ></b-form-input>
              <span v-show="errors.has('city')" class="text-danger">{{ errors.first('city') }}</span>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group label="State">
              <b-form-input v-model="state" v-validate="'required'" name="state" ></b-form-input>
              <span v-show="errors.has('state')" class="text-danger">{{ errors.first('state') }}</span>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group label="Country">
              <b-form-input v-model="country" v-validate="'required'" name="country" ></b-form-input>
              <span v-show="errors.has('country')" class="text-danger">{{ errors.first('country') }}</span>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group label="Zip Code">
              <b-form-input v-model="zipcode" v-validate="'required'" name="zipcode" ></b-form-input>
              <span v-show="errors.has('zipcode')" class="text-danger">{{ errors.first('zipcode') }}</span>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-6">
              <b-button variant="primary" type="submit" >Add Contact</b-button>
            </b-col>
          </b-row>
      </b-form>
    </b-container>
</template>

<script>
export default {
  name: 'ContactAdd',
  props: {
    contactId: '',
    contactTypeId: ''
  },
  data () {
    return {
      name: '',
      email: '',
      phone1: '',
      phone2: '',
      street1: '',
      street2: '',
      city: '',
      state: '',
      country: '',
      zipcode: '',
      showalert: false,
      variant: 'info',
      message: ''
    }
  },
  methods: {
    changepassword: function (e) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          let name = e.target.elements.name.value
          let email = e.target.elements.email.value
          let phone1 = e.target.elements.phone1.value
          let phone2 = e.target.elements.phone2.value
          let street1 = e.target.elements.street1.value
          let street2 = e.target.elements.street2.value
          let city = e.target.elements.city.value
          let state = e.target.elements.state.value
          let country = e.target.elements.country.value
          let zipcode = e.target.elements.zipcode.value
          let userBy = this.$store.getters.user.email
          let contactTypeId = this.contactTypeId
          let contactId = this.contactId
          this.$store
            .dispatch('addContact',
              { contact_id: contactId,
                contact_type_id: String(contactTypeId),
                name,
                email,
                phone1,
                phone2,
                street1,
                street2,
                city,
                state,
                country,
                zipcode,
                user_by: userBy,
                status: 'Active'})
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
      this.name = null
      this.email = null
      this.phone1 = null
      this.phone2 = null
      this.street1 = null
      this.street2 = null
      this.city = null
      this.state = null
      this.country = null
      this.zipcode = null
      validator.reset()
    }

  }
}
</script>

<style scoped>

</style>
