<!--
    **author:gyx
    **msg:Be happy! Guy!
 -->

<template>
  <div class="scene_detail_wrapper">
    <div class="title">
      <span class="main_title">{{data.name}}</span>
      <span class="sub_title">{{data.belongTo}}</span>
      <span class="favorite">收藏数{{data.collectNum}}</span>
      <span class="photo" @click="showDialog">我拍过</span>
    </div>
    <div class="scene_style">
      <span>古装</span>
      <span>科幻</span>
      <span>市政管辖</span>
      <span>风景区</span>
    </div>
    <div class="swiper_wrapper">
      <div @click="SetTime(0)">全部</div>
      <div @click="SetTime(1)">白天</div>
      <div @click="SetTime(2)">晚上</div>
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
          <img :src="image.src" alt="图片" width="200" height="200">
        </swiper-slide>
      </swiper>
      <img-detail :currentPic="currentPic"></img-detail>
    </div>
    <div class="tools">
      <p>可用工具</p>
      <span v-for="tool in data.tools">{{tool}}--</span>
    </div>
    <div class="filmed_team">
      <v-film v-for="(film,index) in data.filmedTeams" :film="film" :key="index"></v-film>
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

<style lang="scss" scoped>
  .swiper-container {
    background-color: #000;
  }
  .swiper-slide {
    background-size: cover;
    background-position: center;
  }
  .gallery-top {
    height: 80%!important;
    width: 100%;
  }
  .gallery-thumbs {
    height: 20%!important;
    box-sizing: border-box;
    padding: 10px 0;
  }
  .gallery_top .swiper-slide {
    height: 100%;
    opacity: 0.4;
  }
  .gallery_top .swiper-slide-active {
  opacity: 1;
  }

</style>
