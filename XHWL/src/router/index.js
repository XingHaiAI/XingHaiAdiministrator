import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import FeedBack from '@/components/FeedBackForm'
import Interface from '@/components/Interface'
import FeedDetails from '../components/FeedBackDetails'
import InterfaceDetails from '../components/InterfaceDetails'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/FeedBackForm',
      name:'FeedBackForm',
      component:FeedBack,
    },
    {
      path:'/Interface',
      component:Interface,
    },
    {
      path:'/FeedBackDetails',
      component:FeedDetails
    },
    {
      path:'/InterfaceDetails',
      component:InterfaceDetails
    }
  ]
})
