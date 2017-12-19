<!--
    **author:gyx
    **msg:Be happy! Guy!
 -->

<template>
  <div class="scene_area_wrapper">
    <div class="title">
      <span class="area_name">{{data.name}}</span>
      <span class="last_update">{{data.lastUpdate}}</span>
      <span class="favorite">收藏数：{{data.favorite}}</span>
      <span @click="showDialog">我拍过</span>
    </div>
    <div class="banner">
      <img :src="data.banner" alt="bannner">
    </div>
    <div class="scene_list">
      <p class="title">场景点</p>
      <div v-for="scene in data.scenes" @click="goToSceneDetail(scene.id)">
        <span class="name">{{scene.name}}</span>
        <img :src="scene.img" alt="pic">
      </div>
    </div>
    <div class="tags">
      <p class="title">场景点标签</p>
      <span v-for="tag in data.tags">{{tag}}</span>
    </div>
    <div class="scene_info">
      <p class="title">场景信息</p>
      <span class="address"><span class="subtitle">详细地址</span><span class="subtitle"></span>{{sceneInfo.address}}</span>
      <span class="open_time"><span class="subtitle">可拍摄时间</span>{{sceneInfo.openTime}}</span>
      <span class="electricity_supply"><span class="subtitle">供电情况</span>{{sceneInfo.electricity_supply}}</span>
      <span class="water_supply"><span class="subtitle">供水情况</span>{{sceneInfo.water_supply}}</span>
      <span class="transport"><span class="subtitle">搬运支持</span>{{sceneInfo.transport}}</span>
    </div>
    <div class="hotel_recommend">
      <p class="title">民宿推荐</p>
      <div v-for="hotel in data.hotelRecommend">
        <img :src="hotel.img" alt="hotel">
      </div>
    </div>
    <div class="restaurant_recommend">
      <p class="title">就餐推荐</p>
      <div v-for="restaurant in data.restaurantRecommend">
        <p>{{restaurant}}</p>
      </div>
    </div>
    <div class="filmed_teams">
      <p class="title">已拍摄剧组</p>
      <div class="filmed_team">
        <v-film v-for="(film,index) in data.filmedTeams" :film="film" :key="index"></v-film>
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

</style>
