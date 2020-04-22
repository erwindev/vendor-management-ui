<template>
      <div class="row">
        <dashboard-left-nav/>
        <dashboard-landing v-if="showDashboardLanding"/>
        <edit-user-profile v-if="showEditUserProfile"/>
        <change-password v-if="showChangePassword"/>
        <vendor-add v-if="showVendorAdd"/>
      </div>
</template>

<script>
import { eventBus } from '../../main'
import DashboardLeftNav from '../shared/DashboardLeftNav.vue'
import DashboardLanding from './DashboardLanding.vue'
import EditUserProfile from '../home/EditUserProfile.vue'
import ChangePassword from '../home/ChangePassword.vue'
import VendorAdd from './vendor/VendorAdd.vue'

export default {
  name: 'dashboard',
  data () {
    return {
      showDashboardLanding: true,
      showEditUserProfile: false,
      showChangePassword: false,
      showAddVendor: false
    }
  },
  components: {
    DashboardLeftNav,
    DashboardLanding,
    EditUserProfile,
    ChangePassword,
    VendorAdd
  },
  created () {
    eventBus.$on('showDashboardScreen', (screenName) => {
      this.showDashboardLanding = false
      this.showEditUserProfile = false
      this.showChangePassword = false
      this.showVendorAdd = false

      if (screenName === 'dasbboardLanding') {
        this.showDashboardLanding = true
      } else if (screenName === 'editUserProfile') {
        this.showEditUserProfile = true
      } else if (screenName === 'changePassword') {
        this.showChangePassword = true
      } else if (screenName === 'vendorAdd') {
        this.showVendorAdd = true
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
