<template>
  <div>
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
export default {
  name: 'ArchiveFilter',
  data() {
    return {
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      years: [],
      selectedYear: 2020,
      selectedMonth: 0,
      query: '',
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
      console.log("Emitted filter", args);
    },

    search() {
      const query = this.query;
      this.$emit('search', query);
      console.log("Emitted search", query);
    },

    clear() {
      this.$emit('clear');
      this.query = '';
      const date = new Date();
      const current = date.getFullYear();
      this.selectedYear = current;
      this.selectedMonth = date.getMonth();
    }
  }
}
</script>

<style scoped>
span {
  font-family: 'Raleway';
}
</style>