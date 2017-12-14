<!--
    **author:gyx
    **msg:Be happy! Guy!
 -->

<template>
  <div class="city_list" v-show="showFlag">
    <ul ref='ul_tag'>
      <p @mouseover="ms">城市名称</p>
      <li v-for="city in cities" @mouseover="ms">{{city}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        showFlag: true
      }
    },
    props: {
      cities: {
        type: Array,
        default: () => {
          return ['北京', '上海', '重庆']
        }
      }
    },
    methods: {
      ms (e) {
        // console.log(e.target)
      }
    },
    mounted () {
      this.$refs.ul_tag.addEventListener('mouseover', (e) => {
        e.target.style.backgroundColor = 'blue'
      })
      this.$refs.ul_tag.addEventListener('mouseout', (e) => {
        e.target.style.backgroundColor = 'transparent'
      })
    }
  }
</script>

<style lang="sass" scoped="" type="text/css">
  .city_list
    position: absolute
    margin-top: 10px
    width: 250px
    height: 180px
    line-height: 44px
    font-size: 16px
    background-color: #ff0
    p
      padding-left: 18px
    li
      padding-left: 18px
</style>
