<template>
  <div class="archive-list">
    <ArchiveFilter @filter="filter" @search="search" @category="category" @clear="clear" class="filter"></ArchiveFilter>
    <ArticleItem :user="user" v-for="article in getPage" :key="article.id" :article="article"></ArticleItem>
    <div class="page">
      <button @click="prev">Prev</button>
      &nbsp;
      Page <strong>{{ page + 1 }}</strong> of <strong>{{ maxPages + 1 }}</strong>
      &nbsp;
      <button @click="next">Next</button>
    </div>
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
      page: 0,
    }
  },
  mounted() {
    this.loadArticles();
  },
  computed: {
    getPage() {
      let min = 10 * this.page;
      let max = 10 * (this.page + 1);
      if (max >= this.articles.length) {
        max = this.articles.length - 1;
      }
      return this.articles.slice(min, max);      
    },

    maxPages() {
      return Math.floor(this.articles.length / 10);
    },
  },
  methods: {
    loadArticles() {
      this.page = 0;
      const self = this;
      const url = http + '/articles';
      console.log(url);
      this.axios.get(url)
      .then((response) => {
        self.articles = response.data.articles;
      })
    },

    filter(args) {
      this.page = 0;
      const self = this;
      const url = http + "/filter";
      this.axios.post(url, args)
      .then((response) => {
        const articles = response.data.articles;
        if (articles) {
          self.articles = articles;
        }
      })
      .catch((error) => {
        console.log("Server error: " + error);
      })
    },

    category(cat) {
      this.page = 0;
      const self = this;
      const url = http + "/category";
      this.axios.post(url, { category: cat })
      .then((response) => {
        const articles = response.data.articles;
        if (articles) {
          self.articles = articles;
        }
      })
      .catch((error) => {
        console.log("Server error: " + error);
      })
    },

    search(query) {
      this.page = 0;
      const self = this;
      const url = http + "/search";
      this.axios.post(url, {query: query})
      .then((response) => {
        const articles = response.data.articles;
        if (articles) {
          self.articles = articles;
        }
      })
      .catch((error) => {
        console.log("Server error: " + error);
      })
    },

    prev() {
      if (this.page != 0) {
        this.page--;
      }
    },

    next() {
      if (this.page < this.maxPages) {
        this.page++;
      }
    },

    clear() {
      this.loadArticles();
    }
  }
}
</script>

<style scoped>
.archive-list {
  margin: 0 0 30px 0;
}

.filter {
  margin: 10px 0 20px 0;
}

.page {
  text-align: center;
}
</style>