<!--
    **author:gyx
    **msg:Be happy! Guy!
 -->

<template>
  <div class="img_detail">
    <div class="item_info">
      <p class="info">制造商</p>
      <p class="value">{{currentPic.productor}}</p>
    </div>
    <div class="item_info">
      <p class="info">型号</p>
      <p class="value">{{currentPic.model}}</p>
    </div>
    <div class="item_info">
      <p class="info">镜头生产商</p>
      <p class="value">{{currentPic.lenProductor}}</p>
    </div>
    <div class="item_info">
      <p class="info">拍摄时间</p>
      <p class="value">{{currentPic.capturedTime}}</p>
    </div>
    <div class="item_info">
      <p class="info">方向</p>
      <p class="value">{{currentPic.derection}}</p>
    </div>
    <div class="item_info">
      <p class="info">镜头型号</p>
      <p class="value">{{currentPic.lenVersion}}</p>
    </div>
    <div class="item_info">
      <p class="info">曝光时间</p>
      <p class="value">{{currentPic.aperture}}</p>
    </div>
    <div class="item_info">
      <p class="info">ISO感光度</p>
      <p class="value">{{currentPic.ISOspeed}}</p>
    </div>
    <div class="item_info">
      <p class="info">闪光灯</p>
      <p class="value">{{currentPic.flashlight}}</p>
    </div>
    <div class="item_info">
      <p class="info">GPS地点</p>
      <p class="value">{{currentPic.gps}}</p>
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
      currentPic: {
        type: Object,
        default: () => {
          return {}
        }
      }
    }
  }
</script>

<style lang="sass" scoped="" type="text/css">

</style>
