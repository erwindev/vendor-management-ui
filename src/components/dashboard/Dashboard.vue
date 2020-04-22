<template>
      <div class="row">
        <dashboard-left-nav/>
        <dashboard-landing v-if="showDashboardLanding"/>
        <edit-user-profile v-if="showProfile"/>
        <change-password v-if="showPassword"/>
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
      showProfile: false,
      showPassword: false
    }
  },
  components: {
    DashboardLeftNav,
    DashboardLanding,
    EditUserProfile,
    ChangePassword
  },
  mounted () {
    this.showDashboardLanding = this.$store.getters.showDashboardLanding
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
