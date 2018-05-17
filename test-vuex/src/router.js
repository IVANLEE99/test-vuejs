import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Todo from './views/Todo'
import my_todo from './views/my_todo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },{
      path:'/todo',
      name:'todo',
      component:Todo
    },{
      path:'/mytodo',
      name:'mytodo',
      component:my_todo
    }
  ]
})
