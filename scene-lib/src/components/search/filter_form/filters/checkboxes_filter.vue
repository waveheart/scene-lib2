<!--
    **author:gyx
    **msg:Be happy! Guy!
 -->

<template>
  <div class="checkbox_group_wrapper" @change="changeSelectedItems">
    <span class="title">{{title}}</span>
    <el-checkbox v-for="(style, index) in selectItems" v-model="style.value" v-if="index<4" :key="style.name" :label="style.name"></el-checkbox>
    <span @click="toggleShowFlag" v-if="selectItems.length>4" class="show_more">更多</span>
    <div class="checkbox_more" v-if="selectItems.length>4" v-show="showflagOfMore">
      <el-checkbox v-for="(style, index) in selectItems" v-model="style.value" v-if="index>=4" :key="style.name"  :label="style.name"></el-checkbox>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        showflagOfMore: false,
        checkedItems: new Set()
      }
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: ''
      },
      selectItems: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    methods: {
      changeSelectedItems (e) {
        this.checkedItems.has(e.target.value) ? this.checkedItems.delete(e.target.value) : this.checkedItems.add(e.target.value)
        this.$emit('SelectedItemsChanged', this.checkedItems, this.type)
      },
      toggleShowFlag () {
        this.showflagOfMore = !this.showflagOfMore
      }
    }
  }
</script>

<style lang="sass" type="text/css">
  @import "~common/styles/variable.sass";

  .checkbox_group_wrapper
    width: 100%
    background-color: #FFF
    height: 40px
    line-height: 40px
    position: relative
    .title
      font-size: $font-size-medium
      margin-left: 10px
      margin-right: 20px
      color: $color-text-dd
    .el-checkbox__label
      color: $color-text
    .show_more
      font-size: $font-size-medium
      margin-left: 30px
    .checkbox_more
      position: absolute
      width: 100%
      // margin-top: 8px
      top: 56px
      height: 80px
      padding-left: 90px
      box-sizing: border-box
      background-color: #fff
      z-index: 2
      // border: 1px solid #ccc
      // border-radius: 5px
      .el-checkbox
        margin-right: 30px
        margin-left: 0
</style>
