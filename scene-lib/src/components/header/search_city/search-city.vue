<!--
    **author:gyx
    **msg:Be happy! Guy!
 -->

<template>
  <div class="search_city_wrapper">
    <el-select v-model="city" filterable @change="changeCity">
      <el-option-group
        v-for="group in options3"
        :key="group.label"
        :label="group.label">
        <el-option
          v-for="item in group.options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-option-group>
    </el-select>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        options3: [{
          label: '城市名称',
          options: [{
            value: 'Shanghai',
            label: '上海'
          }, {
            value: 'Beijing',
            label: '北京'
          }, {
            value: 'Chongqing',
            label: '重庆'
          }]
        }],
        city: 'Chongqing'
      }
    },
    created () {
      // this.$emit('selectedCity', this.city)
      this.changeCity(this.city)
    },
    methods: {
      changeCity (city) {
        this.$emit('changeCity', city)
      }
    }
  }
</script>

<style lang="sass" scoped="" type="text/css">

</style>
