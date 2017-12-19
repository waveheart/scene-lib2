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
    <p class="submitter">提交人 {{film.submiter}} <img :src="film.img"></p>
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

</style>
