<!--
    **author:gyx
    **msg:Be happy! Guy!
 -->

<template>
  <div class="team_wrapper">
    <p class="film_name"><<{{film.name}}>></p>
    <p class="director">
      <span>导演</span>
      <span v-for="(director,index) in film.directors" v-if="index==0">{{director}}</span>
      <span v-for="(director,index) in film.directors" v-if="index>0">/ {{director}}</span>
    </p>
    <div class="split"></div>
    <p class="submitter"><span>提交人 {{film.submiter}}</span><img :src="film.img" class="submitter_avatar"></p>
  </div>
</template>

<script>
  export default {
    data () {
      return {

      }
    },
    props: {
      film: {
        type: Object,
        default: () => {
          return {}
        }
      }
    }
  }
</script>

<style lang="sass" scoped="" type="text/css">
  @import '~common/styles/variable.sass'

  .team_wrapper
    width: 354px
    height: 190px
    box-sizing: border-box
    padding: 26px 20px
    box-shadow: 0 1px 4px 0 #CCCCCC
    .film_name
      line-height: 32px
      text-indent: 4px
      color: $color-text-dd
      font-size: 24px
    .director
      font-size: $font-size-large
      color: $color-text-d
      height: 48px
      line-height: 48px
      text-indent: 4px
    .split
      width: 100%
      height: 2px
      background-color: #CCC
    .submitter
      margin-top: 16px
      text-indent: 4px
      height: 44px
      line-height: 44px
      display: flex
      justify-content: space-between
      .submitter_avatar
        width: 44px
        height: 44px
        border-radius: 50%
</style>
