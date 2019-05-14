//导入createStore函数来创建store对象*/
import {createStore} from 'redux'
import webstage from '../assets/webstage'
//import action from './Actions'

//action创建函数
/*每一个action返回的是一个对象，对象必须包含type属性*/

// const action = step=>{
// 	return {
// 		type:'SAVE',
// 		step  
// 	}
// }
// dispatch(action)

//定义一个reducer

//判断sessionstorage是否存储数据
//let user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')): {};
let user = sessionStorage.getItem('user') ? sessionStorage.getItem('user'): '';
let userid= sessionStorage.getItem('userid')?sessionStorage.getItem('userid'):'';
let shopid= sessionStorage.getItem('shopid')?sessionStorage.getItem('shopid'):'';
let navTab= sessionStorage.getItem('navTab')?sessionStorage.getItem('navTab'):'';
let navTab2= sessionStorage.getItem('navTab2')?sessionStorage.getItem('navTab2'):'';
let orderdata= sessionStorage.getItem('orderdata') ? JSON.parse(sessionStorage.getItem('orderdata')): {};
let ordertype= sessionStorage.getItem('ordertype')?sessionStorage.getItem('ordertype'):'';
let orderstate= sessionStorage.getItem('orderstate')?sessionStorage.getItem('orderstate'):'';

/*初始化状态树*/
const initValue={
  id:0,
  place:'北京',
  user:user,//用户phone
  userid:userid,//用户id
  shopid:shopid,//商店id
  navTab:navTab,//选择tab
  navTab2:navTab2,//选择tab
  orderdata:orderdata,//订单数据
  ordertype:ordertype,//订单操作类型
  orderstate:orderstate//订单操作类型
  
};

const changepalce= (state=initValue,action)=>{ //接收一个state和action
	//state具体的更新逻辑
    switch (action.type) {
        case "SAVE":{
          //拷贝一个对象
          return Object.assign({}, state, {
            place:action.place
          });
        }
        case 'SAVEUSER':{
            
            sessionStorage.setItem('user',action.user); // 存入一个值
            
            let a=webstage.sessionStorage.getstorage('user')
            alert(a)
            //获取 sessionStorage
            //let userid=sessionStorage.getItem('userid'); // => 返回userid对应的值
            return Object.assign({}, state, {
              user:action.user
            });
          }
          case 'SAVEUSERID':{
            sessionStorage.setItem('userid',action.userid); // 存入一个值
            return Object.assign({}, state, {
              userid:action.userid
            });
          }
          case 'SAVESHOPID':{
            sessionStorage.setItem('shopid',action.shopid); // 存入一个值
            return Object.assign({}, state, {
              shopid:action.shopid
            });
          }
          case 'SAVENAVTAB':{
            sessionStorage.setItem('navTab',action.navTab); // 存入一个值
            return Object.assign({}, state, {
              navTab:action.navTab
            });
          }
          case 'SAVENAVTAB2':{
            sessionStorage.setItem('navTab2',action.navTab2); // 存入一个值
            return Object.assign({}, state, {
              navTab2:action.navTab2
            });
          }
          case 'SAVEORDERDATA':{
            sessionStorage.setItem('orderdata',JSON.stringify(action.orderdata)); // 存入一个值
            return Object.assign({}, state, {
              orderdata:action.orderdata
            });
          }
          case 'SAVEORDERTYPE':{
            sessionStorage.setItem('ordertype',action.ordertype); // 存入一个值
            return Object.assign({}, state, {
              ordertype:action.ordertype
            });
          }
          case 'SAVEORDERSTATE':{
            sessionStorage.setItem('orderstate',action.orderstate); // 存入一个值
            return Object.assign({}, state, {
              orderstate:action.orderstate
            });
          }
        default:
            return state
    }
}

//创建初始store

const store = createStore(changepalce,initValue)
//createStore的第一个参数是一个reducer，第二个可选参数用于设置 state 初始状态


export  default store;
//store.getState() 获取store