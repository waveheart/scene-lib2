<!--
    **author:gyx
    **msg:Be happy! Guy!
 -->

<template>
  <div class="scene_area_wrapper">
    <div class="main_info">
      <span class="area_name">{{data.name}}</span>
      <div class="main_info__sub">
        <span class="last_update">{{data.lastUpdate}}</span>
        <span class="favorite">收藏数：{{data.favorite}}</span>
        <span @click="showDialog">我拍过</span>
      </div>
    </div>
    <div class="tags">
      <span v-for="(tag,index) in data.tags"><b v-if="index!==0"> • </b>{{tag}}</span>
    </div>
    <div class="banner">
      <img :src="data.banner" alt="bannner">
    </div>
    <div class="scene_list_wrapper">
      <p class="title">场景点</p>
      <div class="scene_list">
        <div v-for="scene in data.scenes" @click="goToSceneDetail(scene.id)" class="scene_item">
          <span class="name">{{scene.name}}</span>
          <img :src="scene.img" alt="pic">
        </div>
      </div>
    </div>
    <div class="scene_tags">
      <p class="title">场景点标签</p>
      <span v-for="(tag,index) in data.tags"><b v-if="index!==0"> • </b>{{tag}}</span>
    </div>
    <div class="scene_info">
      <p class="title">场景信息</p>
      <div class="scene_info_detail">
        <span class="address"><span class="subtitle">详细地址</span>{{sceneInfo.address}}</span>
        <span class="open_time"><span class="subtitle">可拍摄时间</span>{{sceneInfo.openTime}}</span>
        <span class="electricity_supply"><span class="subtitle">供电情况</span>{{sceneInfo.electricity_supply}}</span>
        <span class="water_supply"><span class="subtitle">供水情况</span>{{sceneInfo.water_supply}}</span>
        <span class="transport"><span class="subtitle">搬运支持</span>{{sceneInfo.transport}}</span>
      </div>
    </div>
    <div class="hotel_recommend">
      <p class="title">民宿推荐</p>
      <div class="hotel_wrapper">
        <span v-for="hotel in data.hotelRecommend" class="hotel">
          <img :src="hotel.img" alt="hotel">
        </span>
      </div>
    </div>
    <div class="restaurant_recommend">
      <p class="title">就餐推荐</p>
      <div class="restaurant_list">
        <span class="restaurant" v-for="restaurant in data.restaurantRecommend">{{restaurant}}</span>
      </div>
    </div>
    <div class="filmed_teams_wrapper">
      <p class="title">已拍摄剧组</p>
      <div class="filmed_teams">
        <v-film v-for="(film,index) in data.filmedTeams" :film="film" :key="index" class="team"></v-film>
      </div>
    </div>
    <v-dialog ref="dialog" :isScenicArea="true"></v-dialog>
  </div>
</template>

<script>
  import FilmedTeam from '../scene_detail/filmed_team/filmed_team.vue'
  import Dialog from '../base/dialog.vue'

  export default {
    data () {
      return {
        id: this.$route.params.id,
        data: {}
      }
    },
    created () {
      this.$axios.get(`api/areaDetail/${this.id}`).then(res => {
        this.data = res.data
        console.log(this.data)
      })
    },
    computed: {
      sceneInfo () {
        return this.data.sceneInfo === undefined ? {} : this.data.sceneInfo
      }
    },
    methods: {
      showDialog () {
        this.$refs.dialog.dialogFormVisible = true
      },
      goToSceneDetail (id) {
        this.$router.push({
          name: 'detail',
          params: {
            id: id
          }
        })
      }
    },
    components: {
      'v-film': FilmedTeam,
      'v-dialog': Dialog
    }
  }
</script>

<style lang="sass" scoped="" type="text/css">
  @import '~common/styles/variable.sass'

  .scene_area_wrapper
    display: flex
    flex-direction: column
    width: 1160px
    margin: 0 auto
    padding-bottom: 100px
    background-color: rgba(204,204,204,0.10)
    // align-items: center
    .title
      font-size: $font-size-large
      color: $color-text-dd
      font-weight: bold
    .main_info
      display: flex
      height: 46px
      margin-top: 34px
      justify-content: space-between
      align-items: center
      .area_name
        font-size: 32px
        color: $color-text-enhance
    .main_info__sub
      span
        margin-left: 10px
    .tags
      font-size: $font-size-medium-x
    .banner
      width: 100%
      height: 440px
      margin-top: 32px
      img
        width: 100%
        height: 100%
    .scene_list_wrapper
      margin-top: 50px
    .scene_list
      display: flex
      flex-wrap: wrap
      margin-right: -40px
      // justify-content: space-between
      .scene_item
        position: relative
        width: 160px
        height: 160px
        margin-right: 40px
        overflow: hidden
        margin-top: 32px
        span.name
          position: absolute
          color: #fff
          bottom: 10px
          width: 160px
          text-align: center
        img
          width: 100%
          height: 100%
    .scene_tags
      margin-top: 60px
      span
        height: 48px
        line-height: 48px
    .scene_info
      margin-top: 36px
      .scene_info_detail
        margin-top: 20px
        display: flex
        flex-wrap: wrap
        background-color: #FFF
        box-shadow: 0 1px 4px 0 #CCCCCC
        padding: 40px 0
        align-items: center
        span
          flex: 1 1 50%
          height: 48px
          line-height: 48px
          color: $color-text-d
        .subtitle
          padding-left: 30px
          padding-right: 20px
    .hotel_recommend
      margin-top: 56px
      .hotel_wrapper
        margin-top: 20px
        display: flex
        flex-wrap: wrap
        margin-right: -40px
        .hotel
          margin-right: 40px
    .restaurant_recommend
      margin-top: 60px
      .restaurant_list
        height: 42px
        line-height: 42px
      .restaurant
        margin-right: 30px
    .filmed_teams_wrapper
      margin-top: 36px
      .filmed_teams
        display: flex
        flex-wrap: wrap
        margin-right: -50px
      .team
        width: 355px
        margin-right: 48px
        margin-top: 18px

</style>
