<template>
      <div class="row">
        <dashboard-left-nav/>
        <dashboard-landing v-if="showDashboardLanding"/>
        <edit-user-profile v-if="showEditUserProfile"/>
        <change-password v-if="showChangePassword"/>
        <vendor-add v-if="showVendorAdd"/>
        <vendor-list :vendorList = "vendorList" v-if="showVendorList"/>
        <vendor-profile :vendor = "vendor" v-if="showVendorProfile"/>
        <contact-form :contactdata = "contact"
                      :methodtype = "contactMethod"
                      :title= "contactTitle"
                      v-if="showContactForm"/>
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
      contact: {
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
      },
      contactTitle: '',
      contactMethod: '',
      vendorList: [],
      vendor: {}
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
    ContactForm
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
        this.contact.contact_id = payload.contactId
        this.contact.contact_type_id = '1000'
        this.contactTitle = 'Vendor Contact - ' + payload.name
        this.contactMethod = 'add'
      } else if (screenName === 'vendorContactEdit') {
        this.showContactForm = true
        this.contact = {}
        this.contact = payload.contact
        this.contactTitle = 'Vendor Contact - ' + payload.name
        this.contactMethod = 'edit'
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
