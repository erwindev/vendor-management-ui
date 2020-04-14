<template>
    <div id="software-table">
        <p v-if="softwareList.length < 1" class="empty-table">
            No Software
        </p>
        <table v-else class="table">
            <thead>
                <tr>
                    <th>Software Name</th>
                    <th>Vendor Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="software in softwareList" :key="software.id">
                    <td v-if="editing === software.id">
                        <input type="text" class="form-control" v-model="software.software_name">
                    </td>
                    <td v-else>{{software.software_name}}</td>
                    <td v-if="editing === software.id">
                        <input type="text" class="form-control" v-model="software.vendor_name">
                    </td>
                    <td v-else>{{software.vendor_name}}</td>
                    <td v-if="editing === software.id">
                        <button type="button" class="btn btn-primary" @click="editSoftware(software)">Save</button>
                        <button type="button" class="btn btn-primary" @click="cancelEdit(software)">Cancel</button>
                    </td>
                    <td v-else>
                        <button type="button" class="btn btn-primary" @click="editMode(software)">Edit</button>
                        <button type="button" class="btn btn-primary" @click="$emit('delete:software', software.id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
  name: 'software-table',
  props: {
    softwareList: Array
  },
  data () {
    return {
      editing: null
    }
  },
  methods: {
    editMode (software) {
      this.cachedSofware = Object.assign({}, software)
      this.editing = software.id
    },

    cancelEdit (software) {
      Object.assign(software, this.cachedSofware)
      this.editing = null
    },

    editSoftware (software) {
      if (software.software_name === '' || software.vendor_name === '') return
      this.$emit('edit:software', software.id, software)
      this.editing = null
    }
  }
}
</script>

<style scoped>
  button {
    margin: 0 0.5rem 0 0;
  }
</style>
