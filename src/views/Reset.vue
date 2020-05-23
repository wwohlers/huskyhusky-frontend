<template>
  <div>
    <h1>Reset Your Password</h1>
    <form class="center" v-on:submit.prevent>
      <p>Make it more memorable this time...</p>
      <div class="form-item">
        <input type="password" placeholder="Password" v-model="pw1"/>
        <input type="password" placeholder="Retype Password" v-model="pw2"/>
      </div>
      <p v-if="showResponse">{{ response }}</p>
      <button @click="reset">Reset Password</button>
    </form>
  </div>
</template>

<script>
import {http} from '../../global';

export default {
  metaInfo: {
    title: 'Reset Password'
  },
  name: 'Request',
  props: {
    id: String,
    _key: String
  },
  data() {
    return {
      pw1: '',
      pw2: '',
      response: '',
      showResponse: false
    }
  },
  methods: {
    reset() {
      if (this.pw1 !== this.pw2) {
        this.response = "Passwords must match";
        this.showResponse = true;
      } else {
        let self = this;
        const url = http + "/users/reset";
        const body = {
          id: this.id,
          key: this._key,
          password: this.pw1,
        };
        this.axios.post(url, body)
        .then((response) => {
          if (response.status === 200) {
            self.$router.push({name: 'signIn'});
          } else {
            self.response = "An error occurred. Please make sure that you've followed the link directly from your email. If you're still getting an error, try resetting your password again.";
            self.showResponse = true;
          }
        })
        .catch((error) => {
          self.showResponse = true;
          self.response = "An unknown error occurred.";
        })
      }
    }
  }
}
</script>