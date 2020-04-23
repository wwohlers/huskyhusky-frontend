<template>
  <div>
    <button @click="open">+ Create New User</button>
    <p v-if="success">User successfully created</p>
    <p v-if="error">An error occurred</p>
    <form @submit.prevent v-if="show">
      <input type="text" v-model="name" placeholder="Full name"/>
      <br/>
      <input type="text" v-model="email" placeholder="Email"/>
      <br/>
      <input type="password" v-model="password" placeholder="Temporary password"/>
      <br/>
      <button @click="create">Create</button>
    </form>
  </div>
</template>

<script>
import {http} from '../../global';

export default {
  name: 'CreateUser',
  data() {
    return {
      show: false,
      success: false,
      error: false,
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    open() {
      this.show = !this.show;
    },
    create() {
      const body = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      const url = http + "/users";
      this.axios.post(url, body) 
      .then((response) => {
        if (response.data.user) {
          this.success = true;
          this.show = false;
        } else {
          this.error = true;
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
        this.error = true;
      })
    }
  }
}
</script>