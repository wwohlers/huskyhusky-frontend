<template>
  <div>
    <select v-model="cat" @change="category()">
      <option disabled value="">Select a category...</option>
      <option v-for="_cat in categories" :value="_cat" :key="_cat">{{ _cat }}</option>
    </select>
    <span> &mdash; OR &mdash; </span>
    <select v-model="selectedMonth" @change="filter()">
      <option disabled value="">Select one...</option>
      <option v-for="(month, index) in getMonths" :key="index" :value="index">{{ month }}</option>
    </select>
    <select v-model="selectedYear" @change="filter()">
      <option v-for="(year, index) in years" :key="index" :value="year">{{ year }}</option>
    </select>
    <span> &mdash; OR &mdash; </span>
    <input type="text" placeholder="Search titles, authors..." v-model="query" @keyup.enter="search"/>
    &nbsp;
    <button @click="clear">Clear</button>
  </div>
</template>

<script>
import {http} from '../../global';

export default {
  name: 'ArchiveFilter',
  data() {
    return {
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      years: [],
      selectedYear: 2020,
      selectedMonth: 0,
      query: '',
      categories: [],
      cat: '',
    }
  },
  mounted() {
    const start = 2019;
    const date = new Date();
    const current = date.getFullYear();
    this.selectedYear = current;
    this.selectedMonth = date.getMonth();
    for (var i = start; i <= current; i++) {
      this.years.push(i);
    }
    this.getCategories();
    this.filter();
  },
  computed: {
    getMonths() {
      const date = new Date();
      if (this.selectedYear == date.getFullYear()) {
        const month = date.getMonth();
        return this.months.slice(0, month + 1);
      } else {
        return this.months;
      }
    }
  },
  methods: {
    filter() {
      const args = {month: this.selectedMonth, year: this.selectedYear}
      this.$emit('filter', args);
    },

    search() {
      const query = this.query;
      this.$emit('search', query);
    },

    category() {
      const cat = this.cat;
      this.$emit('category', cat);
    },

    clear() {
      this.$emit('clear');
      this.query = '';
      const date = new Date();
      const current = date.getFullYear();
      this.selectedYear = current;
      this.selectedMonth = date.getMonth();
    },

    getCategories() {
      const self = this;
      this.axios.get(`${http}/categories`)
      .then((response) => {
        if (response.data.categories) {
          self.categories = response.data.categories;
        }
      })
      .catch((error) => {
        console.log(error);
      })
    },
  }
}
</script>

<style scoped>
span {
  font-family: 'Raleway';
}
</style>