import Vue from 'vue'
import Router from 'vue-router'

import Search from '../components/search/search.vue'
import SceneDetail from '../components/scene_detail/scene_detail.vue'
import SceneArea from '../components/scene_area/scene_area.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: './Search'
    },
    {
      path: '/Search',
      component: Search
    },
    {
      name: 'detail',
      path: '/detail/:id',
      component: SceneDetail
    },
    {
      name: 'areaDetail',
      path: '/areaDetail/:id',
      component: SceneArea
    }
  ]
})
