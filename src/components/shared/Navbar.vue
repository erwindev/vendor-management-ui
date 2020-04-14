<template>
    <div id="vmsui-navbar">
        <b-navbar type="dark" variant="info">
            <b-navbar-brand :to="{name: 'home'}">Home</b-navbar-brand>
            <b-navbar-nav class="mr-auto">
                <b-nav-item :to="{name: 'dashboard'}">Dashboard</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-item :to="{name: 'login'}">Login</b-nav-item>
                <b-nav-item :to="{name: 'register'}">Register</b-nav-item>
            </b-navbar-nav>
        </b-navbar>
    </div>
</template>

<script>
export default {
  name: 'vmsui-navbar'
}
</script>

<style scoped>

</style>
