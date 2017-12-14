<template>
  <div id="app" class="app">
    <v-header ref="vheader" @changeCity="changeCity"></v-header>
    <router-view :city="city"></router-view>
  </div>
</template>

<script>
import Header from './components/header/header.vue'

export default {
  data () {
    return {
      city: ''
    }
  },
  created () {
  },
  methods: {
    changeCity (city) {
      this.city = city
    }
  },
  components: {
    'v-header': Header
  }
}
</script>

<style lang="sass" type="text/css">
</style>
