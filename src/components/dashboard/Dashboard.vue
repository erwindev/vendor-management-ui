<template>
      <div class="row">
        <dashboard-left-nav/>
        <dashboard-landing v-if="showDashboardLanding"/>
        <edit-user-profile v-if="showEditUserProfile"/>
        <change-password v-if="showChangePassword"/>
        <vendor-add v-if="showVendorAdd"/>
        <vendor-list :vendorList = "vendorList" v-if="showVendorList"/>
        <vendor-profile :vendor = "vendor.vendor"
                        :contacts = "vendor.contacts"
                        :products = "vendor.products"
                        :attachments = "vendor.attachments"
                        :notes = "vendor.notes"
                        v-if="showVendorProfile"/>
        <contact-form :contactdata = "contact"
                      :methodtype = "method"
                      :title= "title"
                      v-if="showContactForm"/>
        <product-form :productdata = "product"
                      :methodtype = "method"
                      :title= "title"
                      v-if="showProductForm"/>
        <notes-form :notesdata = "notes"
                      :methodtype = "method"
                      :title= "title"
                      v-if="showNotesForm"/>
        <attachment-form :attachmentdata = "attachment"
                      :methodtype = "method"
                      :title= "title"
                      v-if="showAttachmentForm"/>
      </div>
</template>

<script>
import { eventBus } from '../../main'
import DashboardLeftNav from '../shared/DashboardLeftNav.vue'
import DashboardLanding from './DashboardLanding.vue'
import EditUserProfile from './user/EditUserProfile.vue'
import ChangePassword from './user/ChangePassword.vue'
import VendorAdd from './vendor/VendorAdd.vue'
import VendorList from './vendor/VendorList.vue'
import VendorProfile from './vendor/VendorProfile.vue'
import ContactForm from './contact/ContactForm.vue'
import ProductForm from './product/ProductForm.vue'
import NotesForm from './notes/NotesForm.vue'
import AttachmentForm from './attachment/AttachmentForm.vue'

export default {
  name: 'dashboard',
  data () {
    return {
      showDashboardLanding: true,
      showEditUserProfile: false,
      showChangePassword: false,
      showVendorAdd: false,
      showVendorList: false,
      showVendorProfile: false,
      showContactForm: false,
      showProductForm: false,
      showNotesForm: false,
      showAttachmentForm: false,
      title: '',
      method: '',
      vendorList: [],
      vendor: {},
      contact: {},
      product: {},
      notes: {},
      attachment: {}
    }
  },
  components: {
    DashboardLeftNav,
    DashboardLanding,
    EditUserProfile,
    ChangePassword,
    VendorAdd,
    VendorList,
    VendorProfile,
    ContactForm,
    ProductForm,
    NotesForm,
    AttachmentForm
  },
  created () {
    eventBus.$on('showDashboardScreen', (screenName, payload) => {
      this.showDashboardLanding = false
      this.showEditUserProfile = false
      this.showChangePassword = false
      this.showVendorAdd = false
      this.showVendorList = false
      this.showVendorProfile = false
      this.showContactForm = false
      this.showProductForm = false
      this.showNotesForm = false
      this.showAttachmentForm = false

      if (screenName === 'dasbboardLanding') {
        this.showDashboardLanding = true
      } else if (screenName === 'editUserProfile') {
        this.showEditUserProfile = true
      } else if (screenName === 'changePassword') {
        this.showChangePassword = true
      } else if (screenName === 'vendorAdd') {
        this.showVendorAdd = true
      } else if (screenName === 'vendorList') {
        this.showVendorList = true
        this.vendorList = payload
      } else if (screenName === 'vendorProfile') {
        this.showVendorProfile = true
        this.vendor = payload
      } else if (screenName === 'vendorContactAdd') {
        this.showContactForm = true
        this.contact = {}
        this.contact.contact_id = payload.vendorId
        this.contact.contact_type_id = '1000'
        this.title = 'Vendor Contact - ' + payload.name
        this.method = 'add'
      } else if (screenName === 'vendorContactEdit') {
        this.showContactForm = true
        this.contact = {}
        this.contact = payload.contact
        this.title = 'Vendor Contact - ' + payload.name
        this.method = 'edit'
      } else if (screenName === 'vendorProductAdd') {
        this.showProductForm = true
        this.product = {}
        this.product.vendor_id = payload.vendorId
        this.title = 'Vendor Product - ' + payload.name
        this.method = 'add'
      } else if (screenName === 'vendorProductEdit') {
        this.showProductForm = true
        this.product = payload.product
        this.title = 'Vendor Product - ' + payload.name
        this.method = 'edit'
      } else if (screenName === 'vendorNotesAdd') {
        this.showNotesForm = true
        this.notes = {}
        this.notes.notes_id = payload.vendorId
        this.notes.notes_type_id = '1000'
        this.title = 'Vendor Notes - ' + payload.name
        this.method = 'add'
      } else if (screenName === 'vendorAttachmentAdd') {
        this.showAttachmentForm = true
        this.attachment = {}
        this.attachment.attachment_id = payload.vendorId
        this.attachment.attachment_type_id = '1000'
        this.title = 'Vendor Attacment - ' + payload.name
        this.method = 'add'
      } else if (screenName === 'vendorAttachmentEdit') {
        this.showAttachmentForm = true
        this.attachment = {}
        this.attachment = payload.attachment
        this.title = 'Vendor Attachment - ' + payload.name
        this.method = 'edit'
      }
    })
  },
  computed: {
    isLoggedIn: function () { return this.$store.getters.isLoggedIn },
    user: function () { return this.$store.getters.user }
  }
}
</script>

<style scoped>
</style>
