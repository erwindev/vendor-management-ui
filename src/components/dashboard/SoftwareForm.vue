<template>
  <b-container>
    <b-form @submit.prevent="handleSubmit">
      <h1>Software</h1>
        <b-row>
          <div class="form-group col-lg-6">
            <label>Software Name</label>
            <input ref="first"
                    type="text"
                    :class="{ 'has-error': submitting && invalidSoftwareName}"
                    v-model="software.software_name"
                    @focus="clearStatus"
                    @keypress="clearStatus"
                    class="form-control"
            />
          </div>
        </b-row>
        <b-row>
          <div class="form-group col-lg-6">
            <label>Vendor Name</label>
            <input type="text"
                    :class="{ 'has-error': submitting && invalidVendorName}"
                    v-model="software.vendor_name"
                    @focus="clearStatus"
                    class="form-control"
            />
          </div>
        </b-row>
        <b-row>
          <p v-if="error && submitting" class="error-message">
              ❗Please fill out all required fields
          </p>
          <p v-if="success" class="success-message">
              ✅ Software successfully added
          </p>
        </b-row>
        <b-row>
          <div class="form-group col-lg-6">
          <button class="btn btn-primary">Add Software</button>
          </div>
        </b-row>
    </b-form>
  </b-container>
</template>

<script>
export default {
  name: 'software-form',
  data () {
    return {
      submitting: false,
      error: false,
      success: false,
      software: {
        software_name: '',
        vendor_name: ''
      }
    }
  },
  methods: {
    handleSubmit () {
      this.submitting = true
      this.clearStatus()

      if (this.invalidSoftwareName || this.invalidVendorName) {
        this.error = true
        return
      }

      this.$emit('add:software', this.software)
      this.$refs.first.focus()
      this.software = {
        software_name: '',
        vendor_name: ''
      }

      this.error = false
      this.success = true
      this.submitting = false
    },

    clearStatus () {
      this.success = false
      this.error = false
    }
  },
  computed: {
    invalidSoftwareName () {
      return this.software.software_name === ''
    },
    invalidVendorName () {
      return this.software.vendor_name === ''
    }
  }
}
</script>

<style scoped>
  form {
    margin-bottom: 2rem;
  }

  [class*='-message'] {
    font-weight: 500;
  }

  .error-message {
    color: #d33c40;
  }

  .success-message {
    color: #32a95d;
  }
</style>
