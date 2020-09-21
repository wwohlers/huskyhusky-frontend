<template>
    <a v-if="article" class="article-item" style="text-decoration:none" :href="articleLink">
        <div class="item-child">
          <img :src="article.image" />
        </div>
        <div class="item-child">
          <span class="title">{{ article.title }}</span>
          <p class="details">{{ date }} &bullet; {{ article.tags[0] || 'Satire' }}</p>
          <p class="brief">{{ article.brief }}</p>
        </div>
        <div class="item-child" v-if="editRights">
          <button @click="write">Edit</button>
          <button @click="del">Delete</button>
          <span v-if="suggestPublication">Publication requested</span>
        </div>
    </a>
</template>

<script>
import { http, front } from '../../global';

export default {
  name: 'ArticleItem',
  props: {
    article: Object,
    user: Object
  },
  computed: {
    articleLink() {
      return front + "/article/" + this.article.name;
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
    write() {
      this.$router.push({name: 'write', params: { id: this.article._id }});
    },

    del() {
      this.axios.delete(`${http}/articles/${this.article._id}`)
      .then(response => {
        if (response.status == 200) {
          this.$emit('deleted');
        }
      })
      .catch(error => {
        console.log(error);
        alert('Failed to delete article');
      })
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

@media only screen and (max-width: 800px) {
  img {
    width: 100%;
  }

  .article-item {
    grid-template-columns: 1fr;
  }
}
</style>
