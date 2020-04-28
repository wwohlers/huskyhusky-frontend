<template>
  <div id="app">
    <div id="wrapper">
      <Nav @auth="auth" :user="user"></Nav>
      <router-view class="main" @auth="auth" :user="user" :loadingAuth="loadingAuth"/>
    </div>
    <Footer :user="user"></Footer>
  </div>
</template>

<script>
import Nav from './components/Nav';
import Footer from './components/Footer';
import {http} from '../global';

export default {
  components: {
    Nav,
    Footer
  },
  metaInfo: {
    titleTemplate: '%s | Husky Husky',
    meta: [
      { charset: 'utf-8' },
      { name: 'description', content: 'A Northeastern student-run satire magazine which pokes fun at school administration, students, and the greater Boston area.' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  },
  data() {
    return {
      user: null,
      loadingAuth: true
    }
  },
  methods: {
    auth() {
      this.loadingAuth = true;
      const self = this;

      const token = this.$cookie.get('token');
      const id = this.$cookie.get('id');

      if (token && id) {
        const url = http + '/users/me';
        const options = {headers: {
          'Authorization': 'Bearer ' + token
        }};
        this.axios.get(url, options)
        .then((response) => {
          const user = response.data.user;
          if (user && user._id.toString() == id.toString()) {
            self.user = user;
            self.loadingAuth = false;
            self.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
          } else {
            self.user = null;
            self.loadingAuth = false;
          }
        })
        .catch((error) => {
          self.user = null;
          self.loadingAuth = false;
          console.log("Authentication error: " + error);
        })
      } else {
        this.user = null;
        this.loadingAuth = false;
      }
    }
  },
  mounted() {
    this.auth();
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400;1,700&family=Raleway:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');

html, body {
  margin: 0;
}

#app {
  font-family: 'Lora';
  height: 100%;
  position: relative;
}

#wrapper {
  min-height: 100vh; /* will cover the 100% of viewport */
  overflow: hidden;
  display: block;
  position: relative;
  padding-bottom: 20em; /* height of footer */
}

#about, #fof {
  text-align: center;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.main {
  width: 70%;
  margin: 30px auto 30px;
}

h1 {
  text-align: center;
  font-family: 'Raleway';
  font-size: 48px;
  font-weight: 300;
  text-transform: uppercase;
  margin-bottom: 40px;
}

ul {
  list-style: none;
}

/*router-link*/
a, .a {
  color: black;
}

/***** FORMS, INPUTS, BUTTONS *******/
form {
  width: 60%;
  margin: auto;
}

.form-item {
  width: 100%;
  margin: 20px 0 20px 0;
  display: inline-block;
}

.center {
  text-align: center;
}

.center > .form-item {
  text-align: center;
}

.center > .form-item > input,textarea {
  margin: auto;
}

.form-item label {
  cursor: pointer;
  display: block;
  margin-bottom: 5px;
}

.form-item input,textarea {
  display: block;
}

input[type="text"],input[type="password"],textarea {
  font-size: 16px;
  padding: 10px;
  border: 1px solid #CCCCCC;
  width: 250px;
  font-family: 'Raleway';
}

select {
  font-size: 16px;
  padding: 10px;
  border: 1px solid #CCCCCC;
  font-family: 'Raleway';
}

button {
  background: #EEEEEE;
  border: 1px solid #9c2828;
  font-size: 16px;
  padding: 12px 18px 12px 18px;
  border-radius: 4px;
  cursor: pointer;
  color: #9c2828;
  text-transform: uppercase;
  font-family: 'Raleway';
}

.small {
  font-size: 14px;
  padding: 6px 9px 6px 9px;
}

@media only screen and (max-width: 600px) {
  #wrapper {
    padding-bottom: 40em;
  }

  .main {
    width: 80%;
  }

  h1 {
    margin-bottom: 0;
  }

  form {
    width: 90%;
  }
}
</style>
