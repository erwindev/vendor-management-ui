<template>
    <b-nav class="col-md-2 sidebar">
        <b-container class="sidebar-sticky">
          <b-card no-body>
            <b-card-header>
              <b-link href="#" v-b-toggle.accordion-1>Vendor</b-link>
            </b-card-header>
            <b-collapse id="accordion-1" accordion="my-accordion1" visible="true">
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
            <b-collapse id="accordion-2" accordion="my-accordion2" visible="true">
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
            <b-collapse id="accordion-3" accordion="my-accordion3" visible="true">
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
/* Remove default bullets */
ul, #myUL {
  list-style-type: none;
}

/* Remove margins and padding from the parent ul */
#myUL {
  margin: 0;
  padding: 0;
}

/* Style the caret/arrow */
.caret {
  cursor: pointer;
  user-select: none; /* Prevent text selection */
}

/* Create the caret/arrow with a unicode, and style it */
.caret::before {
  content: "\25B6";
  color: black;
  display: inline-block;
  margin-right: 6px;
}

/* Rotate the caret/arrow icon when clicked on (using JavaScript) */
.caret-down::before {
  transform: rotate(90deg);
}

/* Hide the nested list */
.nested {
  display: none;
}

/* Show the nested list when the user clicks on the caret/arrow (with JavaScript) */
.active {
  display: block;
}
</style>
