<template>
  <b-container fluid>
    <b-row>
      <b-col>
       <template v-if="isDashboard">
          <h1>Contact List</h1>
       </template>
      </b-col>
      <b-col lg="4" class="my-2">
        <b-form-group
          label-cols-sm="2"
          label-align-sm="right"
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
        <b-button size="sm" @click="editContact(row.item)" class="mr-1">
          Edit
        </b-button>
        <b-button size="sm" @click="toggleStatus(row.item.id, row.item.status)" class="mr-1">
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
  name: 'ContactList',
  props: {
    contacts: Array,
    name: '',
    isDashboard: false
  },
  data () {
    return {
      items: this.contacts,
      fields: [
        { key: 'name', label: 'Contact Name', sortable: true, sortDirection: 'desc' },
        { key: 'email', label: 'Email', sortable: false, class: 'text-left' },
        { key: 'phone1', label: 'Phone 1', sortable: false, class: 'text-left' },
        { key: 'street1', label: 'Created Date', sortable: false, class: 'text-left' },
        { key: 'city', label: 'City', sortable: false, class: 'text-left' },
        { key: 'state', label: 'State', sortable: false, class: 'text-left' },
        { key: 'zipcode', label: 'Zip Code', sortable: false, class: 'text-left' },
        { key: 'country', label: 'Country', sortable: false, class: 'text-left' },
        { key: 'status', label: 'Status', sortable: false, class: 'text-left' },
        { key: 'actions', label: 'Actions' }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: []
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
    editContact: function (contact) {
      eventBus.$emit('showDashboardScreen', 'vendorContactEdit', {contact: contact, name: this.name}) // event processor in Dashboard.vue
    },
    toggleStatus: function (id, status) {
      if (status === 'Active') {
        status = 'Inactive'
      } else {
        status = 'Active'
      }
      this.$store
        .dispatch('updateContact', {id, status})
        .then(resp => {
          for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].id === id) {
              this.items[i].status = status
              break
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
