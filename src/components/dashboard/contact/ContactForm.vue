<template>
    <b-container class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
      <b-alert v-model="showalert" dismissible :variant="variant">{{this.message}}</b-alert>
      <h1>
        {{ title }}
      </h1>
      <b-form name="contactForm" @submit.prevent="process">
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group label="Name">
              <b-form-input v-model="contact.name" v-validate="'required|min:3'" name="name" ></b-form-input>
              <span v-show="errors.has('name')" class="text-danger">{{ errors.first('name') }}</span>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group label="Email">
              <b-form-input v-model="contact.email" v-validate="'required|email'" name="email" ></b-form-input>
              <span v-show="errors.has('email')" class="text-danger">{{ errors.first('email') }}</span>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group label="Phone 1">
              <b-form-input v-model="contact.phone1" v-validate="'required'" name="phone1" ></b-form-input>
              <span v-show="errors.has('phone1')" class="text-danger">{{ errors.first('phone1') }}</span>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group label="Phone 2">
              <b-form-input v-model="contact.phone2" v-validate="'min:3'" name="phone2" ></b-form-input>
              <span v-show="errors.has('phone2')" class="text-danger">{{ errors.first('phone2') }}</span>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group label="Street 1">
              <b-form-input v-model="contact.street1" v-validate="'required'" name="street1" ></b-form-input>
              <span v-show="errors.has('street1')" class="text-danger">{{ errors.first('street1') }}</span>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group label="Street 2">
              <b-form-input v-model="contact.street2" v-validate="'min:3'" name="street2" ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group label="City">
              <b-form-input v-model="contact.city" v-validate="'required'" name="city" ></b-form-input>
              <span v-show="errors.has('city')" class="text-danger">{{ errors.first('city') }}</span>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group label="State">
              <b-form-select v-model="contact.state" v-validate="'required'" :options="states" name="state"></b-form-select>
              <span v-show="errors.has('state')" class="text-danger">{{ errors.first('state') }}</span>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group label="Zip Code">
              <b-form-input v-model="contact.zipcode" v-validate="'required'" name="zipcode" ></b-form-input>
              <span v-show="errors.has('zipcode')" class="text-danger">{{ errors.first('zipcode') }}</span>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group label="Country">
                <b-form-select v-model="contact.country" v-validate="'required'" :options="countries" name="country"></b-form-select>
                <span v-show="errors.has('country')" class="text-danger">{{ errors.first('country') }}</span>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-6">
              <b-button variant="primary" v-if="methodtype == 'add' && contact.contact_type_id == '1000'" type="submit" >Add Vendor Contact</b-button>
              <b-button variant="primary" v-if="methodtype == 'edit' && contact.contact_type_id == '1000'" type="submit" >Save Vendor Contact</b-button>
              <b-button variant="primary" v-if="contact.contact_type_id == '1000'" @click="getVendorProfile(contact.contact_id)">Back to Vendor</b-button>
            </b-col>
          </b-row>
      </b-form>
    </b-container>
</template>

<script>
import { eventBus } from '../../../main'
import countriesjson from './countries.json'
import statesjson from './states.json'

export default {
  name: 'ContactForm',
  props: {
    title: '',
    methodtype: '',
    contactdata: {}
  },
  data () {
    return {
      contact: {},
      showalert: false,
      variant: 'info',
      message: '',
      countries: countriesjson,
      states: statesjson
    }
  },
  mounted: function () {
    this.contact = {
      id: '',
      contact_id: '',
      contact_type_id: '',
      name: '',
      email: '',
      phone1: '',
      phone2: '',
      street1: '',
      street2: '',
      city: '',
      state: '',
      zipcode: '',
      country: '',
      status: ''
    }
    this.resetForm(this.$validator)
    this.contact.country = 'US'
    if ((Object.keys(this.contactdata).length > 2)) {
      this.contact = this.contactdata
    } else {
      this.contact.contact_id = this.contactdata.contact_id
      this.contact.contact_type_id = this.contactdata.contact_type_id
    }
  },
  methods: {
    process: function (e) {
      if (this.methodtype === 'add') {
        this.addContact()
      } else if (this.methodtype === 'edit') {
        this.updateContact()
      }
    },
    addContact: function () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          let payload = this.createPayload()
          payload.status = 'Active'
          this.$store
            .dispatch('addContact', payload)
            .then(resp => {
              this.resetForm(this.$validator)
              this.showalert = true
              this.variant = 'info'
              this.message = 'Contact successfully added.'
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
    updateContact: function () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          let payload = this.createPayload()
          payload.id = this.contact.id
          this.$store
            .dispatch('updateContact', payload)
            .then(resp => {
              this.showalert = true
              this.variant = 'info'
              this.message = 'Contact successfully updated.'
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
    getVendorProfile: function (id) {
      this.$store
        .dispatch('getVendor', id)
        .then(resp => {
          this.vendor = resp.data
          eventBus.$emit('showDashboardScreen', 'vendorProfile', this.vendor) // event processor in Dashboard.vue
        })
        .catch(err => {
          console.log(err)
        })
    },
    resetForm (validator) {
      this.contact.name = null
      this.contact.email = null
      this.contact.phone1 = null
      this.contact.phone2 = null
      this.contact.street1 = null
      this.contact.street2 = null
      this.contact.city = null
      this.contact.state = null
      this.contact.country = null
      this.contact.zipcode = null
      validator.reset()
    },
    createPayload: function () {
      let userBy = this.$store.getters.user.email
      let contactTypeId = this.contact.contact_type_id
      let contactId = this.contact.contact_id
      let name = this.contact.name
      let email = this.contact.email
      let phone1 = this.contact.phone1
      let phone2 = this.contact.phone2
      let street1 = this.contact.street1
      let street2 = this.contact.street2
      let city = this.contact.city
      let state = this.contact.state
      let country = this.contact.country
      let zipcode = this.contact.zipcode

      let payload = {
        contact_id: String(contactId),
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
        user_by: userBy
      }

      return payload
    }

  }
}
</script>

<style scoped>

</style>
