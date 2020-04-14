<template>
    <b-container>
        <software-form
          @add:software="addSoftware"
        />

        <software-table
          :softwareList = "softwareList"
          @delete:software="deleteSoftware"
          @edit:software="editSoftware"
        />

        <software-interactive-table
          :softwareList = "softwareList"
        />
    </b-container>
</template>

<script>
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
    async getSofwtareList () {
      try {
        const response = await fetch('http://localhost:3000/softwareList')
        const data = await response.json()
        this.softwareList = data
      } catch (error) {
        console.error(error)
      }
    },

    async addSoftware (software) {
      try {
        const response = await fetch('http://localhost:3000/softwareList', {
          method: 'POST',
          body: JSON.stringify(software),
          headers: {'Content-type': 'application/json; charset=UTF-8'}
        })
        const data = await response.json()
        this.softwareList = [...this.softwareList, data]
      } catch (error) {
        console.error(error)
      }
    },

    async editSoftware (id, updatedSoftware) {
      try {
        const response = await fetch(`http://localhost:3000/softwareList/${id}`, {
          method: 'PUT',
          body: JSON.stringify(updatedSoftware),
          headers: {'Content-type': 'application/json; charset=UTF-8'}
        })
        const data = await response.json()
        this.softwareList = this.softwareList.map(software =>
          software.id === id ? data : software)
      } catch (error) {
        console.error(error)
      }
    },

    async deleteSoftware (id) {
      try {
        await fetch(`http://localhost:3000/softwareList/${id}`, {
          method: 'DELETE'
        })
        this.softwareList = this.softwareList.filter(
          software => software.id !== id)
      } catch (error) {
        console.error(error)
      }
    }

  }
}
</script>

<style scoped>

</style>
