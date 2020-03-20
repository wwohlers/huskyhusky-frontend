<template>
  <div>
    <h1>Apply</h1>
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <form @submit.prevent class="center">
      <div class="form-item">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="name"/>
      </div>
      <div class="form-item">
        <label for="email">Email</label>
        <input type="text" id="email" v-model="email"/>
      </div>
      <div class="form-item">
        <label for="submission">Tell us why you'd like to write for us.</label>
        <textarea id="submission" v-model="submission"/>
      </div>
      <div class="form-item">
        <button type="submit" @click="apply">Apply</button>
      </div>
    </form>
  </div>
</template>

<script>
import {http} from '../../global';

export default {
  name: 'Apply',
  data() {
    return {
      name: '',
      email: '',
      submission: '',
      errorMessage: ''
    }
  },
  methods: {
    async apply() {
      if (await this.validate()) {
        const body = {
          name: this.name,
          email: this.email,
          submission: this.submission
        };
        const url = http + "/applications";
        this.axios.post(url, body)
        .then((response) => {
          if (response.data.app) {
            this.$router.push({ name: 'home' });
          } else {
            console.log("Failed");
          }
        })
        .catch((error) => {
          console.log("Failed with error: " + error);
        })
      }
    },

    async validate() {
      if (!this.validateEmail(this.email)) {
        this.errorMessage = "Email is not in the correct format";
        return false;
      }

      // check uniqueness
      const url = http + "/uniqueemail/";
      const body = {
        email: this.email
      };
      const res = await this.axios.post(url, body);
      if (res.data !== true) {
        this.errorMessage = "Email is not unique";
        return false;
      }

      return true;
    },
    
    validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  }
}
</script>