<template>
  <div class="header_wrapper">
    <div class="logo">
      <img src="./logo.png" height="36" width="128" alt="logo">
      <span class="text">场景库</span>
    </div>
    <div class="address">
      <v-city @changeCity="changeCity" ref="city"></v-city>
    </div>
    <div class="search">
      <v-search-scenes></v-search-scenes>
    </div>
    <div class="login">
      <span>登录</span>
    </div>
  </div>
</template>

<script>
  import SearchCity from './search_city/search-city.vue'
  import SearchScenes from './search_scenes/search_scenes.vue'

  export default {
    data () {
      return {
        query: ''
      }
    },
    methods: {
      foucs () {
        console.log('focus')
      },
      blur () {
        console.log('blur')
      },
      changeCity (city) {
        this.$emit('changeCity', city)
      }
    },
    watch: {
      query () {
        console.log(this.query)
      }
    },
    mounted () {
      // this.selectedCity(city)
    },
    components: {
      'v-city': SearchCity,
      'v-search-scenes': SearchScenes
    }
  }
</script>

<style lang="sass" scoped="" type="text/css">
@import "~common/styles/variable.sass";

.header_wrapper
  height: 64px
  line-height: 64px
  width: 100%
  min-width: 1280px
  vertical-align:middle
  background-color: #FFF
  .logo
    display: inline-block
    margin-left: 30px
    position: relative
    top: 4px
    img
      position: relative
      top: 10px
      padding: 0 10px
    .text
      padding: 0 10px
      height: 36px
      line-height: 36px
      font-size: 26px
      border-left: 1px solid #ccc
      color: $color-text-d
  .address
    display: inline-block
    margin-left: 140px
    width: 100px
    font-size: 18px
    color: $color-text-dd
    font-family: $font-family-medium
  .search
    display: inline-block
    margin-left: 56px
    input
      height: 36px
      width: 440px
      border: 1px solid #CCCCCC
      border-radius: 5px
  .login
      display: inline-block
      margin-left: 33%


</style>
