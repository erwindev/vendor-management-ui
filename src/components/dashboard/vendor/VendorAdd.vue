<template>
    <b-container class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
      <b-alert v-model="showalert" dismissible :variant="variant">{{this.message}}</b-alert>
      <h1>Add Vendor</h1>
      <b-form @submit.prevent="addvendor">
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group label="Vednor Name">
              <b-form-input v-model="name" v-validate="'required|min:3'" name="name"></b-form-input>
              <span v-show="errors.has('name')" class="text-danger">{{ errors.first('name') }}</span>
            </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group label="Website">
              <b-form-input v-model="website" v-validate="'required|min:3'" name="website"></b-form-input>
              <span v-show="errors.has('website')" class="text-danger">{{ errors.first('website') }}</span>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-6">
              <b-button variant="primary" type="submit">Add</b-button>
            </b-col>
          </b-row>
      </b-form>
    </b-container>
</template>

<script>
export default {
  name: 'VendorAdd',
  data () {
    return {
      name: '',
      website: '',
      showalert: false,
      variant: 'info',
      message: ''
    }
  },
  methods: {
    addvendor: function (e) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          let name = e.target.elements.name.value
          let website = e.target.elements.website.value
          this.$store
            .dispatch('addvendor', { name, website })
            .then(() => {
              this.showalert = true
              this.variant = 'info'
              this.message = 'Vendor successfully added.'
            })
            .catch(err => {
              this.showalert = true
              this.variant = 'danger'
              this.message = err.response.data.message
              console.log(err)
            })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
