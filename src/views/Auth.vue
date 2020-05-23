<template>
  <div>
    <h1>Sign in</h1>
    <form @submit.prevent class='center'>
      <div class="form-item">
        <label for="email">Email</label>
        <input type="text" id="email" v-model="email" />
      </div>
      <div class="form-item">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <div class="form-item">
        <p v-if="response">{{ response }}</p>
        <p><router-link to="/request">Forgot your password?</router-link></p>
        <button type="submit" @click="signin">Sign In</button>
      </div>
    </form>
  </div>
</template>

<script>
import {http} from '../../global';

export default {
  metaInfo: {
    title: 'Sign In'
  },
  name: 'Auth',
  data() {
    return {
      email: '',
      password: '',
      response: ''
    }
  },
  methods: {
    signin() {
      let self = this;
      const _email = this.email;
      const _pass = this.password;
      this.axios.post(http + '/users/login', {
        email: _email,
        password: _pass
      })
      .then(function (response) {
        if (response.data.user) {
          self.$cookie.set('id', response.data.user._id, 'User id', { expires: '1D' });
          self.$cookie.set('token', response.data.token, 'Auth token', { expires: '1D' });
          self.$router.push({name: 'archive'});
          self.$emit('auth');
        } else {
          self.response = "Sign in failed. Make sure you've entered the correct email and password.";
        }
      })
      .catch(function (error) {
          self.response = "Sign in failed. Make sure you've entered the correct email and password.";
      });
    }
  }
}
</script>