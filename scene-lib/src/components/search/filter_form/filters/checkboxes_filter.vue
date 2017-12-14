<!--
    **author:gyx
    **msg:Be happy! Guy!
 -->

<template>
  <div class="checkbox_group_wrapper" @change="changeSelectedItems">
    <span>{{title}}</span>
    <el-checkbox v-for="(style, index) in selectItems" v-model="style.value" v-if="index<4" :key="style.name" :label="style.name"></el-checkbox>
    <span @click="toggleShowFlag" v-if="selectItems.length>4">更多</span>
    <el-checkbox v-for="(style, index) in selectItems" v-model="style.value" v-if="index>=4" v-show="showflagOfMore" :key="style.name"  :label="style.name"></el-checkbox>
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

<style lang="sass" scoped="" type="text/css">

</style>
