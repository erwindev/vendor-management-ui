<template>
    <b-container fluid>
      <b-alert v-model="showalert" dismissible :variant="variant">{{this.message}}</b-alert>
      <h1>
        {{ title }}
      </h1>
      <b-form name="attachmentForm" @submit.prevent="process">
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group label="Name">
              <b-form-input v-model="attachment.name" v-validate="'required|min:3'" name="name" ></b-form-input>
              <span v-show="errors.has('name')" class="text-danger">{{ errors.first('name') }}</span>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group label="Description">
              <b-form-textarea
                        v-model="attachment.description"
                        v-validate="'required'"
                        name="description" rows="3"
                        max-rows="6">
              </b-form-textarea>
              <span v-show="errors.has('description')" class="text-danger">{{ errors.first('description') }}</span>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group label="Link">
              <b-form-input v-model="attachment.link" v-validate="'required|min:3'" name="link" ></b-form-input>
              <span v-show="errors.has('link')" class="text-danger">{{ errors.first('link') }}</span>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-6">
              <b-button variant="primary" v-if="methodtype == 'add' && attachment.attachment_type_id == '1000'" type="submit" >Add Vendor Attachment</b-button>
              <b-button variant="primary" v-if="methodtype == 'edit' && attachment.attachment_type_id == '1000'" type="submit" >Save Vendor Attachment</b-button>
              <b-button variant="primary" v-if="attachment.attachment_type_id == '1000'" @click="getVendorProfile(attachment.attachment_id)">Back to Vendor</b-button>
            </b-col>
          </b-row>
      </b-form>
    </b-container>
</template>

<script>
import { eventBus } from '../../../main'

export default {
  name: 'AttachmentForm',
  props: {
    title: '',
    methodtype: '',
    attachmentdata: {}
  },
  data () {
    return {
      attachment: {},
      showalert: false,
      variant: 'info',
      message: ''
    }
  },
  mounted: function () {
    this.attachment = {
      id: '',
      attachment_id: '',
      attachment_type_id: '',
      name: '',
      description: '',
      link: ''
    }
    this.resetForm(this.$validator)
    if ((Object.keys(this.attachmentdata).length > 2)) {
      this.attachment = this.attachmentdata
    } else {
      this.attachment.attachment_id = this.attachmentdata.attachment_id
      this.attachment.attachment_type_id = this.attachmentdata.attachment_type_id
    }
  },
  methods: {
    process: function (e) {
      if (this.methodtype === 'add') {
        this.addAttachment()
      } else if (this.methodtype === 'edit') {
        this.updateAttachment()
      }
    },
    addAttachment: function () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          let payload = this.createPayload()
          this.$store
            .dispatch('addAttachment', payload)
            .then(resp => {
              this.resetForm(this.$validator)
              this.showalert = true
              this.variant = 'info'
              this.message = 'Attachment successfully added.'
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
    updateAttachment: function () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          let payload = this.createPayload()
          payload.id = this.attachment.id
          this.$store
            .dispatch('updateAttachment', payload)
            .then(resp => {
              this.showalert = true
              this.variant = 'info'
              this.message = 'Attachment successfully updated.'
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
      this.attachment.name = null
      this.attachment.description = null
      this.attachment.link = null
      validator.reset()
    },
    createPayload: function () {
      let userBy = this.$store.getters.user.email
      let attachmentTypeId = this.attachment.attachment_type_id
      let attachmentId = this.attachment.attachment_id
      let name = this.attachment.name
      let description = this.attachment.description
      let link = this.attachment.link

      let payload = {
        attachment_id: String(attachmentId),
        attachment_type_id: String(attachmentTypeId),
        name,
        description,
        link,
        user_by: userBy
      }

      return payload
    }

  }
}
</script>

<style scoped>

</style>
