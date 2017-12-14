import Vue from 'vue'
import Router from 'vue-router'

import Search from '../components/search/search.vue'
import SceneDetail from '../components/scene_detail/scene_detail.vue'

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
    }
  ]
})
