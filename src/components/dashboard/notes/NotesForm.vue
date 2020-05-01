<template>
    <b-container fluid>
      <b-alert v-model="showalert" dismissible :variant="variant">{{this.message}}</b-alert>
      <h1>
        {{ title }}
      </h1>
      <b-form name="notesForm" @submit.prevent="process">
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group label="Notes">
              <b-form-textarea
                        v-model="notes.notes"
                        v-validate="'required'"
                        name="notes" rows="3"
                        max-rows="6">
              </b-form-textarea>
              <span v-show="errors.has('notes')" class="text-danger">{{ errors.first('notes') }}</span>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-6">
              <b-button variant="primary" v-if="methodtype == 'add' && notes.notes_type_id == '1000'" type="submit" >Add Vendor Notes</b-button>
              <b-button variant="primary" v-if="methodtype == 'edit' && notes.notes_type_id == '1000'" type="submit" >Save Vendor Notes</b-button>
              <b-button variant="primary" v-if="notes.notes_type_id == '1000'" @click="getVendorProfile(notes.notes_id)">Back to Vendor</b-button>
            </b-col>
          </b-row>
      </b-form>
    </b-container>
</template>

<script>
import { eventBus } from '../../../main'

export default {
  name: 'NotesForm',
  props: {
    title: '',
    methodtype: '',
    notesdata: {}
  },
  data () {
    return {
      notes: {},
      showalert: false,
      variant: 'info',
      message: ''
    }
  },
  mounted: function () {
    this.notes = {
      id: '',
      notes_id: '',
      notess_type_id: '',
      notes: ''
    }
    this.resetForm(this.$validator)
    if ((Object.keys(this.notesdata).length > 2)) {
      this.notes = this.notesdata
    } else {
      this.notes.notes_id = this.notesdata.notes_id
      this.notes.notes_type_id = this.notesdata.notes_type_id
    }
  },
  methods: {
    process: function (e) {
      if (this.methodtype === 'add') {
        this.addNotes()
      } else if (this.methodtype === 'edit') {
        this.updateNotes()
      }
    },
    addNotes: function () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          let payload = this.createPayload()
          this.$store
            .dispatch('addNotes', payload)
            .then(resp => {
              this.resetForm(this.$validator)
              this.showalert = true
              this.variant = 'info'
              this.message = 'Notes successfully added.'
            })
            .catch(err => {
              this.showalert = true
              this.variant = 'danger'
              this.message = err.response.data.message
              console.log(err)
            })
        }
      })
    },
    updateNotes: function () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          let payload = this.createPayload()
          payload.id = this.notes.id
          this.$store
            .dispatch('updateNotes', payload)
            .then(resp => {
              this.showalert = true
              this.variant = 'info'
              this.message = 'Notes successfully updated.'
            })
            .catch(err => {
              this.showalert = true
              this.variant = 'danger'
              this.message = err.response.data.message
              console.log(err)
            })
        }
      })
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
    resetForm (validator) {
      this.notes.notes = null
      validator.reset()
    },
    createPayload: function () {
      let userBy = this.$store.getters.user.email
      let notesTypeId = this.notes.notes_type_id
      let notesId = this.notes.notes_id
      let notes = this.notes.notes

      let payload = {
        notes_id: String(notesId),
        notes_type_id: String(notesTypeId),
        notes,
        user_by: userBy
      }

      return payload
    }

  }
}
</script>

<style scoped>

</style>
