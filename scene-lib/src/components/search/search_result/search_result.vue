<!--
    **author:gyx
    **msg:Be happy! Guy!
 -->

<template>
  <div class="result_wrapper">
    <div class="map_wrapper">
      <v-map></v-map>
    </div>
    <div class="img_list_wrapper">
      <v-img-list :result="result"></v-img-list>
    </div>
    <div class="scene_related_wrapper">
      <v-scene-related></v-scene-related>
    </div>
  </div>
</template>
<script>
  import BaiduMap from '../baidu_map/baidu_map.vue'
  import ImgList from '../img_list/img_list.vue'
  import SceneRelated from '../scene_related/scene_related.vue'

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
    components: {
      'v-map': BaiduMap,
      'v-img-list': ImgList,
      'v-scene-related': SceneRelated
    }
  }
</script>

<style lang="sass" scoped="" type="text/css">
  .result_wrapper
    width: 100%
    display: flex
    width: 1440px
    min-width: 1280px
    .map_wrapper
      width: 40%
      height: 400px
      overflow: hidden
    .img_list_wrapper
      width: 44%
      height: 600px
      padding-left: 20px
    .scene_related_wrapper
      width: 16%
</style>
