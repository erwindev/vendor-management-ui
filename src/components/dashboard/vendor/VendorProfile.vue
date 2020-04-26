<template>
    <b-container class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
      <b-container v-if="isEdit" fluid>
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
              <input type="hidden" v-model="vendor.vendor.id" name="id">
              <b-button variant="primary" type="submit">Update</b-button>
              <b-button @click="editForm(false)" variant="primary">Cancel</b-button>
            </b-col>
          </b-row>
      </b-form>
      </b-container>
      <b-container v-if="!isEdit" fluid>
        <h1>Vendor Profile</h1>
        <b-card>
          <b-card-text>Vendor Name: {{ vendor.vendor.name  }}</b-card-text>
          <b-card-text>Status: {{ vendor.vendor.status  }}</b-card-text>
          <b-card-text>Created Date: {{ vendor.vendor.create_date }}</b-card-text>
          <b-card-text>Created By: {{ vendor.vendor.user_by }}</b-card-text>
          <b-card-text>Last Updated Date: {{ vendor.vendor.updated_date }}</b-card-text>
          <b-button @click="editForm(true)" variant="primary">Edit</b-button>
        </b-card>
      </b-container>
      <br>
      <br>
      <b-container class="float-left">
        <b-card no-body>
        <b-tabs justified>
            <b-tab title="Contacts">
              <br>
              <contact-list :contacts = "vendor.contacts" :name = "vendor.vendor.name" v-if="true"/>
              <b-button size="sm" variant="primary" @click="addVendorContact(vendor.vendor.id, vendor.vendor.name)">
                  Add Vendor Contact
              </b-button>
            </b-tab>
            <b-tab title="Products">
              <b-card no-body>
                <b-card-body class="text-center">
                  <b-card-title>Not Available</b-card-title>

                  <b-card-text>
                    Product list is not available yet
                  </b-card-text>

                </b-card-body>
              </b-card>
            </b-tab>
            <b-tab title="Attachment">
              <b-card no-body>
                <b-card-body class="text-center">
                  <b-card-title>Not Available</b-card-title>

                  <b-card-text>
                    Attachment list is not available yet
                  </b-card-text>

                </b-card-body>
              </b-card>
            </b-tab>
            <b-tab title="Notes">
              <b-card no-body>
                <b-card-body class="text-center">
                  <b-card-title>Not Available</b-card-title>

                  <b-card-text>
                    Notes list is not available yet
                  </b-card-text>

                </b-card-body>
              </b-card>
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
    vendorData: {}
  },
  data () {
    return {
      vendor: {},
      showalert: false,
      variant: 'info',
      message: '',
      select: {
        selected: '',
        options: [
          'Inactive',
          'Active'
        ]
      },
      isEdit: false
    }
  },
  mounted: function () {
    this.vendor = {
      id: '',
      name: '',
      create_date: '',
      status: '',
      user_by: '',
      updated_date: ''
    }
    this.vendor = this.vendorData
  },
  methods: {
    updateVendor: function (e) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          let name = this.vendor.vendor.name
          let status = this.vendor.vendor.status
          let email = this.$store.getters.user.email
          let id = this.vendor.vendor.id
          this.$store
            .dispatch('updateVendor', { id, name, user_by: email, status })
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
    addVendorContact: function (contactId, name) {
      eventBus.$emit('showDashboardScreen', 'vendorContactAdd', {contactId: contactId, name: name}) // event processor in Dashboard.vue
    },
    editForm: function (bool) {
      this.isEdit = bool
    }
  }
}
</script>

<style scoped>

</style>
