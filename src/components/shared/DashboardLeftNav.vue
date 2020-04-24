<template>
    <b-nav class="col-md-2 d-none d-md-block bg-light sidebar">
        <b-container class="sidebar-sticky">
          <b-card no-body>
            <b-card-header>
              <b-link href="#" v-b-toggle.accordion-1>Vendor</b-link>
            </b-card-header>
            <b-collapse id="accordion-1" accordion="my-accordion1">
              <b-card-body>
                <b-card-text>
                  <b-link v-on:click="showDashboard('vendorAdd')">Add</b-link>
                </b-card-text>
                <b-card-text>
                  <b-link v-on:click="showDashboard('vendorList')">List</b-link>
                </b-card-text>
              </b-card-body>
            </b-collapse>
          </b-card>
          <b-card no-body>
            <b-card-header>
              <b-link href="#" v-b-toggle.accordion-2>Product</b-link>
            </b-card-header>
            <b-collapse id="accordion-2" accordion="my-accordion2">
              <b-card-body>
                <b-card-text>
                  <b-link href="#">Add</b-link>
                </b-card-text>
                <b-card-text>
                  <b-link href="#">List</b-link>
                </b-card-text>
              </b-card-body>
            </b-collapse>
          </b-card>
          <b-card no-body>
            <b-card-header>
              <b-link href="#" v-b-toggle.accordion-3>User</b-link>
            </b-card-header>
            <b-collapse id="accordion-3" accordion="my-accordion3">
              <b-card-body>
                <b-card-text>
                  <b-link href="#">Add</b-link>
                </b-card-text>
                <b-card-text>
                  <b-link href="#">List</b-link>
                </b-card-text>
              </b-card-body>
            </b-collapse>
          </b-card>
        </b-container>
    </b-nav>
</template>

<script>
import { eventBus } from '../../main'
export default {
  name: 'dashboard-leftnav',
  data () {
    return {
      vendorList: []
    }
  },
  computed: {
    isLoggedIn: function () { return this.$store.getters.isLoggedIn },
    user: function () { return this.$store.getters.user }
  },
  methods: {
    showDashboard: function (screen) {
      if (screen === 'vendorList') {
        this.processVendorListScreen(screen)
      } else {
        eventBus.$emit('showDashboardScreen', screen, null) // event processor in Dashboard.vue
      }
      let name = 'dashboard'
      if (this.$route.name !== name) { this.$router.push({name: name}) }
    },
    processVendorListScreen: function (screen) {
      this.$store
        .dispatch('getAllVendor')
        .then(resp => {
          this.vendorList = resp.data.vendorlist
          eventBus.$emit('showDashboardScreen', screen, this.vendorList) // event processor in Dashboard.vue
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>

</style>
