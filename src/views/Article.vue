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
          <p class="article-sub">{{ date }} &bullet; By {{ authorName }}</p>
          <img :src="article.image" />
          <br>
          <p><i>{{ article.brief }}</i></p>
          <br>
          <div class="article-content" v-html="article.text"></div>
        </div>
        <div class="sidebar" v-if="article">
          <Subscribe></Subscribe>
          <br/><hr/>
          <div class="share">
            <p class="title">Share</p>
            <Share :url="articleUrl"></Share>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Subscribe from '../components/Subscribe';
import Axios from 'axios';
import Share from '../components/Share';
import {http} from '../../global';

export default {
  metaInfo: {
    title: 'Article'
  },
  data() {
    return {
      article: null,
      notFound: false,
      authorName: ''
    }
  },
  components: {
    Subscribe,
    Share
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
  beforeRouteEnter (to, from, next) {
    console.log("yes");
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
    console.log("yes");
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
        this.$title = article.title;

        this.$ga.page({
          page: `/${article.name}`,
          title: article.title,
          location: window.location.href
        });
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

.article img {
  width: 100%;
  object-fit: cover;
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

@media only screen and (max-width: 600px) {
  .article-container {
    grid-template-columns: 1fr;
    grid-row-gap: 1em;
  }

  .article-title {
    font-size: 36px;
  }

  p {
    font-size: 15px;
  }
}
</style>