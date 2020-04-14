<template>
    <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand :to="{name: 'home'}">VMS</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-item :to="{name: 'dashboard'}">Dashboard</b-nav-item>
                <b-nav-item :to="{name: 'login'}">Login</b-nav-item>
                <b-nav-item-dropdown right>
                    <template v-slot:button-content>
                        User
                    </template>
                    <b-dropdown-item href="#">Profile</b-dropdown-item>
                    <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
export default {
  name: 'vmsui-navbar'
}
</script>

<style scoped>

</style>
