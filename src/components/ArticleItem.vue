<template>
  <div class="article-item">
    <div class="item-child">
      <img @click="go" :src="article.image" />
    </div>
    <div class="item-child" @click="go">
      <span class="title">{{ article.title }}</span>
      <p class="details">{{ date }} &bullet; {{ article.category }}</p>
      <p class="brief">{{ article.brief }}</p>
    </div>
    <div class="item-child" v-if="editRights">
      <button @click="write">Edit</button>
      <span v-if="suggestPublication">Publication requested</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: Object,
    user: Object
  },
  computed: {
    articleLink() {
      return "/article/" + this.article.name;
    },

    editRights() {
      // returns true if admin or if author
      if (!this.user) return false;
      if (this.user.admin) {
        return true;
      }
      else if (this.user._id.toString() == this.article.author.toString()) {
        return true;
      }
      return false;
    },

    writeLink() {
      return "/write/" + this.article._id;
    },

    date() {
      return this.moment(this.article.created_at).format('dddd, MMMM Do');
    },

    suggestPublication() {
      return this.article.requested && !this.article.public;
    },

    date() {
      return this.moment(this.article.created_at).fromNow();
    }
  },
  methods: {
    go() {
      this.$router.push({name: 'article', params: { name: this.article.name }});
    },

    write() {
      this.$router.push({name: 'write', params: { id: this.article._id }});
    }
  }
}
</script>

<style scoped>
img {
  width: 80%;
  display: block;
  margin: auto;
}

.article-item {
  display: grid;
  grid-template-columns: 2fr 6fr 1fr;
  gap: 20px;
  margin: 30px 0 30px 0;
  padding: 40px 0 40px 0;
  background: #f9f9f9;
  border-radius: 2px;
}

.title {
  font-size: 24px;
}

.details {
  color: #444444;
  font-size: 14px;
}

.brief {
  font-size: 16px;
}

.item-child {
  cursor: pointer;
}

@media only screen and (max-width: 600px) {
  img {
    width: 100%;
  }

  .article-item {
    grid-template-columns: 1fr;
  }
}
</style>