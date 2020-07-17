<template>
  <div v-if="user">
    <h1>Edit Article</h1>
    <link href="https://cdn.quilljs.com/1.2.6/quill.snow.css" rel="stylesheet">
    <form @submit.prevent class="center">
      <span class="error" v-if="errorMessage">{{ errorMessage }}</span> <br />
      <div class="form-item">
        <label for="name">Name</label>
        thehuskyhusky.com/article/<input type="text" style="display: inline-block" class="long" id="name" v-model="name" />
      </div>
      <div class="form-item">
        <label for="title">Title</label>
        <input type="text" id="title" class="long" v-model="title" @input="generateName"/> 
      </div>
      <div class="form-item">
        <label for="tags">Tags</label>
        <autocomplete
          id="tags"
          :source="tagsWithoutActive"
          @selected="addTag"
          @nothingSelected="createTag">
        </autocomplete>
        <div class="tags">
          <div class="tag" v-for="tag of tags" :key="tag" @click="removeTag(tag)">
            {{ tag }}
          </div>
        </div>
      </div>
      <div class="form-item">
        <label for="brief">Brief</label>
        <input type="text" id="brief" class="long" v-model="brief" />
      </div>
      <div class="form-item">
        <label for="image">Image</label>
        <input type="text" id="image" class="long" v-model="image" />
      </div>
      <div class="form-item">
        <label for="attr">Image Attribute</label>
        <input type="text" id="attr" v-model="attr" />
      </div>
      <div class="form-item">
        <!--<p>
          <span style="color: red">The old link formatting has been deprecated in favor of HTML markup.</span>
          Click <a href="http://www.simplehtmlguide.com/cheatsheet.php">here</a> for a reference on HTML (all safe tags are allowed).
          The old formatting will still work for the sake of backwards compatibility.
        </p>-->
        <p>
          %%% [link url] ||| [text] ###
        </p>
        <quill v-model="content" output="html"></quill>
      </div>
      <div class="form-item">
        <span v-if="isPublic">Public. <button @click="togglePublic">Unpublish</button></span>
        <span v-else>Not public.
          <span v-if="requested">
            Publication has been requested.
            <button v-if="user.admin" @click="togglePublic">Publish</button>
            <button v-else @click="toggleRequested">Rescind Publication Request</button>
          </span>
          <span v-else>
            Publication has NOT been requested.
            <button v-if="user.admin" @click="togglePublic">Publish Anyway</button>
            <button v-else @click="toggleRequested">Request Publication</button>
          </span>
        </span>
      </div>
      <div class="form-item">
        <p>Note: all changes, including changes to publicity, do not take effect until you click "Save".</p>
        <span class="error" v-if="errorMessage">{{ errorMessage }}</span> <br />
        <button @click="save">Save</button>
      </div>
    </form>
  </div>
</template>

<script>
import ArchiveList from '../components/ArchiveList';
import Autocomplete from 'vuejs-auto-complete';
import {http} from '../../global';

export default {
  metaInfo: {
    title: 'Write'
  },
  components: {
    Autocomplete,
  },
  name: 'Write',
  props: {
    user: Object,
    loadingAuth: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      name: '',
      title: '',
      brief: '',
      category: '',
      image: '',
      attr: '',
      content: 'Start writing here...',
      isPublic: false,
      requested: false,
      errorMessage: '',
      viewCategories: false,
      tags: [],
      tagList: []
    }
  },
  methods: {
    load() {
      if (this.user) {
        const self = this;
        const id = this.$route.params.id;
        const url = http + '/articlebyid/' + id;
        this.axios.get(url)
        .then((response) => {
          const article = response.data.article;
          if (article) {
            self.name = article.name;
            self.title = article.title;
            self.brief = article.brief;
            self.tags = article.tags;
            self.image = article.image;
            self.attr = article.attr;
            self.isPublic = article.public;
            self.requested = article.requested;
            self.setInnerHtml(article.text);
            self.getTags();
          } else {
            self.$router.push({name: 'archive'});
          }
        })
        .catch((error) => {
          console.log(error);
          self.$router.push({name: 'archive'});
        })
      } else {
        this.$router.push({name: 'signIn'});
      }
    },

    getTags() {
      const self = this;
      this.axios.get(`${http}/tags`)
      .then((response) => {
        if (response.data.tags) {
          self.tagList = response.data.tags.map(tag => {
            return { name: tag }
          });
        }
      })
      .catch((error) => {
        console.log(error);
      })
    },

    addTag(tag) {
      if (!this.tags.includes(tag.display)) this.tags.push(tag.display);
    },

    createTag($event) {
      if (!this.tags.includes($event)) this.tags.push($event);
    },

    removeTag(tag) {
      this.tags = this.tags.filter(t => t !== tag);
    },

    save() {
      if (this.validate()) {
        const url = http + "/articles/" + this.$route.params.id;
        const body = {
          name: this.name,
          title: this.title,
          brief: this.brief,
          tags: this.tags,
          image: this.image,
          attr: this.attr,
          text: this.content,
          public: this.isPublic,
          requested: this.requested
        }
        this.axios.put(url, body)
        .then((response) => {
          if (response.data.article) {
            this.$router.push({name: 'archive'});
          } else {
            console.log("Failed");
          }
        })
        .catch((error) => {
          console.log("Failed with error: " + error);
        })
      }
    },

    toggleCategories() {
      this.viewCategories = !this.viewCategories;
    },

    setInnerHtml(html) {
      var editor = document.getElementsByClassName('ql-editor');
      editor[0].innerHTML = html
    },

    generateName() {
      this.name = this.title.trim().replace(/\s+/g, '-').toLowerCase();
    },

    togglePublic() {
      this.isPublic = !this.isPublic;
    },

    toggleRequested() {
      this.requested = !this.requested;
    },

    validate() {
      const self = this;

      if (this.tags.length === 0) {
        this.errorMessage = "Must have at least one tag";
        return false;
      }

      // Validate name, check characters and uniqueness
      const valid = ['a','b','c','d','e','f','g','h','i','j','k','l',
      'm','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1',
      '2','3','4','5','6','7','8','9','-','!','#','$','%','&','*','(',
      ')','+','='];
      const name = this.name.split("");
      if (name.length >= 100) {
        this.errorMessage = "Name cannot be more than 100 characters";
        return false;
      }
      for (var i = 0; i < name.length; i++) {
        if (!valid.includes(name[i])) {
          this.errorMessage = "Name contains invalid characters";
          return false;
        }
      }
      const url = http + "/articles/" + this.name;
      this.axios.get(url)
      .then((response) => {
        if (response.data.article) {
          this.errorMessage = "Name is not unique";
          return false;
        }
      })
      .catch((error) => {
      })

      return true;
    }
  },
  computed: {
    showCategoryText() {
      if (this.viewCategories) {
        return "Hide Categories";
      } else {
        return "Show Categories";
      }
    },

    tagsWithoutActive() {
      return this.tagList.filter(tag => {
        return !this.tags.includes(tag.name);
      })
    }
  },
  mounted() {
    if (!this.loadingAuth) {
      this.load();
    }
  },
  watch: {
    loadingAuth: function(newVal) {
      if (!newVal) {
        this.load();
      }
    }
  }
}
</script>