<template>
    <b-container class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
      <b-alert v-model="showalert" dismissible :variant="variant">{{this.message}}</b-alert>
      <h1>Vendor Profile</h1>
      <b-form @submit.prevent="updateVendor">
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group label="Vednor Name">
              <b-form-input v-model="vendor.vendor.name" v-validate="'required|min:3'" name="name"></b-form-input>
              <span v-show="errors.has('name')" class="text-danger">{{ errors.first('name') }}</span>
            </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group label="Website">
              <b-form-input v-model="vendor.vendor.website" v-validate="'required|min:3'" name="website"></b-form-input>
              <span v-show="errors.has('website')" class="text-danger">{{ errors.first('website') }}</span>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group label="Status">
                <b-form-select v-model="vendor.vendor.status" name="status">
                    <option v-for="(selectOption, indexOpt) in select.options"
                        :key="indexOpt"
                        :value="selectOption"
                        >
                        {{ selectOption }}
                    </option>
                </b-form-select>
              <span v-show="errors.has('status')" class="text-danger">{{ errors.first('status') }}</span>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group label="Added by">
              <span>{{ vendor.vendor.user_by }}</span>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group label="Created Date">
              <span>{{ vendor.vendor.create_date }}</span>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group label="Last Updated Date">
              <span>{{ vendor.vendor.updated_date }}</span>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-6">
              <input type="hidden" v-model="vendor.vendor.id" name="id">
              <b-button variant="primary" type="submit">Update</b-button>
            </b-col>
          </b-row>
      </b-form>
      <br>
      <br>
      <b-container class="float-left">
        <b-card no-body>
        <b-tabs justified>
            <b-tab title="Contacts">
              <br>
              <contact-list :contacts = "vendor.contacts" v-if="true"/>
              <b-button size="sm" variant="primary" @click="addVendorContact(vendor.vendor.id)">
                  Add Vendor Contact
              </b-button>
            </b-tab>
            <b-tab title="Products">
              Product list goes here
            </b-tab>
            <b-tab title="Attachment">
              Attachment list goes here
            </b-tab>
            <b-tab title="Notes">
              Notes list goes here
            </b-tab>
          </b-tabs>
        </b-card>
      </b-container>
    </b-container>
</template>

<script>
import { eventBus } from '../../../main'
import ContactList from '../contact/ContactList'

export default {
  name: 'VendorUpdate',
  components: {
    ContactList
  },
  props: {
    vendor: {}
  },
  data () {
    return {
      id: '',
      name: '',
      website: '',
      createDate: '',
      status: '',
      userBy: '',
      updatedDate: '',
      showalert: false,
      variant: 'info',
      message: '',
      select: {
        selected: '',
        options: [
          'Inactive',
          'Active'
        ]
      }
    }
  },
  methods: {
    updateVendor: function (e) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          let name = e.target.elements.name.value
          let website = e.target.elements.website.value
          let status = e.target.elements.status.value
          let email = this.$store.getters.user.email
          let id = e.target.elements.id.value
          this.$store
            .dispatch('updateVendor', { id, name, website, user_by: email, status })
            .then(() => {
              this.showalert = true
              this.variant = 'info'
              this.message = 'Vendor successfully updated.'
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
    addVendorContact: function (id) {
      eventBus.$emit('showDashboardScreen', 'vendorContactAdd', id) // event processor in Dashboard.vue
    }
  }
}
</script>

<style scoped>

</style>
