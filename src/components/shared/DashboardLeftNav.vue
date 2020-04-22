<template>
    <b-nav class="col-md-2 d-none d-md-block bg-light sidebar">
        <b-container class="sidebar-sticky">
            <b-nav vertical>
                <h4>Welcome, {{ user.firstname }}!</h4>
                <b-nav-item href="#link-1">Vendors</b-nav-item>
                <b-nav-item href="#link-2">Products</b-nav-item>
                <b-nav-item href="#link-1">Users</b-nav-item>
                <b-nav-item href="#link-2">Reports</b-nav-item>
            </b-nav>
        </b-container>
    </b-nav>
</template>

<script>
export default {
  name: 'dashboard-leftnav',
  computed: {
    isLoggedIn: function () { return this.$store.getters.isLoggedIn },
    user: function () { return this.$store.getters.user }
  }
}
</script>

<style scoped>

</style>
