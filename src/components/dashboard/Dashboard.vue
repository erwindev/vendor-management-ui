<template>
      <div class="row">
        <dashboard-left-nav/>
        <dashboard-landing v-if="showDashboardLanding"/>
        <edit-user-profile v-if="showEditUserProfile"/>
        <change-password v-if="showChangePassword"/>
      </div>
</template>

<script>
import DashboardLeftNav from '../shared/DashboardLeftNav.vue'
import DashboardLanding from './DashboardLanding.vue'
import EditUserProfile from '../home/EditUserProfile.vue'
import ChangePassword from '../home/ChangePassword.vue'

export default {
  name: 'dashboard',
  data () {
    return {
      showDashboardLanding: true,
      showEditUserProfile: false,
      showChangePassword: false
    }
  },
  components: {
    DashboardLeftNav,
    DashboardLanding,
    EditUserProfile,
    ChangePassword
  },
  mounted () {
    this.showChangePassword = false
    this.showDashboardLanding = false
    this.showChangePassword = false
    if (this.$store.getters.currentDashboardScreen === 'dashboardlanding') {
      this.showDashboardLanding = true
    }
    if (this.$store.getters.currentDashboardScreen === 'edituserprofile') {
      this.showEditUserProfile = true
    }
    if (this.$store.getters.currentDashboardScreen === 'changePassword') {
      this.showChangePassword = true
    }
    this.showProfile = this.$store.getters.showProfile
    this.showPassword = this.$store.getters.showPassword
  },
  computed: {
    isLoggedIn: function () { return this.$store.getters.isLoggedIn },
    user: function () { return this.$store.getters.user }
  }
}
</script>

<style scoped>
</style>
