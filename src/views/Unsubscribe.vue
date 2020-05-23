<template>
  <div>
    <h1>Unsubscribe</h1>
    <p v-if="msg">{{ msg }}</p>
  </div>
</template>

<script>
import {http} from '../../global';

export default {
  metaInfo: {
    title: 'Unsubscribe'
  },
  name: 'Unsubscribe',
  data() {
    return {
      msg: null, 
    }
  },
  props: {
    email: String
  },
  created() {
    let self = this;
    const url = http + "/unsubscribe/" + this.email;
    this.axios.post(url)
    .then((response) => {
      if (response.status === 200) {
        self.msg = `Unsubscribed ${self.email}. We're sorry to see you go.`;
      } else {
        self.msg = "An error occurred when attempting to unsubscribe. Please make sure that you've accessed this page by clicking on the Unsubscribe link in an email. If you have, and continue to receive unwanted emails, please contact site admins.";
      }
    })
    .catch((error) => {
      self.msg = "An error occurred when attempting to unsubscribe. Please make sure that you've accessed this page by clicking on the Unsubscribe link in an email. If you have, and continue to receive unwanted emails, please contact site admins.";
    })
  }
}
</script>