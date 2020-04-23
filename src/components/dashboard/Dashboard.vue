<template>
      <div class="row">
        <dashboard-left-nav/>
        <dashboard-landing v-if="showDashboardLanding"/>
        <edit-user-profile v-if="showEditUserProfile"/>
        <change-password v-if="showChangePassword"/>
        <vendor-add v-if="showVendorAdd"/>
        <vendor-list :vendorList = "vendorList" v-if="showVendorList"/>
      </div>
</template>

<script>
import { eventBus } from '../../main'
import DashboardLeftNav from '../shared/DashboardLeftNav.vue'
import DashboardLanding from './DashboardLanding.vue'
import EditUserProfile from '../home/EditUserProfile.vue'
import ChangePassword from '../home/ChangePassword.vue'
import VendorAdd from './vendor/VendorAdd.vue'
import VendorList from './vendor/VendorList.vue'

export default {
  name: 'dashboard',
  data () {
    return {
      showDashboardLanding: true,
      showEditUserProfile: false,
      showChangePassword: false,
      showVendorAdd: false,
      showVendorList: false,
      vendorList: []
    }
  },
  components: {
    DashboardLeftNav,
    DashboardLanding,
    EditUserProfile,
    ChangePassword,
    VendorAdd,
    VendorList
  },
  created () {
    eventBus.$on('showDashboardScreen', (screenName, payload) => {
      this.showDashboardLanding = false
      this.showEditUserProfile = false
      this.showChangePassword = false
      this.showVendorAdd = false
      this.showVendorList = false

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
