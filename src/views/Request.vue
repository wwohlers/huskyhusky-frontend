<template>
  <div>
    <h1>Reset Your Password</h1>
    <form class="center"  v-on:submit.prevent>
      <div class="form-item">
        <p>We'll send you an email with further instructions.</p>
      </div>
      <div class="form-item">
        <label for="email">Email</label>
        <input type="text" placeholder="Email" id="email" v-model="email"/>
      </div>
      <p v-if="showResponse">{{ response }}</p>
      <button @click="request">OK</button>
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
  data() {
    return {
      email: '',
      response: '',
      showResponse: false
    }
  },
  methods: {
    request() {
      let self = this;
      const url = http + "/users/request";
      const body = {
        email: this.email
      };
      this.axios.post(url, body)
      .then((response) => {
        self.showResponse = true;
        if (response.status === 200) {
          self.response = "Email sent. Please check your inbox for further instructions.";
        } else {
          self.response = "Please ensure sure you've entered the correct email address."
        }
      })
      .catch((error) => {
        console.log(error);
        self.showResponse = true;
        self.response = "An error occurred.";
      })
    }
  }
}
</script>