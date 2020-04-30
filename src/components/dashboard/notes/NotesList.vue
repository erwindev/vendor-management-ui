<template>
  <b-container fluid>
    <b-row>
      <b-col lg="4" class="my-2">
        <b-form-group
          label="Filter"
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
        <b-button size="sm" @click="deleteNotes(row.item.id)" class="mr-1">
          Delete
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
export default {
  name: 'NotesList',
  props: {
    notes: Array,
    name: ''
  },
  data () {
    return {
      items: this.notes,
      fields: [
        { key: 'notes', label: 'Notes', sortable: true, sortDirection: 'desc' },
        { key: 'user_by', label: 'Added By', sortable: true, class: 'text-left' },
        { key: 'create_date', label: 'Created Date', sortable: false, class: 'text-left' },
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
      filterOn: [],
      showalert: false,
      variant: 'info',
      message: ''
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
    deleteNotes: function (id) {
      this.$store
        .dispatch('deleteNotes', id)
        .then(resp => {
          for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].id === id) {
              this.items.splice(i, 1)
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
