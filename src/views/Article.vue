<template>
  <div>
    <div v-if="notFound">
      <p>Sorry, the article you were looking for can't be found.</p>
    </div>
    <div v-if="article">
      <div class="article-container">
        <div class="article">
      <p class="article-title">{{ article.title }}</p>
          <p>{{ date }} &bullet; {{ article.category }} &bullet; By <router-link :to="{ name: 'author', params: { id: article.author } }">{{ authorName }}</router-link></p>
          <img :src="article.image" />
          <br>
          <br>
          <p class="attr"><i>{{ article.attr }}</i></p>
          <br><br>
          <div class="article-content" v-html="article.text"></div>
        </div>
        <div class="sidebar" v-if="article">
          <Subscribe></Subscribe>
          <br/><hr/>
          <div class="share">
            <p class="title">Share</p>
            <div class="sharethis-inline-share-buttons"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Subscribe from '../components/Subscribe';
import Axios from 'axios';
import {http} from '../../global';

export default {
  name: 'Article',
  data() {
    return {
      article: null,
      notFound: false,
      authorName: ''
    }
  },
  components: {
    Subscribe
  },
  computed: {
    date() {
      if (this.article) {
        return this.moment(this.article.created_at).format('MMMM Do, YYYY, h:mm A');
      }
      return "";
    },
    articleUrl() {
      return "http://thehuskyhusky.com/article/" + this.article.name;
    }
  },
  beforeRouteEnter (to, from, next) {
    const name = to.params.name;
    const url = http + "/articles/" + name;
    Axios.get(url)
    .then((response) => {
      if (response.status == 500) {
        next(vm => vm.fail());
      } else {
        next(vm => vm.load(response.data.article));
      }
    })
    .catch((error) => {
      next(vm => vm.fail());
      console.log(error);
    })
  },
  beforeRouteUpdate (to, from, next) {
    const self = this;
    const name = to.params.name;
    const url = http + "/articles/" + name;
    this.axios.get(url)
    .then((response) => {
      if (response.status != 200) {
        self.fail();
      } else {
        self.load(response.data.article);
      }
    })
    next();
  },
  methods: {
    load(article) {
      this.notFound = false;
      if (this.safe(article.text)) {
        this.article = article;
      }
    },

    fail() {
      this.notFound = true;
    },

    safe(html) {
      // TODO
      // returns true only if the raw html is safe to insert
      return true;
    },

    getAuthorName() {
      if (this.article) {
        let self = this;
        const author = this.article.author;
        const url = http + "/users/" + author;
        this.axios.get(url)
        .then((response) => {
          console.log(response);
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
  mounted() {
    this.getAuthorName();

    let share = document.createElement('script');
    share.setAttribute('src', 'https://platform-api.sharethis.com/js/sharethis.js#property=5e72532377bcc200125bda8a&product=inline-share-buttons');
    document.head.appendChild(share);
  },
  watch: {
    article: function(val) {
      this.getAuthorName();
    }
  }
}
</script>

<style scoped>
.article-container {
  margin: 0 0 30px 0;
  display: grid;
  grid-template-columns: 4fr 1fr;
  grid-column-gap: 1em;
}

.article-title {
  font-family: "Lora";
  font-size: 48px;
  margin: 0 0 20px 0;
}

.article-content {
  font-size: 18px;
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
}

.sidebar {
  padding: 2em;
  background-color: #EEEEEE;
}

.title {
  font-size: 20px;
  font-family: 'Raleway';
  text-transform: uppercase;
}
</style>