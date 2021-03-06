<template>
  <div v-if="user">
    <h1>Account</h1>
    <p class="error" v-if="errorMessage">{{ errorMessage }}</p>
    <p class="success" v-if="successMessage">{{ successMessage }}</p>
    <div>
      <h2>Email</h2>
      <input type="text" v-model="user.email" v-if="onEmail" />
      <span v-else>{{ user.email }}</span>
      <br><br>
      <button @click="changeEmail">Change</button>
    </div>
    <br><br>
    <div>
      <h2>Password</h2>
      <form @click.prevent v-if="onPassword">
        <div class="form-item">
          <label for="curr">Current Password</label>
          <input type="password" v-model="currentPass" id="curr"/>
        </div>
        <div class="form-item">
          <label for="new1">New Password</label>
          <input type="password" v-model="password" id="new1"/>
          <input type="password" v-model="password2" placeholder="Type again..."/>
        </div>
      </form>
      <button @click="changePassword">Change Password</button>
    </div>
    <br><br>
    <div>
      <h2>Edit Bio</h2>
      <input type="text" v-model="bio" />
      <br>
      <button @click="setBio">Done</button>
    </div>
    <br><br>
    <div v-if="user.admin">
      <h2>Manage Users and Admins</h2>
      <CreateUser></CreateUser>
      <Manage :user="user"></Manage>
    </div>
    <button @click="signout">Sign Out</button>
  </div>
</template>

<script>
import Manage from '../components/Manage';
import CreateUser from '../components/CreateUser.vue';
import {http} from '../../global';

export default {
  metaInfo: {
    title: 'Account'
  },
  name: 'Account',
  components: {
    Manage,
    CreateUser
  },
  props: {
    user: Object,
    loadingAuth: Boolean
  },
  data() {
    return {
      onEmail: false,
      onPassword: false,
      errorMessage: '',
      successMessage: '',
      currentPass: '',
      password: '',
      password2: '',
      bio: '',
    }
  },
  mounted() {
    if (this.user) {
      this.init();
    }
  },
  watch: {
    loadingAuth: function(val) {
      if (!val) {
        if (!this.user) {
          this.$router.push('signIn');
        } else {
          this.init();
        }
      }
    }
  },
  methods: {
    init() {
      this.email = this.user.email;
      this.bio = this.user.bio;
    },

    async changeEmail() {
      if (this.onEmail) {
        const valid = await this.validateEmail(this.user.email);
        if (valid) {
          const self = this;
          const url = http + "/users/email";
          const body = {
            email: this.user.email
          };
          this.axios.put(url, body)
          .then((response) => {
            if (response.data.user) {
              self.onEmail = false;
            } else {
              console.log("Error", response);
            }
          })
          .catch((error) => {
            console.log("Error", error.response);
          })
        } else {
          console.log("Email not valid");
        }
      } else {
        this.onEmail = true;
      }
    },

    async changePassword() {
      if (this.onPassword) {
        if (await this.validatePassword(this.currentPass, this.password, this.password2)) {
          let self = this;
          const url = http + "/users/password";
          const body = {
            password: this.password
          }
          this.axios.put(url, body)
          .then((response) => {
            const user = response.data.user;
            if (user) {
              self.onPassword = false;
            } else {
              console.log("Failed", response);
            }
          })
          .catch((error) => {
            console.log("Failed", error);
          })
        }
      } else {
        this.onPassword = true;
      }
    },

    async setBio() {
      let self = this;
      const url = http + "/users/bio";
      const body = {
        bio: this.bio,
      }
      this.axios.put(url, body)
      .then((response) => {
        if (response.status === 200) {
          self.success("Bio updated");
        } else {
          self.error("An error occurred");
        }
      })
      .catch((error) => {
        console.log(error);
        self.error("An error occurred");
      })
    },

    success(message) {
      this.successMessage = message;
      const self = this;
      setTimeout(() => {
        self.successMessage = '';
      }, 5000);
    },

    error(message) {
      this.errorMessage = message;
      const self = this;
      setTimeout(() => {
        self.errorMessage = '';
      }, 5000);
    },

    signout() {
      this.$cookie.delete('id');
      this.$cookie.delete('token');
      this.$router.push({name: 'signIn'});
      this.$emit('auth');
    },
    
    async validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(String(email).toLowerCase())) {
        this.error("Email is not in the correct format");
        return false;
      }

      // check uniqueness
      const url = http + "/uniqueemail/";
      const body = {
        email: email
      };
      const res = await this.axios.post(url, body);
      if (res.data !== true) {
        this.error("This email is already in use");
        return false;
      }

      return true;
    },

    async validatePassword(curr, new1, new2) {
      if (new1 != new2) {
        this.error("Passwords do not match");
        return false;
      }
      if (new1.length < 8) {
        this.error("Passwords must be at least 8 characters long");
        return false;
      }
      
      const self = this;
      const body = {
        email: this.user.email,
        password: curr
      }
      const url = http + "/users/login";
      const res = await this.axios.post(url, body);
      if (!res.data.user) {
        console.log(res.data);
        this.error("Incorrect current password");
        return false;
      }
      return true;
    }
  }
}
</script>

<style scoped>
textarea {
  margin: 0;
}
</style>