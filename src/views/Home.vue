<template>
  <div>
    <div class="articles" v-if="articles">
      <ArticleClip cl="first" class="article-clip" :article="firstArticle"></ArticleClip>
      <ArticleClip cl="rest" class="article-clip" v-for="article in restArticles" :key="article.id" :article="article"></ArticleClip>
      <Subscribe class="sub"></Subscribe>
    </div>
  </div>
</template>

<script>
import ArticleClip from '../components/ArticleClip'
import Subscribe from '../components/Subscribe';
import {http} from '../../global';

export default {
  metaInfo: {
    title: 'Home'
  },
  name: 'Home',
  components: {
    ArticleClip,
    Subscribe
  },
  data() {
    return {
      articles: [],
      firstArticle: {},
      restArticles: [],
    }
  },
  mounted() {
    const self = this;
    const url = http + '/top';
    this.axios.get(url)
    .then((response) => {
      let articles = response.data.articles;
      self.articles = articles;
      self.firstArticle = articles[0];
      articles.shift();
      self.restArticles = articles;
    })

    this.$ga.page({
      page: '/',
      title: 'Home',
      location: window.location.href
    });
  }
}
</script>

<style scoped>
.articles {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 4em;
}

.articles :first-child {
  grid-column: 1 / 3;
  grid-row: 1 / 3;
}

.sub {
  grid-column: 3 / 4;
  grid-row: 2 / 3;
}

@media only screen and (max-width: 800px) {
  .articles {
    display: flex;
    flex-direction: column;
  }

  .articles :first-child {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
  }

  .article-clip {
    margin: 1em 0 1em 0;
  }
}
</style>