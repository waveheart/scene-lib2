<!--
    **author:gyx
    **msg:Be happy! Guy!
 -->

<template>
  <div class="related_scene_wrapper">
    <p class="title">共有 <span class="sceneRelated_num">{{sceneRelated.length}}</span> 个相关场景</p>
    <div class="imgs">
      <img v-for="item in sceneRelated" :src="item.img" alt="xx" @click="routeToDetail(item.id)"></img>
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
      sceneRelated: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    methods: {
      routeToDetail (id) {
        this.$router.push({
          name: 'areaDetail',
          params: {
            id: id
          }
        })
      }
    }
  }
</script>

<style lang="sass" scoped="" type="text/css">
  @import '~common/styles/variable.sass'

  .related_scene_wrapper
    .title
    color: $color-text-d
    padding: 20px 0
    font-size: $font-size-medium
    .sceneRelated_num
      color: $color-text
      font-size: $font-size-medium-x
      font-weight: bold
  img
    width: 198px
    height: 110px
    margin-top: 16px

</style>
