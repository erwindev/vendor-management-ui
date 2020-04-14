<template>
    <b-container>
      <h1>Register</h1>
      <b-form>
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group
                label="First Name"
              >
              <b-form-input id="firstname"></b-form-input>
            </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group
                label="Last Name"
              >
              <b-form-input id="lastname"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group
                label="Username"
              >
              <b-form-input id="username"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group
                label="Email"
              >
              <b-form-input id="email"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group
                label="Password"
              >
              <b-form-input id="password" type="password"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-6">
              <b-form-group
                label="Confirm Password"
              >
              <b-form-input id="repeatpassword" type="password"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-6">
              <b-button>Register</b-button>
            </b-col>
          </b-row>
      </b-form>
    </b-container>
</template>

<script>
export default {
}
</script>

<style scoped>

</style>
