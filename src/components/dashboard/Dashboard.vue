<template>
      <div class="row">
        <dashboard-left-nav/>
        <dashboard-landing v-if="showDashboardLanding"/>
        <edit-user-profile v-if="showEditUserProfile"/>
        <change-password v-if="showChangePassword"/>
        <vendor-add v-if="showVendorAdd"/>
        <vendor-list :vendorList = "vendorList" v-if="showVendorList"/>
        <vendor-profile :vendor = "vendor" v-if="showVendorProfile"/>
        <contact-add :contactId = "contactId" :contactTypeId = "contactTypeId" :title= "contactAddTitle" v-if="showContactAdd"/>
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
import ContactAdd from './contact/ContactAdd.vue'

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
      showContactAdd: false,
      contactId: '',
      contactTypeId: '',
      contactAddTitle: '',
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
    ContactAdd
  },
  created () {
    eventBus.$on('showDashboardScreen', (screenName, payload) => {
      this.showDashboardLanding = false
      this.showEditUserProfile = false
      this.showChangePassword = false
      this.showVendorAdd = false
      this.showVendorList = false
      this.showVendorProfile = false
      this.showContactAdd = false

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
        this.showContactAdd = true
        this.contactId = payload.id
        this.contactTypeId = '1000'
        this.contactAddTitle = 'Vendor Contact - ' + payload.name
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
