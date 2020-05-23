<template>
  <div @click="go(article)">
    <img class="thumbnail" :src="article.image" />
    <p class="title">{{ article.title }}</p>
    <p class="details">{{ date }} &bullet; {{ article.category }}</p>
    <p class="brief">{{ article.brief }}</p>
  </div>
</template>

<script>
import Moment from 'moment';

export default {
  name: 'ArticleClip',
  props: {
    article: Object
  },
  methods: {
    go(article) {
      const artName = article.name;
      this.$router.push({ name: 'article', params: { name: artName }});
    }
  },
  computed: {
    date() {
      return this.moment(this.article.created_at).fromNow();
    }
  }
}
</script>

<style scoped>
div {
  cursor: pointer;
}

img {
  width: 100%;
}

.title {
  font-size: 28px;
  margin-top: 10px;
  margin-bottom: 0;
  text-transform: uppercase;
}

.details {
  color: #444444;
  font-size: 14px;
}

.brief {
  margin-top: 10px;
  font-size: 18px;
}
</style>