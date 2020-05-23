<template>
  <div>
    <h1>Bulk Email</h1>
    <link href="https://cdn.quilljs.com/1.2.6/quill.snow.css" rel="stylesheet">
    <form @submit.prevent class="center">
      <p>Send an email to all subscribers. The email signature has been added for you. Do NOT modify the unsubscribe link.</p>
      <div class="form-item">
        <label for="subject">Subject</label>
        <input type="text" id="subject" v-model="subject"/>
      </div>
      <div class="form-item">
        <quill v-model="content" output="html"></quill>
      </div>
      <div class="form-item">
        <p style="color:red">Warning: this CANNOT be undone. This email will be sent to every subscriber.</p>
        <label for="master">Master Key</label>
        <input type="password" id="master" v-model="master" />
        <button @click="send">Send</button>
        <p v-if="response">{{ response }}</p>
      </div>
    </form>
  </div>
</template>

<script>
import {http, front} from '../../global';

export default {
  metaInfo: {
    title: 'Bulk Email'
  },
  name: 'Bulk',
  data() {
    return {
      subject: '',
      content: '',
      master: '',
      response: null
    }
  },
  created() {
    // generate signature
    this.content = `
    <br/><br/>
    <p>The Husky Husky Team</p>
    <p style="size:12px">
      You received this email because you are subscribed to <a href="https://thehuskyhusky.com">The Husky Husky</a>. 
      <a href="${front}/unsubscribe/{{email}}">Unsubscribe</a>
    </p>
    `;
  },
  methods: {
    send() {
      let self = this;
      const url = http + "/bulk";
      const body = {
        master: this.master,
        subject: this.subject,
        template: this.content
      };
      this.axios.post(url, body)
      .then((response) => {
        if (response.status === 200) {
          self.response = "Bulk email successful!";
        } else {
          self.response = "An error occurred. Please make sure the master key is correct. "
        }
      })
      .catch((error) => {
        self.response = "An unknown error occurred. Oops. Please refresh and try again.";
      })
    }
  }
}
</script>