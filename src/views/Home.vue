<template>
  <div>
    <h1>The Husky Husky</h1>
    <div class="articles" v-if="articles">
      <ArticleClip class="article-clip" v-for="article in articles" :key="article.id" :article="article"></ArticleClip>
    </div>
  </div>
</template>

<script>
import ArticleClip from '../components/ArticleClip'
import {http} from '../../global';

export default {
  metaInfo: {
    title: 'Home'
  },
  name: 'Home',
  components: {
    ArticleClip
  },
  data() {
    return {
      articles: [],
    }
  },
  mounted() {
    const self = this;
    const url = http + '/top';
    this.axios.get(url)
    .then((response) => {
      self.articles = response.data.articles;
    })
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

@media only screen and (max-width: 600px) {
  .articles {
    grid-template-columns: 1fr;
    grid-gap: 0;
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