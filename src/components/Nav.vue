<template>
    <div id="nav">
      <img class="logo" src="http://thehuskyhusky.com/uploads/1/2/6/2/126206759/published/logo_2.png?1574120038"/>
      <div class="links">
        <router-link class="link" to="/">Home</router-link>
        <router-link class="link" to="/archive">Archive</router-link>
        <router-link class="link" to="/about">About Us</router-link>
        <router-link class="link" v-if="user" to="/signin" @click.native="signout">Sign Out</router-link>
        <router-link class="link" v-if="user" to="/account">Account</router-link>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Nav',
  props: {
    user: Object
  },
  methods: {
    signout() {
      this.$cookie.delete('id');
      this.$cookie.delete('token');
      this.$router.push({name: 'signIn'});
      this.$emit('auth');
    }
  }
}
</script>

<style scoped>
#nav {
  text-align: center;
  width: 80%;
  margin: auto;
  padding: 20px 0 20px 0;
  font-family: 'Raleway';
}

#nav img {
  display: block;
  margin: auto;
}

.links {
  display: inline-block;
  margin-top: 20px;
}

.link {
  display: inline-block;
  text-decoration: none;
  text-transform: uppercase;
  padding: 10px 10px 10px 10px;
  margin: 0 20px 0 20px;
}

.link:hover {
  border-bottom: 2px solid #bd0d00;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  border-bottom: 2px solid #bd0d00;
}
</style>