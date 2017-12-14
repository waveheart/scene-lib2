<!--
    **author:gyx
    **msg:Be happy! Guy!
 -->

<template>
  <div class="scene_detail_wrapper">
    <div class="title">
      <span class="main_title">吊脚楼</span>
      <span class="sub_title">白沙古镇景区</span>
      <span class="favorite">收藏数</span>
      <span class="photo">我拍过</span>
    </div>
    <div class="scene_style">
      <span>古装</span>
      <span>科幻</span>
      <span>市政管辖</span>
      <span>风景区</span>
    </div>
    <div class="swiper_wrapper">

    </div>
    <div class="img_detail">
      <img src="../../common/image/850c365df94146423f476c5fb4227a10.jpg" height="506" width="920" alt="图片">
      <aside>详细信息</aside>
    </div>
    <div class="tools">
      <span>簸箕</span>
      <span>铲子</span>
      <span>扫帚</span>
      <span>吧台</span>
    </div>
    <div class="filmed_team">
      <div>
        <p class="film_name"><<爱你的人>></p>
        <p class="director">导演 王小帅</p>
        <p class="submitter">提交人 令狐冲</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        id: this.$route.params.id,
        data: {}
      }
    },
    created () {
      this.$axios.get(`api/detail/${this.id}`).then(res => {
        this.data = res.data
        console.log(this.data)
      })
      // this.$axios.get('/api/data').then(res => {
      //   this.data = res.data.data
      //   console.log(this.data)
      // })
    }
  }
</script>

<style lang="sass" scoped="" type="text/css">

</style>
