import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '../components/login/index'
import register from '../components/login/register'
import registeritem1 from '../components/login/register/registeritem1'
import registeritem2 from '../components/login/register/registeritem2'

import shopcenter from '../components/shopcenter/index'

import homepage from '../components/shopcenter/homepage/index'

import shopinf from '../components/shopcenter/shopinf/index'
import shop from '../components/shopcenter/shopinf/shop'
import food from '../components/shopcenter/shopinf/food'
import fooditem from '../components/shopcenter/shopinf/fooditem'

import order from '../components/shopcenter/order/index'

import ordertype1 from '../components/shopcenter/order/ordertype1'
import ordertype2 from '../components/shopcenter/order/ordertype2'
import ordertype3 from '../components/shopcenter/order/ordertype3'
import ordertype4 from '../components/shopcenter/order/ordertype4'
import orderdata from '../components/shopcenter/order/orderdata'

import comment from '../components/shopcenter/comment/index'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/register ',
      name: 'register',
      component:register,
      children:[{
        path:'',
        name:'registeritem1',
        component:registeritem1 
    },
    {
      path:'registeritem2',
      name:'registeritem2',
      component:registeritem2 
    }]
    },
    {
      path: '/shopcenter',
      name: 'shopcenter',
      component: shopcenter,
      children:[
        {
          path:"/",
          component:homepage,
        },
        {
          path:"shop",
          component:shopinf,
          children:[{
              path:"",
              component:shop,
          },
          {
            path:"food",
            component:food,
          },
          {
            path:"fooditem",
            component:fooditem
          }]
        },
        {
          path:"order",
          component:order,
          children:[{
            path:"",
            component:ordertype1
          },
          {
            path:"runorder",
            component:ordertype2
          },
          {
            path:"didorder",
            component:ordertype3
          },
          {
            path:"badorder",
            component:ordertype4
          },{
            path:"orderdata",
            component:orderdata,
          }]
        },
        {
          path:"comment",
          component:comment,
        }
     ],
    },
    
  ]
})
