<template>
    <div id="login">
    <h1>Sign In</h1>
    <form action="">
        <div class="row">
          <div class="form-group col-lg-6">
            <label for="username">Username</label><br>
            <input id="username" class="form-control" type="text" value="">
          </div>
        </div>
        <div class="row">
          <div class="form-group col-lg-6">
            <label for="password">Password</label><br>
            <input id="password" class="form-control" type="password" value="">
            </div>
        </div>
        <div class="row">
          <div class="form-group col-lg-6">
            <button type="button" class="btn btn-primary">Login</button>
          </div>
        </div>
    </form>
    <router-link :to="{name: 'register'}">Click to Register!</router-link>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>
