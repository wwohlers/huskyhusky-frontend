<template>
  <div @click="go(article)">
    <img class="thumbnail" :src="article.image" />
    <p class="title">{{ article.title }}</p>
    <p class="brief">{{ article.brief }}</p>
  </div>
</template>

<script>
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

.brief {
  margin-top: 10px;
  font-size: 18px;
}
</style>