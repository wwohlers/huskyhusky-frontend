<template>
  <div class="comments-wrapper">
    <h2>Comments ({{ comments.length }})</h2>
    <div class="comments">
      <div class="comment" v-for="comment of getComments" :key="comment._id">
        <p class="comment-name">
          {{ comment.name }} &bull; {{ formatDate(comment.date) }}
        </p>
        <p class="comment-content">{{ sanitize(comment.content) }}</p>
        <img class="icon" v-if="user" @click="del(comment._id)" src="../assets/trash.svg" />
      </div>
      <button v-if="comments.length > 5" @click="more = !more">
        <span v-if="!more">See {{ comments.length - 5 }} More</span>
        <span v-else>See Less</span>
      </button>
      <div class="comment create-comment" v-if="showNewComment">
        <h2>Leave a Comment</h2>
        <label class="label" for="name">Name</label>
        <input type="text" id="name" v-model="name" maxlength="20" />
        <label class="label" for="content">Content</label>
        <textarea v-model="content" id="content" rows="3" maxlength="1000"/>
        <p class="error" v-if="error">{{ error }}</p>
        <button @click="submit">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
let sanitizeHtml = require('sanitize-html');
import { http } from '../../global';

export default {
  name: 'Comments',
  props: {
    article: Object,
    user: Object
  },
  data() { 
    return {
      comments: [],
      name: '',
      content: '',
      error: '',
      more: false,
      showNewComment: true,
      loading: false,
    }
  },
  created() {
    this.comments = this.article.comments.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
  },
  methods: {
    submit() {
      this.loading = true;
      if (this.name.length < 3) {
        this.error = "Your name must be at least 3 characters";
        this.loading = false;
        return;
      } else if (!this.content || this.content.length === 0) {
        this.error = "Your comment must have content";
        this.loading = false;
        return;
      }
      const body = {
        name: this.name,
        content: this.content
      }
      const url = `${http}/articles/${this.article._id}/comment`;
      const self = this;
      this.axios.post(url, body)
      .then(response => {
        if (response.status === 201) {
          self.comments.unshift(response.data.comment);
          self.showNewComment = false;
        } else {
          console.log(response.data);
          self.error = "An error occurred submitting your comment";
        }
        self.loading = false;
      })
      .catch(error => {
        console.log(error);
        self.error = "An error occurred submitting your comment";
        self.loading = false;
      })
    },

    formatDate(date) {
      return this.moment(date).fromNow();
    },

    sanitize(raw) {
      return sanitizeHtml(raw, {
        allowedTags: []
      });
    },

    del(commentId) {
      const url = `${http}/articles/${this.article._id}/comments/${commentId}`;
      const self = this;
      this.axios.delete(url)
        .then(response => {
          if (response.status === 201) {
            self.comments = self.comments.filter(comment => comment._id !== commentId);
          } else {
            console.log(response);
          }
        })
        .catch(error => {
          console.log(error);
        })
    }
  },
  computed: {
    getComments() {
      return this.more ? this.comments : this.comments.slice(0, 5);
    }
  }
}
</script>

<style scoped>
.comments-wrapper {
  margin-top: 2em;
  border-top: 1px solid lightgray;
  padding-top: 2em;
}

h2 {
  font-weight: 400;
}

.comments {
  display: flex;
  flex-direction: column;
}

.comment {
  padding: 2em;
  margin: 1em 0 1em 0;
  border-radius: 4px;
  box-shadow: 0 0 12px #E8E8E8;
  position: relative;
}

.create-comment {
  margin-bottom: 4em;
}

.comment > .icon {
  width: 1em;
  filter: invert(11%) sepia(64%) saturate(4196%) hue-rotate(351deg) brightness(113%) contrast(80%);
  position: absolute;
  top: 1em;
  right: 1em;
  cursor: pointer;
}

.comment-name {
  margin-top: 0;
  font-size: 14px;
  color: #555;
}

.comment-content {
  margin-bottom: 0;
  word-wrap: break-word;
}

.label {
  display: block;
  margin: 2em 0 0.5em 0;
  text-transform: uppercase;
  font-family: 'Raleway';
  font-size: 13px;
  cursor: pointer;
}

.label:first-child {
  margin-top: 0;
}

textarea {
  margin: 0 0 1em 0;
  width: 40%;
  min-width: 400px;
}

@media only screen and (max-width: 1024px) {
  textarea {
    width: 100%;
    box-sizing: border-box;
    min-width: 0;
  }
}
</style>