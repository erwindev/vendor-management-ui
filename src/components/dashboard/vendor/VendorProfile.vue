<template>
    <b-container class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
      <b-container v-if="isEdit" fluid>
      <b-alert v-model="showalert" dismissible :variant="variant">{{this.message}}</b-alert>
      <h1>Vendor Profile</h1>
      <b-card>
      <b-form @submit.prevent="updateVendor">
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group label="Vednor Name">
              <b-form-input v-model="name" v-validate="'required|min:3'" name="name"></b-form-input>
              <span v-show="errors.has('name')" class="text-danger">{{ errors.first('name') }}</span>
            </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group label="Status">
                <b-form-select v-model="status" name="status">
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
              <input type="hidden" v-model="id" name="id">
              <b-button variant="primary" type="submit">Update</b-button>
              <b-button @click="editForm(false)" variant="primary">Cancel</b-button>
            </b-col>
          </b-row>
      </b-form>
      </b-card>
      </b-container>
      <b-container v-if="!isEdit" fluid>
        <h1>Vendor Profile</h1>
        <b-card>
          <b-card-text>Vendor Name: {{ vendor.name  }}</b-card-text>
          <b-card-text>Status: {{ vendor.status  }}</b-card-text>
          <b-card-text>Created Date: {{ vendor.create_date }}</b-card-text>
          <b-card-text>Created By: {{ vendor.user_by }}</b-card-text>
          <b-card-text>Last Updated Date: {{ vendor.updated_date }}</b-card-text>
          <b-button @click="editForm(true)" variant="primary">Edit</b-button>
        </b-card>
      </b-container>
      <br>
      <br>
      <b-container fluid>
        <b-card no-body>
        <b-tabs justified>
            <b-tab title="Contacts">
              <br>
              <contact-list :contacts = "contacts" :name = "name" v-if="true"/>
              <b-button size="sm" variant="primary" @click="addVendorContact(id, name)">
                  Add Vendor Contact
              </b-button>
            </b-tab>
            <b-tab title="Products">
              <br>
              <product-list :products = "products" :name = "name" v-if="true"/>
              <b-button size="sm" variant="primary" @click="addVendorProduct(id, name)">
                  Add Vendor Product
              </b-button>
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
import ProductList from '../product/ProductList'

export default {
  name: 'VendorUpdate',
  components: {
    ContactList,
    ProductList
  },
  props: {
    vendor: {},
    contacts: Array,
    products: Array
  },
  data () {
    return {
      name: '',
      status: '',
      id: '',
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
    this.name = this.vendor.name
    this.status = this.vendor.status
    this.id = this.vendor.id
  },
  methods: {
    updateVendor: function (e) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          let name = this.name
          let status = this.status
          let email = this.$store.getters.user.email
          let id = this.id
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
    addVendorProduct: function (id, name) {
      eventBus.$emit('showDashboardScreen', 'vendorProductAdd', {vendorId: id, name: name}) // event processor in Dashboard.vue
    },
    editForm: function (bool) {
      this.isEdit = bool
    }
  }
}
</script>

<style scoped>

</style>
