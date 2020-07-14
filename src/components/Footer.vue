<template>
  <div class="footer">
    <div class="footer-container">
      <div class="footer-item">
        <p class="mini-title">The Husky Husky</p>
          <a @click="route('home')">Home</a>
          <a @click="route('archive')">Archive</a>
          <a @click="route('about')">About Us</a>
          <a @click="route('signIn')">Sign In</a>
      </div>
      <div class="footer-item">
        <Subscribe></Subscribe>
      </div>
      <div class="footer-item">
        <p>&copy; {{ year }} The Husky Husky</p>
        <p><a href="https://billwohlers.com">Designed by Bill Wohlers</a></p>
      </div>
    </div>
  </div>
</template>

<script>
import Subscribe from './Subscribe';

export default {
  name: 'Footer',
  components: {
    Subscribe
  },
  methods: {
    route(name) {
      this.$router.push({ name: name });
    }
  },
  computed: {
    year() {
      return (new Date().getFullYear());
    }
  }
}
</script>

<style scoped>
.footer {
  background: #9c2828;
  padding: 60px 0 80px 0;
  color: white;
  font-size: 16px;
}

.footer-container {
  display: grid;
  grid-template-columns: 2fr 2fr 1fr;
  width: 70%;
  margin: auto;
}

.mini-title {
  font-size: 20px;
  font-family: 'Raleway';
  text-transform: uppercase;
}

a {
  cursor: pointer;
  text-decoration: none;
  color: white;
  display: block;
}

@media only screen and (max-width: 800px) {
  .footer {
    padding: 20px 0 30px 0;
  }
  
  .footer-container {
    grid-template-columns: 1fr;
    grid-gap: 1em;
  }

  .footer-item {
    padding-bottom: 2em;
    border-bottom: 1px solid white;
  }

  .footer-item:last-child {
    border-bottom: none;
  }
}
</style>