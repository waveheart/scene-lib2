<!--
    **author:gyx
    **msg:Be happy! Guy!
 -->

<template>
  <div class="img_item_wrapper" @click="GoToSceneDetail(item.id)">
    <div class="tags">
      <span class="item_tag" v-for="tag in itemTags">{{tag}}</span>
    </div>
    <img :src="item.img" alt="图片">
    <span class="item_name">{{item.name}}</span>
  </div>
</template>

<script>
  export default {
    data () {
      return {

      }
    },
    props: {
      item: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    computed: {
      itemTags () {
        return [...this.item.environment, ...this.item.manageMode, ...this.item.placeTypes, ...this.item.sceneStyles]
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
  .img_item_wrapper
    display: inline-block
    width: 46%
    max-width: 290px
    height: 162px
    position: relative
    margin-bottom: 16px
    margin-right: 18px
    img
      width: 100%
      height: 100%
    .tags
      position: absolute
      width: 80%
      left: 8px
      top: 8px
      .item_tag
        display: inline-block
        background-color: #FFF
        border-radius: 5px
        padding: 4px 8px
        font-size: 12px
        color: #333
        margin-right: 4px
        margin-bottom: 4px
    .item_name
      position: absolute
      bottom: 8px
      left: 8px
      font-size: 14px
      color: #fff
</style>
