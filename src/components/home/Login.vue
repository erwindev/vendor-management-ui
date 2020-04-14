<template>
     <b-container>
        <h1>Sign In</h1>
        <b-form>
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
                  label="Password"
                >
                <b-form-input id="password" type="password"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col class="col-lg-6">
                <b-button>Register</b-button>
              </b-col>
            </b-row>
        </b-form>
        <br>
        <router-link :to="{name: 'register'}">Click to Register!</router-link>
     </b-container>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>
