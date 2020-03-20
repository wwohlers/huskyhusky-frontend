<template>
  <div>
    <h1>Applications</h1>
    <div v-for="application in applications" :key="application._id">
      <p @click="select(application)">{{ application.name }}</p>
    </div>
    <div v-if="selected">
      <h2>{{ selected.name }}</h2>
      <p>{{ selected.email }}</p>
      <p>Submitted {{ datify(selected.created_at) }}</p>
      <p>{{ selected.submission }}</p>
      <button v-if="!selected.approved" @click="approve(selected._id)">Approve</button>
    </div>
  </div>
</template>

<script>
import {http} from '../../global';

export default {
  name: 'Applications',
  data() {
    return {
      applications: [],
      selected: null
    }
  },
  props: {
    user: Object,
    loadingAuth: Boolean
  },
  mounted() {
    this.checkAuth(this.loadingAuth, this.user);
  },

  methods: {
    checkAuth(loadingAuth, user) {
      if (!loadingAuth) {
        if (!user) {
          this.$router.push({name: 'signIn'});
        } else {
          this.loadApplications();
        }
      }
    },

    loadApplications() {
      const self = this;
      const url = http + "/applications"
      this.axios.get(url)
      .then((response) => {
        const apps = response.data.apps;
        if (apps) {
          self.applications = apps;
        } else {
          self.$router.push({name: 'signIn'});
        }
      })
      .catch((error) => {
        self.$router.push({name: 'signIn'});
      })
    },

    select(application) {
      this.selected = application;
    },

    datify(str) {
      const d = new Date(str);
      return d.toDateString();
    },

    approve(id) {
      const url = http + "/applications/" + id;
      const body = {
        approved: true
      };
      let self = this;
      this.axios.put(url, body)
      .then((response) => {
        const app = response.data.app;
        if (!app) {
          console.log("Failed", response);
        }
      })
      .catch((error) => {
        console.log("Failed", error);
      })
    }
  },
  watch: {
    loadingAuth: function(val) {
      this.checkAuth(val, this.user);
    }
  }
}
</script>
