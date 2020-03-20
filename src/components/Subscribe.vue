<template>
  <div>
    <p>Stay Updated</p>
    <input type="text" placeholder="Email" id="subscribe" v-model="email"/>
    <br><br>
    <button type="submit" @click="subscribe">Subscribe</button>
  </div>
</template>

<script>
import {http} from '../../global';

export default {
  name: 'Subscribe',
  data() {
    return {
      email: ''
    }
  },
  methods: {
    subscribe() {

    }
  }
}
</script>

<style scoped>
p {
  font-size: 20px;
  font-family: 'Raleway';
  text-transform: uppercase;
}

#subscribe {
  width: 150px;
  font-size: 16px;
}
</style>