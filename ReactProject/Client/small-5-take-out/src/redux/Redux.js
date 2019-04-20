//导入createStore函数来创建store对象*/
import {createStore} from 'redux'
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

/*初始化状态树*/
const initValue={
  id:0,
  place:'北京',
  user:'',//用户phone
  userid:'',//用户id
  shopid:''//商店id
};

const changepalce= (state=initValue,action)=>{ //接收一个state和action
	//state具体的更新逻辑
    switch (action.type) {
        case "SAVE":{
          alert(11111)
          //拷贝一个对象
          return Object.assign({}, state, {
            place:action.place
          });
        }
        case 'SAVEUSER':{
            sessionStorage.setItem('user',action.user); // 存入一个值
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
        default:
            return state
    }
}

//创建初始store

const store = createStore(changepalce,initValue)
//createStore的第一个参数是一个reducer，第二个可选参数用于设置 state 初始状态


export  default store;
//store.getState() 获取store