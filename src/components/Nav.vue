<template>
    <div id="nav">
      <img class="hamburger" @click="toggle" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1200px-Hamburger_icon.svg.png"/>
      <router-link to="/"><img class="logo" src="../assets/biglogo.png"/></router-link>
      <div class="links">
        <router-link class="link" @click.native="hide" to="/">Home</router-link>
        <router-link class="link" @click.native="hide" to="/archive">Archive</router-link>
        <router-link class="link" @click.native="hide" to="/about">About Us</router-link>
        <router-link class="link" @click.native="hide" v-if="user" to="/account">Account</router-link>
        <router-link class="link" @click.native="hide(); signout();" v-if="user" to="/signin">Sign Out</router-link>
      </div>
      <div class="links-mobile" :style="{ display: displayType }">
        <router-link class="link-mobile" @click.native="hide" to="/">Home</router-link>
        <router-link class="link-mobile" @click.native="hide" to="/archive">Archive</router-link>
        <router-link class="link-mobile" @click.native="hide" to="/about">About Us</router-link>
        <router-link class="link-mobile" @click.native="hide" v-if="user" to="/account">Account</router-link>
        <router-link class="link-mobile" @click.native="hide(); signout();" v-if="user" to="/signin">Sign Out</router-link>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Nav',
  data() {
    return {
      displayType: "none"
    }
  },
  props: {
    user: Object
  },
  methods: {
    signout() {
      this.$cookie.delete('id');
      this.$cookie.delete('token');
      this.$router.push({name: 'signIn'});
      this.$emit('auth');
    },

    //Toggles menu (mobile only)
    toggle: function() {
      if (this.displayType == "none") {
        this.displayType = "block";
      } else {
        this.displayType = "none";
      }
    },

    //Hides menu, regardless of whether it is showing or not (mobile only)
    hide: function() {
      this.displayType = "none";
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

.logo {
  display: block;
  margin: auto;
  width: 15em;
}

.links {
  display: inline-block;
  margin-top: 20px;
}

.link, .link-mobile {
  display: inline-block;
  text-decoration: none;
  text-transform: uppercase;
  padding: 10px 10px 10px 10px;
  margin: 0 20px 0 20px;
  border-bottom: 2px solid white;
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

.hamburger {
  width: 1.5em;
  display: none;
  cursor: pointer;
}

@media only screen and (max-width: 800px) {
  .hamburger {
    display: inline-block;
    position: absolute;
    left: 2em;
  }

  .logo {
    display: inline-block;
  }

  .links {
    display: none;
  }

  .links-mobile {
    position: absolute;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 10;
    background-color: white;
  }

  .link-mobile {
    width: 60%;
    margin-bottom: 20px;
  }
}
</style>