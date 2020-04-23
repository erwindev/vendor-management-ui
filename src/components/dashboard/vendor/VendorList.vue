<template>
  <b-container fluid="true">
    <h1>Vendor List</h1>
    <b-row>
      <b-col class="col-lg-8">
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

    <!-- Main table element -->
    <b-table
      show-empty
      small
      stacked="md"
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
    </b-table>

    <b-row>
      <b-col class="col-lg-12">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="col-lg-12"
        ></b-pagination>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
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
        { key: 'website', label: 'Website', sortable: true, class: 'text-left' },
        { key: 'status', label: 'Status', sortable: true, class: 'text-left' },
        { key: 'created_date', label: 'Created Date', sortable: true, class: 'text-left' },
        { key: 'user_by', label: 'Added By', sortable: true, class: 'text-left' }
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
    }
  }
}
</script>
