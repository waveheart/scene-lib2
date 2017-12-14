<!--
    **author:gyx
    **msg:Be happy! Guy!
 -->

<template>
  <div>
    <p>共321个场景点</p>
    <div class="imgs">
      <img v-for="item of result" alt="图片" :src="item.img" @click="GoToSceneDetail(item.id)"></img>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {

      }
    },
    props: {
      result: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    watch: {
      result () {
        // console.log(this.result)
      }
    },
    methods: {
      GoToSceneDetail (id) {
        this.$router.push({
          name: 'detail',
          params: {
            id: id
          }
        })
      }
    }
  }
</script>

<style lang="sass" scoped="" type="text/css">
  img
    width: 290px
    height: 162px
    margin-right: 18px
</style>
