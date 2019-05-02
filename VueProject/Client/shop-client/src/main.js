// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'//引入路由
import store from './assets/js/store'//引入store
import ElementUi from 'element-ui'//引入ui
import echarts from 'echarts'//引入echarts
import VueSocketio from 'vue-socket.io';
import socketio from 'socket.io-client';
//需要修改package.json里：  "vue-socket.io": "^2.1.1-a",
import 'element-ui/lib/theme-chalk/index.css'


 Vue.config.productionTip = false
 Vue.use(ElementUi)
 Vue.prototype.$echarts = echarts
 Vue.use(VueSocketio,socketio('http://localhost:8888/'));//与服务端链接
//  Vue.use(VueSocketio, socketio('http://localhost:8888')) // 注意和本地服务器地址及端口一致
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  sockets: {
    connect: function () {
      console.log('socket connected');
    }
  },
  components: { App },
  template: '<App/>'
})
