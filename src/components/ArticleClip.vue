<template>
  <div :class="cl" @click="go(article)">
    <img :src="article.image" />
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
    article: Object,
    cl: String
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

.first img {
  width: 100%;
  height: 30em;
  object-fit: cover;
  margin-bottom: 1em;
}

.rest img {
  width: 100%;
  height: 15em;
  object-fit: cover;
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

.first .title {
  font-size: 36px;
}

.brief {
  margin-top: 10px;
  font-size: 16px;
}

.first .brief {
  font-size: 18px;
}

@media only screen and (max-width: 800px) {
  .title {
    font-size: 24px;
    margin-top: 6px;
  }

  .brief {
    font-size: 15px;
    margin-top: 6px;
  }
}
</style>