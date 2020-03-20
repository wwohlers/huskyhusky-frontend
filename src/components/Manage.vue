<template>
  <div v-if="user">
    <ul>
      <li v-for="user in users" :key="user._id">
        {{ user.name }}
        <button class="small" @click="setAdmin(user._id, false)" v-if="user.admin">Remove admin privileges</button>
        <button class="small" @click="setAdmin(user._id, true)" v-else>Grant admin privileges</button>
      </li>
    </ul>
  </div>
</template>

<script>
import {http} from '../../global';

export default {
  name: 'Manage',
  data() {
    return {
      users: []
    }
  },
  props: {
    user: Object
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      const url = http + "/users/";
      let self = this;
      this.axios.get(url)
      .then((response) => {
        const users = response.data.users;
        if (users) {
          self.users = users;
        } else {
          console.log("Error", response);
        }
      })
      .catch((error) => {
        console.log("Error", response);
      })
    },

    setAdmin(id, val) {
      let self = this;
      const body = {
        id: id,
        admin: val
      };
      const url = http + "/users/admin";
      this.axios.put(url, body)
      .then((response) => {
        const user = response.data.user;
        if (user) {
          self.load();
        } else {
          console.log("Error", response);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      })
    }
  }
}
</script>