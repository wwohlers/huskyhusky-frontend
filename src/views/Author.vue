<template>
  <div v-if="!loading">
    <h1>{{ author.name }}</h1>
    <p>{{ author.bio }}</p>
    <ArticleItem v-for="article in articles" :key="article.id" :article="article"></ArticleItem>
  </div>
</template>

<script>
import ArticleItem from '../components/ArticleItem';
import {http} from '../../global';

export default {
  name: 'Author',
  components: {
    ArticleItem,
  },
  data() {
    return {
      author: Object,
      articles: [Object],
      loading: Boolean,
    }
  },
  async created() {
    const id = this.$route.params.id;
    this.loading = true;
    await this.getAuthor(id);
    this.$title = this.author.name;
  },
  methods: {
    async getAuthor(id) {
      const self = this;
      this.axios.get(`${http}/users/${id}`)
      .then((response) => {
        if (response.data.name) {
          const author = response.data;
          self.author = author;
          
          this.axios.get(`${http}/users/${author.id}/articles`)
          .then((response) => {
            if (response.data.articles) {
              self.articles = response.data.articles;
            } else {
              self.$router.push({name: 'archive'});
            }
            self.loading = false;
          })
          .catch((error) => {
            console.log(error);
            self.$router.push({name: 'archive'});
          })
        } else {
          self.$router.push({name: 'archive'});
        }
      })
      .catch((error) => {
        console.log(error);
        self.$router.push({name: 'archive'});
      })
    },
  }
}
</script>