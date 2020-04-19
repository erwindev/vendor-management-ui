<template>
    <b-container>
      <h1>Profile</h1>
          <b-row>
            <b-col class="col-lg-2 text-right">
                <span>Name:</span>
            </b-col>
            <b-col class="col-lg-3">
                <span>{{ user.firstname + ' ' + user.lastname }}</span>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-2 text-right">
                <span>Email:</span>
            </b-col>
            <b-col class="col-lg-3">
                <span>{{ user.email }}</span>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-2 text-right">
                <span>Join date:</span>
            </b-col>
            <b-col class="col-lg-3">
                <span>{{ user.create_date }}</span>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-2 text-right">
                <span>Last login date:</span>
            </b-col>
            <b-col class="col-lg-3">
                <span>{{ user.last_login_date }}</span>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="col-lg-4 text-right">
                <b-button @click="edit">Edit</b-button>
            </b-col>
          </b-row>
    </b-container>
</template>

<script>
export default {
  name: 'UserProfile',
  computed: {
    user: function () { return this.$store.getters.user }
  },
  methods: {
    edit: function () {
      alert('yo!')
    }
  }
}
</script>

<style scoped>

</style>
