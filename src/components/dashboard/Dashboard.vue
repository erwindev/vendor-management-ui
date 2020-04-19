<template>
    <b-container>
        <software-form
          @add:software="addSoftware"
        />

        <software-interactive-table
          :softwareList = "softwareList"
        />
    </b-container>
</template>

<script>
import axios from 'axios'
import SoftwareTable from './SoftwareTable.vue'
import SoftwareInteractiveTable from './SoftwareInteractiveTable.vue'
import SoftwareForm from './SoftwareForm.vue'

export default {
  components: {
    SoftwareTable,
    SoftwareInteractiveTable,
    SoftwareForm
  },
  data () {
    return {
      softwareList: []
    }
  },
  mounted () {
    this.getSofwtareList()
  },
  methods: {

    getSofwtareList () {
      axios.get('http://localhost:3000/softwareList')
        .then(response => {
          const data = response.data
          this.softwareList = data
        }, (error) => {
          console.error(error)
        })
    },

    addSoftware (software) {
      axios.post('http://localhost:3000/softwareList', software)
        .then(response => {
          const data = response.data
          this.softwareList = [...this.softwareList, data]
        }, (error) => {
          console.error(error)
        })
    },

    editSoftware (id, updatedSoftware) {
      axios.put(`http://localhost:3000/softwareList/${id}`, updatedSoftware)
        .then(response => {
          const data = response.data
          this.softwareList = this.softwareList.map(software =>
            software.id === id ? data : software)
        }, (error) => {
          console.error(error)
        })
    },

    deleteSoftware (id) {
      axios.delete(`http://localhost:3000/softwareList/${id}`)
        .then(response => {
          this.softwareList = this.softwareList.filter(
            software => software.id !== id)
        }, (error) => {
          console.error(error)
        })
    }
  }
}
</script>

<style scoped>

</style>
