import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {//要设置的全局访问的state对象
    userphone:'',
    usershop:{},//店铺信息
    ordertype:0//订单类型
  },
  mutations: {//自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
    updateFirstLoadingState (state,flag) {
      state.userphone=flag
    },
    updateFirstLoadingState2 (state,flag) {
      state.usershop=flag
    },
    updateordertype (state,flag) {
      state.usershop=flag
    },
  },
  actions: { //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
    onFirstLoading (context,flag) {
      context.commit('updateFirstLoadingState',flag);
    },
    onFirstLoading2 (context,flag) {
      context.commit('updateFirstLoadingState2',flag);
    },
    onOrdertype (context,flag) {
      context.commit('updateordertype',flag);
    },
  },
  getter: {},//实时监听state值的变化(最新状态)
  modules: {}
})
export default store;
//调用  this.$store.state.userphone
//调用  this.$store.dispatch('onFirstLoading',false)
//$store.commit( 'onFirstLoading',false )