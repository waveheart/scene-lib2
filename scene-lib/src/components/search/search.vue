<!--
    **author:gyx
    **msg:Be happy! Guy!
 -->

<template>
    <div class="search">
      <v-filter @SelectedItemsChanged="filterSearchResult"></v-filter>
      <v-search :result="filterResult"></v-search>
    </div>
</template>

<script>
import FilterForm from './filter_form/filter_form.vue'
import SearchResult from './search_result/search_result.vue'

export default {
  data () {
    return {
      checked: true,
      input: '',
      data: new Set(),
      // city: '',
      searchResult: [],
      filterResult: [],
      filterTerms: {}
    }
  },
  props: {
    city: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  created () {
    this.$axios.get('/api/data').then(res => {
      this.data = res.data.data
      console.log(this.data)
    })
  },
  methods: {
    // selectedCity () {
    //   this.data.forEach((item) => {
    //     item.city === this.city && this.searchResult.push(item)
    //   })
    // },
    changeCity (city) {
      // this.city = city
      this.searchResult = []
      this.data.forEach((item) => {
        item.city === this.city && this.searchResult.push(item)
      })
      this.filterSearchResult(this.filterTerms)
    },
    filterSearchResult (filterTerms) {
      // filterTerms: {
      //   scene_type: '',
      //   scene_styles: new Set(),
      //   manage_modes: new Set(),
      //   place_types: new Set()
      // }
      // console.log(filterTerms)
      this.filterResult = []
      if (!Object.keys(filterTerms).length) {
        this.filterResult = this.searchResult.slice(0)
        return
      }
      this.filterTerms = filterTerms
      this.searchResult.forEach((item) => {
        if (this.isSelectedSceneType(item.environment, filterTerms.scene_type) && this.isSelectedOptionOfScene(item.sceneStyles, filterTerms.scene_styles) && this.isSelectedOptionOfScene(item.manageMode, filterTerms.manage_modes) && this.isSelectedOptionOfScene(item.placeTypes, filterTerms.place_types)) {
          this.filterResult.push(item)
        }
      })
    },
    // 是否是所选场景类型
    isSelectedSceneType (itemEnvironment, SceneType) {
      if (!SceneType) {
        return true
      }
      if (itemEnvironment === SceneType) {
        return true
      } else {
        return false
      }
    },
    // 是否是其余多选类型, option 皆为 Set类型
    isSelectedOptionOfScene (itemProperty, option) {
      // 如果没有选中该项，直接返回真
      if (!option.size) {
        return true
      }
      // 如果该项有内容，则逐项判断
      let flag = false
      itemProperty.forEach((property) => {
        if (option.has(property)) {
          flag = true
        }
      })
      return flag
    }
  },
  mounted () {
    // this.city = this.vCity
    // this.$nextTick(() => {
    //   this.data !== null && this.selectedCity()
    // })
  },
  watch: {
    data () {
      this.$nextTick(() => {
        this.data !== null && this.changeCity(this.city)
      })
    },
    city () {
      this.changeCity(this.city)
    }
    // vCity () {
    //   this.city = this.vCity
    //   console.log('11' + this.city)
    // }
  },
  components: {
    'v-filter': FilterForm,
    'v-search': SearchResult
  }
}
</script>

<style lang="sass" type="text/css">
</style>
