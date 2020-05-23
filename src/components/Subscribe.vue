<template>
  <div class="subscribe">
    <p>Stay Updated</p>
    <input type="text" placeholder="Email" class="subscribe" v-model="email"/>
    <br><br>
    <p v-if="response">{{ response }}</p>
    <button type="submit" @click="subscribe">Subscribe</button>
  </div>
</template>

<script>
import {http} from '../../global';

export default {
  name: 'Subscribe',
  data() {
    return {
      email: '',
      response: null
    }
  },
  methods: {
    subscribe() {
      let self = this;
      const url = http + "/subscribe";
      const body = {
        email: this.email
      };
      this.axios.post(url, body)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          self.response = "Subscribed " + self.email;
        } else {
          self.response = "An error occurred. Please make sure the email you entered is valid.";
        }
      })
      .catch((error) => {
        self.response = "An unknown error occurred.";
      })
    }
  }
}
</script>

<style scoped>
p {
  font-size: 20px;
  font-family: 'Raleway';
  text-transform: uppercase;
}

.subscribe {
  width: 15em;
  font-size: 16px;
}
</style>