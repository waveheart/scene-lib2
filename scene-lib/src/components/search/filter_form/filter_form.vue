<!--
    **author:gyx
    **msg:Be happy! Guy!
 -->

<template>
  <div class="filter_form_wrapper">
    <div class="scene_type">
      <span>场景类型</span>
      <el-radio-group v-model="scene_type" @change="radiochange">
        <el-radio label="室内">室内</el-radio>
        <el-radio label="室外">室外</el-radio>
      </el-radio-group>
    </div>
    <div v-for="item in filterTypes">
      <v-checkboxes :title="item.name" :type="item.type" :selectItems="item.data" @SelectedItemsChanged="SelectedItemsChanged"></v-checkboxes>
    </div>
  </div>
</template>

<script>
  import CheckBoxes from './filters/checkboxes_filter.vue'

  export default {
    data () {
      return {
        scene_type: 0,
        filterTerms: {
          scene_type: '',
          scene_styles: new Set(),
          manage_modes: new Set(),
          place_types: new Set()
        },
        filterTypes: [
          {
            name: '适宜风格',
            type: 'scene_styles',
            data: [
              {name: '现代', value: false},
              {name: '古装', value: false},
              {name: '科幻', value: false},
              {name: '校园', value: false},
              {name: '惊悚', value: false},
              {name: '爱情', value: false},
              {name: '公路', value: false},
              {name: '悬疑', value: false},
              {name: '文艺', value: false},
              {name: '动作', value: false},
              {name: '喜剧', value: false},
              {name: '警匪', value: false}
            ]
          },
          {
            name: '经营方式',
            type: 'manage_modes',
            data: [
              {name: '市政经营', value: false},
              {name: '商业运行', value: false}
            ]
          },
          {
            name: '地点类型',
            type: 'place_types',
            data: [
              {name: '摄影棚', value: false},
              {name: '办公区', value: false},
              {name: '餐厅', value: false},
              {name: '咖啡馆', value: false},
              {name: '公园/植物园', value: false},
              {name: '游乐场', value: false},
              {name: '地标', value: false},
              {name: '学校', value: false},
              {name: '医院', value: false},
              {name: '广场', value: false}
            ]
          }
        ]
      }
    },
    methods: {
      radiochange (value) {
        this.filterTerms.scene_type = this.scene_type
        this.$emit('SelectedItemsChanged', this.filterTerms)
      },
      SelectedItemsChanged (checkedItems, type) {
        this.filterTerms[type] = checkedItems
        this.$emit('SelectedItemsChanged', this.filterTerms)
      }
    },
    watch: {
    },
    components: {
      'v-checkboxes': CheckBoxes
    }
  }
</script>

<style lang="sass" scoped="" type="text/css">

</style>
