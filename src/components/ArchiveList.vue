<template>
  <div class="archive-list">
    <ArchiveFilter @filter="filter" @search="search" @clear="clear" class="filter"></ArchiveFilter>
    <p v-if="noArticles">No articles match these criteria.</p>
    <ArticleItem :user="user" v-for="article in sortedArticles" :key="article.id" :article="article"></ArticleItem>
  </div>
</template>

<script>
import ArticleItem from './ArticleItem';
import ArchiveFilter from './ArchiveFilter';
import {http} from '../../global';

export default {
  name: 'ArchiveList',
  components: {
    ArticleItem,
    ArchiveFilter
  },
  props: {
    user: Object
  },
  data() {
    return {
      articles: [],
      sortedArticles: [],
      noArticles: false
    }
  },
  methods: {
    loadArticles() {
      const self = this;
      const url = http + '/articles';
      this.axios.get(url)
      .then((response) => {
        const articles = response.data.articles;
        if (articles) {
          self.articles = response.data.articles.filter((article) => {
            return this.user || article.public;
          });
        }
      });
    },

    filter(args) {
      const self = this;
      const url = http + "/filter";
      this.axios.post(url, args)
      .then((response) => {
        const articles = response.data.articles;
        if (articles) {
          self.articles = response.data.articles.filter((article) => {
            return this.user || article.public;
          });
        }
      })
      .catch((error) => {
        console.log("Server error: " + error);
      })
    },

    search(query) {
      const self = this;
      const url = http + "/search";
      this.axios.post(url, {query: query})
      .then((response) => {
        const articles = response.data.articles;
        if (articles) {
          self.articles = response.data.articles.filter((article) => {
            return this.user || article.public;
          });
        }
      })
      .catch((error) => {
        console.log("Server error: " + error);
      })
    },

    clear() {
      this.loadArticles();
    }
  },
  watch: {
    articles: function(val) {
      if (val.length == 0) {
        this.noArticles = true;
      } else {
        this.noArticles = false;
      }

      let arts = val;
      this.sortedArticles = arts;
    }
  }
}
</script>

<style scoped>
.archive-list {
  margin: 30px 0 30px 0;
}

.filter {
  margin: 10px 0 20px 0;
}
</style>