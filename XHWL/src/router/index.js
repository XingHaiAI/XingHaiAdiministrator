import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import FeedBack from '@/components/FeedBackForm'
import Interface from '@/components/Interface'
import FeedDetails from '../components/FeedBackDetails'
import InterfaceDetails from '../components/InterfaceDetails'
import UserDetails from '../components/UserDetails'
import Redirect from '../components/Dedirect'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/UserDetails',
      component:UserDetails
    },
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
    },
    {
      path:'/redirect',
      component:Redirect
    }
  ]
})
