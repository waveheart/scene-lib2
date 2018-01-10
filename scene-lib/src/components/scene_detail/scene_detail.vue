<!--
    **author:gyx
    **msg:Be happy! Guy!
 -->

<template>
  <div class="scene_detail_wrapper">
    <div class="scene_detail_title">
      <div class="scene_title">
        <span class="main_title">{{data.name}}</span>
        <span class="sub_title">{{data.belongTo}}</span>
      </div>
      <div class="scene_title_more">
        <span class="favorite">收藏数{{data.collectNum}}</span>
        <span class="photo" @click="showDialog">我拍过</span>
      </div>
    </div>
    <div class="scene_style">
      <span v-for="(style,index) in data.sceneStyles"><b v-if="index!==0"> • </b>{{style}}</span>
    </div>
    <div class="swiper_wrapper">
      <div>
        <span>{{timeDisplay}}</span>
        <span @click="SetTime(0)">全部</span>
        <span @click="SetTime(1)">白天</span>
        <span @click="SetTime(2)">晚上</span>
      </div>
      <el-slider v-model="time" range show-stops :max="1440" :step="30" :show-tooltip="false" @change="timeLineChange">
      </el-slider>
      <swiper :options="swiperOptionTop" class="gallery_top" ref="swiperTop">
        <swiper-slide v-for="(image,index) in selectPics" :key="index">
          <img :src="image.src" alt="图片" width="100" height="100">
        </swiper-slide>
        <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
        <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
      </swiper>

    </div>
    <div class="img_detail">
      <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
        <swiper-slide v-for="(image,index) in selectPics" :key="index">
          <img :src="image.src" alt="图片" width="696" height="400">
        </swiper-slide>
      </swiper>
      <img-detail :currentPic="currentPic" class="img_info"></img-detail>
    </div>
    <div class="tool_list">
      <p class="title">可用道具</p>
      <div class="tools">
        <span v-for="tool in data.tools">{{tool}}--</span>
      </div>
    </div>
    <div class="filmed_teams_wrapper">
      <p class="title">已拍摄剧组</p>
      <div class="filmed_teams">
        <v-film v-for="(film,index) in data.filmedTeams" :film="film" :key="index" class="team"></v-film>
      </div>
    </div>
    <v-dialog ref="dialog"></v-dialog>
  </div>
</template>

<script>
  import filmedTeam from './filmed_team/filmed_team.vue'
  import ImgDetail from './img_detail/img_detail.vue'
  import Dialog from '../base/dialog.vue'

  const ALLTIME = 0
  const DAYTIME = 1

  export default {
    data () {
      return {
        id: this.$route.params.id,
        data: {},
        time: [0, 1440],
        currentIndex: 0,
        swiperOptionTop: {
          spaceBetween: 40,
          centeredSlides: true,
          slidesPerView: 6,
          touchRatio: 0.2,
          slideToClickedSlide: true,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          on: {
            slideChange: () => {
              let swiperTop = this.$refs.swiperTop.swiper
              this.currentIndex = swiperTop.activeIndex
            }
          }
        },
        swiperOptionThumbs: {
        }
      }
    },
    computed: {
      timeDisplay () {
        return this.formatetime(this.time[0]) + '~' + this.formatetime(this.time[1])
      },
      selectPics () {
        let pics = []
        if (this.data.images === undefined) {
          return pics
        }
        this.data.images.forEach((image) => {
          if (image.capturedTime > this.time[0] && image.capturedTime <= this.time[1]) {
            pics.push(image)
          }
        })
        return pics
      },
      currentPic () {
        if (this.selectPics[this.currentIndex] === undefined) {
          return {}
        }
        return this.selectPics[this.currentIndex]
      }
    },
    created () {
      this.$axios.get(`api/detail/${this.id}`).then(res => {
        this.data = res.data
        console.log(this.data)
      })
    },
    mounted () {
      this.$nextTick(() => {
        const swiperTop = this.$refs.swiperTop.swiper
        const swiperThumbs = this.$refs.swiperThumbs.swiper
        swiperTop.controller.control = swiperThumbs
        swiperThumbs.controller.control = swiperTop
      })
    },
    methods: {
      formatetime (minuteNum) {
        return (~~(minuteNum / 60) + '').padStart(2, 0) + ':' + (~~(minuteNum % 60) + '').padStart(2, 0)
      },
      showDialog () {
        this.$refs.dialog.dialogFormVisible = true
      },
      timeLineChange (newTime) {
        // console.log(newTime)
      },
      SetTime (type) {
        let time = []
        type === ALLTIME ? time = [0, 1440] : type === DAYTIME ? time = [0, 720] : time = [720, 1440]
        this.time = time
        this.timeLineChange(this.time)
      }
    },
    components: {
      'v-film': filmedTeam,
      'img-detail': ImgDetail,
      'v-dialog': Dialog
    }
  }
</script>

<style lang="sass" type="text/css">
  @import '~common/styles/variable.sass'

  .scene_detail_wrapper
    display: flex
    flex-direction: column
    width: 1160px
    margin: 0 auto
    padding-bottom: 100px
    background-color: rgba(204,204,204,0.10)
    .title
      font-size: $font-size-large
      color: $color-text-dd
      font-weight: bold
    .scene_detail_title
      display: flex
      height: 46px
      margin-top: 34px
      justify-content: space-between
      align-items: center
      .main_title
        font-size: 32px
        color: $color-text-enhance
      .sub_title
        color: $color-text-enhance
        margin-left: 8px
      .scene_title_more
        span
          margin-left: 20px
    .scene_style
      font-size: $font-size-medium-x
    .swiper_wrapper
      margin-top: 30px
    // .swiper_top
    //   height: 102px
    .tool_list
      margin-top: 55px
      .tools
        margin-top: 18px
        font-size: $font-size-medium-x
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
    .img_info
      position: absolute
      margin-top: -410px
      z-index: 2
      background-color: #000
      width: 420px
      height: 400px
      margin-left: 700px


    .swiper-container
      background-color: #000
      height: 102px
      padding-top: 10px
    .swiper-slide
      background-size: cover
      background-position: center
    .gallery-top
      // height: 80%!important
      width: 100%
    .gallery-thumbs
      // height: 20%!important
      height: 420px
      box-sizing: border-box
      padding: 10px 0
    .gallery_top .swiper-slide
      height: 100%
      opacity: 0.4
    .gallery_top .swiper-slide-active
      opacity: 1


</style>
