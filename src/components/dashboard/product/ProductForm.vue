<template>
    <b-container class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
      <b-alert v-model="showalert" dismissible :variant="variant">{{this.message}}</b-alert>
      <h1>
        {{ title }}
      </h1>
      <b-form name="productForm" @submit.prevent="process">
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group label="Name">
              <b-form-input v-model="product.product_name" v-validate="'required|min:3'" name="name" ></b-form-input>
              <span v-show="errors.has('name')" class="text-danger">{{ errors.first('name') }}</span>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-6">
              <b-button variant="primary" v-if="methodtype == 'add'" type="submit" >Add Product</b-button>
              <b-button variant="primary" v-if="methodtype == 'edit'" type="submit" >Save Product</b-button>
              <b-button variant="primary" @click="getVendorProfile(product.id)">Back to Vendor</b-button>
            </b-col>
          </b-row>
      </b-form>
    </b-container>
</template>

<script>
import { eventBus } from '../../../main'

export default {
  name: 'ProductForm',
  props: {
    title: '',
    methodtype: '',
    productdata: {}
  },
  data () {
    return {
      product: {},
      showalert: false,
      variant: 'info',
      message: ''
    }
  },
  mounted: function () {
    this.product = {
      id: '',
      product_name: '',
      vendor_id: '',
      create_date: '',
      status: ''
    }
    this.resetForm(this.$validator)
    this.product = this.productdata
  },
  methods: {
    process: function (e) {
      if (this.methodtype === 'add') {
        this.addProduct()
      } else if (this.methodtype === 'edit') {
        this.updateProduct()
      }
    },
    addProduct: function () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          let payload = this.createPayload()
          payload.status = 'Active'
          this.$store
            .dispatch('addProduct', payload)
            .then(resp => {
              this.resetForm(this.$validator)
              this.showalert = true
              this.variant = 'info'
              this.message = 'Product successfully added.'
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
    updateProduct: function () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          let payload = this.createPayload()
          payload.id = this.product.id
          this.$store
            .dispatch('updateProduct', payload)
            .then(resp => {
              this.showalert = true
              this.variant = 'info'
              this.message = 'Product successfully updated.'
            })
            .catch(err => {
              this.showalert = true
              this.variant = 'danger'
              this.message = err.response.data.message
              console.log(err)
              console.log(payload)
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
      this.product.product_name = null
      validator.reset()
    },
    createPayload: function () {
      let userBy = this.$store.getters.user.email
      let vendorId = this.product.vendor_id
      let productName = this.product.product_name

      let payload = {
        vendor_id: String(vendorId),
        product_name: productName,
        user_by: userBy
      }

      return payload
    }

  }
}
</script>

<style scoped>

</style>
