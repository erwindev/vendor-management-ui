<template>
  <b-container class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
    <b-alert v-model="showalert" dismissible :variant="variant">{{this.message}}</b-alert>
    <h1>Vendor List</h1>
    <b-row>
      <b-col lg="4" class="my-2">
        <b-form-group
          label="Filter"
          label-cols-sm="3"
          label-align-sm="left"
          label-size="sm"
          label-for="filterInput"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInput"
              placeholder="Type to Search"
            ></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>

    <b-table
      show-empty
      small
      head-variant="light"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      @filtered="onFiltered"
    >
      <template v-slot:row-details="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
          </ul>
        </b-card>
      </template>

      <template v-slot:cell(actions)="row">
        <b-button size="sm" @click="getVendorProfile(row.item.id)" class="mr-1">
          Profile
        </b-button>
        <b-button size="sm" @click="toggleVendorProfile(row.item.id, row.item.status)" class="mr-1">
          <template v-if="row.item.status=='Active'">
          Deactivate
          </template>
          <template v-if="row.item.status=='Inactive'">
          Activate
          </template>
        </b-button>
      </template>
    </b-table>

    <b-row>
      <b-col class="col-lg-12">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="center"
        ></b-pagination>
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
import { eventBus } from '../../../main'
export default {
  name: 'VendorList',
  props: {
    vendorList: Array
  },
  data () {
    return {
      items: this.vendorList,
      fields: [
        { key: 'name', label: 'Vendor name', sortable: true, sortDirection: 'desc' },
        { key: 'status', label: 'Status', sortable: true, class: 'text-left' },
        { key: 'create_date', label: 'Created Date', sortable: true, class: 'text-left' },
        { key: 'user_by', label: 'Added By', sortable: true, class: 'text-left' },
        { key: 'actions', label: 'Actions' }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 20,
      pageOptions: [20, 40, 60],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      showalert: false,
      variant: 'info',
      message: '',
      contacts: [],
      vendor: {}
    }
  },
  mounted () {
    // Set the initial number of items
    this.totalRows = Array.isArray(this.items) ? this.items.length : 0
  },
  methods: {
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    getVendorProfile: function (id) {
      this.$store
        .dispatch('getVendor', id)
        .then(resp => {
          this.vendor = resp.data
          eventBus.$emit('showDashboardScreen', 'vendorProfile', this.vendor) // event processor in Dashboard.vue
        })
        .catch(err => {
          console.log(err)
        })
    },
    toggleVendorProfile: function (id, status) {
      if (status === 'Active') {
        status = 'Inactive'
      } else {
        status = 'Active'
      }
      this.$store
        .dispatch('updateVendor', {id, status})
        .then(resp => {
          // this.showalert = true
          // this.variant = 'info'
          // this.message = 'Vendor successfully updated.'
          for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].id === id) {
              this.items[i].status = status
              break
            }
          }
        })
        .catch(err => {
          this.showalert = true
          this.variant = 'danger'
          this.message = err.response.data.message
          console.log(err)
        })
    }
  }
}
</script>
