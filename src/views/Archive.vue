<template>
  <div>
    <h1>Archive</h1>
    <button v-if="user" @click="newArticle">+ New Article</button> <br/><br/>
    <button v-if="admin" @click="bulk">+ New Bulk Email</button>
    <ArchiveList :user="user"></ArchiveList>
  </div>
</template>

<script>
import ArchiveList from '../components/ArchiveList';
import {http} from '../../global';

export default {
  metaInfo: {
    title: 'Archive'
  },
  name: 'Archive',
  components: {
    ArchiveList,
  },
  props: {
    user: Object
  },
  mounted() {
    this.$ga.page({
      page: '/archive',
      title: 'Archive',
      location: window.location.href
    });
  },
  methods: {
    newArticle() {
      const self = this;
      const emptyArticle = {
        name: '',
        title: '',
        category: 'Satire',
        brief: '',
        image: '',
        text: 'Start writing here...'
      };
      const url = http + '/articles/';
      this.axios.post(url, emptyArticle)
      .then((response) => {
        const article = response.data.article;
        if (article) {
          const id = article._id;
          self.$router.push({name: 'write', params: {id: id}});
        } else {
          console.log("Error");
        }
      })
      .catch((error) => {
        console.log("Server error: " + error.response.data);
      })
    },

    applications() {
      this.$router.push({name: 'applications'});
    },

    bulk() {
      this.$router.push({name: 'bulk'});
    }
  },
  computed: {
    admin() {
      return (this.user && this.user.admin);
    }
  }
}
</script>
