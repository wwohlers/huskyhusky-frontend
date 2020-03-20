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
        <button type="submit" @click="signin">Sign In</button>
      </div>
    </form>
  </div>
</template>

<script>
import {http} from '../../global';

export default {
  name: 'Auth',
  data() {
    return {
      email: '',
      password: ''
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
          console.log("Authentication failed");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
}
</script>