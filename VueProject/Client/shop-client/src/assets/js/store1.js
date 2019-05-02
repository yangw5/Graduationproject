import Vue from 'vue'
import Vuex from 'vuex'
import Lib from 'assets/js/Lib';

Vue.use(Vuex)
// store
const store = new Vuex.Store({
  state: {
    firstLoading: false,
    secondLoading: false,
    thirdLoading: false,
    fourthLoading: false,
    headerCache: {name: 'index'},
    headerOpened: '',
    dialogs: [],
    systemName: '',
    dragId: '',
    allowDropId: '',
    letterList: [],
    user: '',
    post: '',
    omgId: '',
    // 业务管理--调度中心--账号注册--表格选中项
    application: [],
    // 业务管理--调度中心--账号注册--表格详细
    applicationInfo: {},
    // 业务管理--调度中心--信息同步--信息同步详细
    syncInfo: {},
    tokenUser: {},
    documentList: [],
    calendarTime: [],
    //头部组件代办数量
    watieNumber: 0,
    // 文档状态
    documentStatus: '',
    // 当前待办是否为待阅
    isRead: false,
	 // documentfiles: []
    // datafiles: [],
    tcsBreadcrumbs: [],
    // 展示任务类别详情
    isShowDetails: false,
    // 展示模板详情
    isShowModelDetails: false
  },
  mutations: {
    updateFirstLoadingState (state,flag) {
      state.firstLoading=flag
    },
    updateSecondLoadingState (state,flag) {
      state.secondLoading=flag
    },
    updateThirdLoadingState (state,flag) {
      state.thirdLoading=flag
    },
    updateFourthLoadingState (state,flag) {
      state.fourthLoading=flag
    },
    updateHeaderCache (state,cache) {
      state.headerCache=cache
    },
    updateHeaderOpened (state,flag) {
      state.headerOpened=flag
    },
    modifyDialog (state,dialogInfo) {
      state.dialogs[dialogInfo.i].props = dialogInfo.props;
    },
    addDialog (state,dialog) {
      state.dialogs.push(dialog)
    },
    removeDialog (state) {
      state.dialogs.pop()
    },
    saveMsg(state, systemName) {
      state.systemName = systemName;
    },
    dragChange(state, dragId) {
      state.dragId = dragId;
    },
    allowDrop(state,allowDropId){
      state.allowDropId = allowDropId;
    },
    letter(state,letterList){
      state.letterList = letterList
    },
    userList(state,user){
      state.user=user
    },
    postList(state,post){
      state.post = post
    },
    omgTurn(state,id){
      state.omgId = id
    },
    // documentfiles(state,documentfiles){
    //   state.documentfiles = documentfiles
    // },
    // datafiles(state,datafiles){
    //   state.datafiles = datafiles
    // }
    updateApplication(state, checkList) {
      state.application = checkList
    },
    upDateapplicationInfo(state, info) {
      state.applicationInfo = info
    },
    upDateSyncInfo(state, info){
      state.syncInfo = info
    },
    tokenList(state,token){
      state.tokenUser = token
    },
    updateDocumentList(state, list){
      state.documentList = list;
    },
    updatecalendarTime(state,calendarTime){
      state.calendarTime = calendarTime
    },
    updateDocumentStatus(state, number) {
      state.documentStatus = number
    },
    updateWaitNumber(state,number){
      state.watieNumber = number
    },
    updateIsRead(state, number) {
      state.isRead = number
    },
    updateIsShowDetails(state, model) {
      state[model.name] = model.status
    }
  },
  actions: {
    onFirstLoading (context,flag) {
      context.commit('updateFirstLoadingState',flag);
    },
    onSecondLoading (context,flag) {
      context.commit('updateSecondLoadingState',flag);
    },
    onThirdLoading (context,flag) {
      context.commit('updateThirdLoadingState',flag);
    },
    onFourthLoading (context,flag) {
      context.commit('updateFourthLoadingState',flag);
    },
    onHeaderCache (context,cache) {
      context.commit('updateHeaderCache',cache);
    },
    onHeaderOpened (context,flag) {
      context.commit('updateHeaderOpened',flag);
    },
    onAddDialog (context,dialog) {
      context.commit('addDialog',dialog);
    },
    onRemoveDialog (context) {
      context.commit('removeDialog');
    },
    onModifyDialog (context,dialogInfo) {
      context.commit('modifyDialog',dialogInfo);
    },
    saveName(context, msg) {
      context.commit('saveMsg', msg) // 提交到mutations中处理
    },
    dragChangeId(context, id) {
      context.commit('dragChange', id)
    },
    omgclick(context,omg){
      context.commit('omgTurn',omg)
    },
    applicationClick(context, list){
      context.commit('updateApplication',list)
    },
    applicationTableClick(context, info){
      context.commit('upDateapplicationInfo',info)
    },
    syncTableclick(context, info){
      context.commit('upDateSyncInfo',info)
    },
    setDocumentList(context, list){
      context.commit('updateDocumentList', list)
    },
    setWaitNumber(context, number) {
      context.commit('updateWaitNumber', number)
    },
    setDocumentStatus(context, number) {
      context.commit('updateDocumentStatus', number)
    },
    setIsRead(context, number) {
      context.commit('updateIsRead', number)
    },
    //前端活动日志监听
    postactiondata(context,actiondata) {
      Lib.M.ajax({
        type: 'post',
        url: '/log/syslog/insertSysLogUserOper',
        headers: {
        },
        data: actiondata
      }).then(() => {
      }).catch((error) => {
        console.log(error);
        if (error.response && error.response.status == 400) {
          this.msg = `${error.response.data.error}!`;
        }
      });
    },
    setIsShowDetails(context, model) {
      context.commit('updateIsShowDetails', model)
    }
  },
  getter: {},
  modules: {}
})
export default store;
