<template>
  <div>
    <div v-if="notFound">
      <h1>Not found</h1>
      <p class="center">
        We looked everywhere, but we couldn't find that article.
        View our <router-link to="/archive">archive</router-link> to see our published articles.
        </p>
    </div>
    <div v-if="article">
      <div class="article-container">
        <div class="article">
          <p class="article-title">{{ article.title }}</p>
          <p>{{ date }} 
            <span v-for="tag of article.tags" :key="tag">&bullet; {{ tag }}</span> 
            &bullet; By <router-link :to="{ name: 'author', params: { id: article.author } }">{{ authorName }}</router-link></p>
          <img :src="article.image" />
          <br>
          <br>
          <p class="attr"><i>{{ article.attr }}</i></p>
          <br><br>
          <div class="article-content" v-html="article.text"></div>
        </div>
        <div class="sidebar" v-if="article">
          <div class="share">
            <p class="title">Share</p>
            <Share :url="articleUrl"></Share>
          </div>
        </div>
      </div>
      <Comments :article="article" :user="user"></Comments>
    </div>
  </div>
</template>

<script>
let sanitizeHtml = require('sanitize-html');
import Subscribe from '../components/Subscribe';
import Axios from 'axios';
import Share from '../components/Share';
import Comments from '../components/Comments';
import {http} from '../../global';

export default {
  data() {
    return {
      article: null,
      notFound: false,
      authorName: ''
    }
  },
  props: {
    user: Object,
    name: String,
    loadingAuth: Boolean
  },
  components: {
    Subscribe,
    Share,
    Comments
  },
  metaInfo() {
    const article = this.article;
    return {
      titleTemplate: chunk => article.title || ""
    }
  },
  computed: {
    date() {
      if (this.article) {
        return this.moment(this.article.created_at).format('dddd, MMMM Do, YYYY');
      }
      return "";
    },
    articleUrl() {
      return "http://thehuskyhusky.com/article/" + this.article.name;
    }
  },
  methods: {
    load() {
      const self = this;
      const name = this.name;
      const url = http + "/articles/" + name;
      Axios.get(url)
      .then((response) => {
        if (response.status == 500) {
          self.fail();
        } else {
          let article = response.data.article;
          self.notFound = false;
          article.text = self.sanitize(article.text);
          self.article = article;
          self.getAuthorName();

          self.$ga.page({
            page: `/${article.name}`,
            title: article.title,
            location: window.location.href
          });
        }
      })
      .catch((error) => {
        self.fail();
        console.log(error);
      })
    },

    fail() {
      this.notFound = true;
    },

    sanitize(dirty) {
      let clean = sanitizeHtml(dirty);
      return clean;
    },

    getAuthorName() {
      if (this.article) {
        let self = this;
        const author = this.article.author;
        const url = http + "/users/" + author;
        this.axios.get(url)
        .then((response) => {
          if (response.data.name) {
            self.authorName = response.data.name;
          } else {
            console.log("Error", response);
          }
        })
        .catch((error) => {
          console.log("Error", response);
        })
      }
    }
  },
  created() {
    if (!this.loadingAuth) {
      this.load();
    }
  },
  watch: {
    loadingAuth: function(val) {
      if (val === false) {
        this.load();
      }
    }
  }
}
</script>

<style scoped>
* {
  font-family: 'Open Sans';
}

.article-container {
  margin: 0 0 30px 0;
  display: flex;
}

.article {
  margin-right: 5%;
}

.article-title {
  font-family: "Open Sans";
  font-size: 48px;
  margin: 0 0 20px 0;
  cursor: pointer;
}

.article-sub {
  font-size: 18px;
  color: #333333;
}

.article-content {
  font-size: 18px;
  line-height: 1.6;
}

p {
  font-size: 20px;
}

.attr {
  margin: 0;
  font-size: 14px;
  color: #444444;
}

.article img {
  width: 100%;
  object-fit: cover;
}

.sidebar {
  width: 20%;
  padding: 2em;
  box-shadow: 0 0 8px #DDD;
  height: fit-content;
}

.share > .title {
  margin-top: 0;
  text-align: center;
}

.subscribe {
  width: initial;
}

.subscribe input {
  width: auto;
}

.title {
  font-size: 20px;
  font-family: 'Raleway';
  text-transform: uppercase;
}

@media only screen and (max-width: 800px) {
  .article-container {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    box-sizing: border-box;
  }

  .article-title {
    font-size: 36px;
  }

  p {
    font-size: 15px;
  }
}
</style>