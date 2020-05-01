<template>
    <b-container fluid>
      <template v-if="isEdit" fluid>
      <b-alert v-model="showalert" dismissible :variant="variant">{{this.message}}</b-alert>
      <h1>Vendor Profile</h1>
      <b-card>
      <b-form @submit.prevent="updateVendor">
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group label="Vednor Name">
              <b-form-input v-model="vendor.name" v-validate="'required|min:3'" name="name"></b-form-input>
              <span v-show="errors.has('name')" class="text-danger">{{ errors.first('name') }}</span>
            </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group label="Status">
                <b-form-select v-model="vendor.status" name="status">
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
      </template>
      <template v-if="!isEdit" fluid>
        <h1>Vendor Profile</h1>
        <b-card>
          <b-card-text>Vendor Name: {{ vendor.name  }}</b-card-text>
          <b-card-text>Status: {{ vendor.status  }}</b-card-text>
          <b-card-text>Created Date: {{ vendor.create_date }}</b-card-text>
          <b-card-text>Created By: {{ vendor.user_by }}</b-card-text>
          <b-card-text>Last Updated Date: {{ vendor.updated_date }}</b-card-text>
          <b-button @click="editForm(true)" variant="primary">Edit</b-button>
        </b-card>
        <br>
        <b-card no-body>
        <b-tabs card>
            <b-tab no-body title="Contacts">
              <contact-list :contacts = "contacts" :name = "name" v-if="true"/>
              <b-button size="sm" variant="primary" @click="add('vendorContactAdd', id, name)">
                  Add Vendor Contact
              </b-button>
            </b-tab>
            <b-tab no-body title="Products">
              <product-list :products = "products" :productfields = "productfields" :name = "name" v-if="true"/>
              <b-button size="sm" variant="primary" @click="add('vendorProductAdd', id, name)">
                  Add Vendor Product
              </b-button>
            </b-tab>
            <b-tab no-body title="Attachments">
              <attachment-list :attachments = "attachments" :name = "name" v-if="true"/>
              <b-button size="sm" variant="primary" @click="add('vendorAttachmentAdd', id, name)">
                  Add Vendor Attachment
              </b-button>
            </b-tab>
            <b-tab no-body title="Notes">
              <notes-list :notes = "notes" :name = "name" v-if="true"/>
              <b-button size="sm" variant="primary" @click="add('vendorNotesAdd', id, name)">
                  Add Vendor Notes
              </b-button>
            </b-tab>
          </b-tabs>
        </b-card>
      </template>
    </b-container>
</template>

<script>
import { eventBus } from '../../../main'
import ContactList from '../contact/ContactList'
import ProductList from '../product/ProductList'
import NotesList from '../notes/NotesList'
import AttachmentList from '../attachment/AttachmentList'

export default {
  name: 'VendorUpdate',
  components: {
    ContactList,
    ProductList,
    NotesList,
    AttachmentList
  },
  props: {
    vendor: {},
    contacts: Array,
    products: Array,
    notes: Array,
    attachments: Array
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
      productfields: [
        { key: 'product_name', label: 'Product Name', sortable: true, sortDirection: 'desc' },
        { key: 'user_by', label: 'Added By', sortable: false, class: 'text-left' },
        { key: 'create_date', label: 'Create Date', sortable: false, class: 'text-left' },
        { key: 'status', label: 'Status', sortable: false, class: 'text-left' },
        { key: 'actions', label: 'Actions' }
      ],
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
    add: function (action, id, name) {
      eventBus.$emit('showDashboardScreen', action, {vendorId: id, name: name}) // event processor in Dashboard.vue
    },
    editForm: function (bool) {
      this.isEdit = bool
    }
  }
}
</script>

<style scoped>

</style>
