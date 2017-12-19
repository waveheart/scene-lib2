<!--
    **author:gyx
    **msg:Be happy! Guy!
 -->

<template>
  <div class="img_list">
    <p>共 <span class="img_num">{{result.length}}</span> 个场景点</p>
    <div class="imgs">
      <v-img v-for="(item,index) in result" :item="item" :key="index"></v-img>
    </div>
<!--     <div class="imgs">
      <img v-for="item of result" alt="图片" :src="item.img" @click="GoToSceneDetail(item.id)"></img>
    </div> -->
  </div>
</template>

<script>
  import ImgItem from './img_item/img_item.vue'

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
      // GoToSceneDetail (id) {
      //   this.$router.push({
      //     name: 'detail',
      //     params: {
      //       id: id
      //     }
      //   })
      // }
    },
    components: {
      'v-img': ImgItem
    }
  }
</script>

<style lang="sass" scoped="" type="text/css">
  @import '~common/styles/variable.sass'

  .img_list_wrapper
    p
      color: $color-text
      padding: 20px 0
      font-size: $font-size-medium
      .img_num
        color: $color-text-dd
        font-size: $font-size-medium-x
        font-weight: bold
    img
      width: 46%
      max-width: 290px
      height: 162px
      margin-bottom: 16px
      margin-right: 18px
</style>
