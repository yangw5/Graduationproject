# 项目简介

## 项目技术栈

   通过 creact-react-app搭建项目，使用Ant Design Mobile of React 作为移动端UI框架，

   1. react
   1. Ant Design Mobile
   1. react router
   1. redux
   1. 百度api
   1. axios
   
## 技术配置
   
   在使用Ant Design Mobile of React 时，先对入口页面 (html 或 模板) 相进行关设置，并引入样式

  >https://mobile.ant.design/docs/react/introduce-cn#3.-%E4%BD%BF%E7%94%A8


    import 'antd-mobile/dist/antd-mobile.css';

  修改antd的默认样式 找到爷爷级 向下到需要修改的元素 进行样式设置 或者父元素自定义类名 向下设置元素样式

     .onlodeing .am-list-item{
       background-color: #108ee9;
       color: #ffffff;
       border: 0px;
      }
      .am-list-item .am-list-line .am-list-content{
        color: #ffffff;
     }
---
## 基本知识

1. 获取原生dom 设置Refs，在通过 this.refs.xxx进行访问

        ref='item1'

        this.refs.item1.style.background = 'white';

    使用refs需要注意的地方： 
    1. Refs是访问组件内部DOM节点唯一看可靠的方法 

    2. Refs会自动销毁对组件的引用 

    3. 不要在render或者render之前对Refs进行调用 

    4. 不要滥用Refs(会影响性能)

1. 事件绑定获取当前绑定dom ，匿名函数传递e,事件函数 通过e.target/currentTarget获取当前dom元素
      
        onClick={(e)=>{this.gotofood(e，"aaa")}}//可传递参数

        gotofood(e,a){
        //e.target/currentTarget
        alert(e.target.id);
        }
1. 数组循环页面数据渲染 

        this.state.foodstype.map(function(value,index){
          return (
            <li> <li>
              <div  className='type-item'  id='item1' key={index} onClick={(e)=>{this.gotofood(e)}}>{value}</div>
           </li>
        }

---
## react router

  一般情况下，只有Router 的component组件能够自动带有三个属性 history location match,没有在router的组件需要通过 

    import { withRouter } from 'react-router-dom';
    export default withRouter(component);//withRouter进行包裹,将父组件的router信息通过props传递下来。

  模式：

  1. hashHistory：hash模式，url后面会增加#，通过url中的 # 后面变化进行路由跳转。
  1. browserHistory：history模式，正常显示url,背后调用的是浏览器的History API。需要 server 端支持
    

  进行路由跳转


  1. 首先进入项目目录，使用npm安装react-router-dom：
  
          npm install react-router-dom --save-dev //这里可以使用cnpm代替npm命令

  2. 编写Router.js路由组件及各个子组件 

          import React from 'react';
          import {HashRouter, Route, Switch} from 'react-router-dom';
          import HomePage from '../pages/HomePage';
          import MyInf from '../pages/MyInf'
          import MyCar from '../pages/MyCar'
          import MyOrder from '../pages/MyOrder'


          const BasicRoute = () => (
              <HashRouter>
                  <Switch>
                      <Route exact path="/" component={HomePage}/>
                      <Route exact path="/mycar" component={MyCar}/>
                      <Route exact path="/myorder" component={MyOrder}/>
                      <Route exact path="/myinf" component={MyInf}/>
                  </Switch>
              </HashRouter>
          );

          export default BasicRoute;

    3. 按需引入路由组件并进行跳转设置

        * 标签跳转 

              <a href='#/myinf'>去我的</a>

              或者：

              import { Link } from 'react-router-dom';
              <Link to="/myinf" replace>link 跳转 去我的</Link>



        * 函数跳转
          
              要有  constructor

              然后  this.props.history.push('/myinf');

            一般情况下，只有Router 的component组件能够自动带有三个属性 history location match,没有在router的组件需要通过 

              import { withRouter } from 'react-router-dom';
              export default withRouter(component);//withRouter进行包裹,将父组件的router信息通过props传递下来。


        * url传参

              <Route exact path="/detail/:id" component={Detail}/>
              ...

              ...
              componentDidMount() {
                  console.log(this.props.match.params);
              }
              ...

    4. 嵌套路由

        在 2.x、3.x原路由配置为集中思想 ,而React-Router4.x则是路由组件化分布，存在于布局和 UI 之间
    
---
## redux

  * 状态管理库，简化api,行为完全可预测。redux有flux演化而来。

    需要被管理的状态有：服务器响应、缓存数据、本地生成尚未持久化到服务器的数据，也包括 UI 状态，如激活的路由，被选中的标签，是否显示加载动效或者分页器等等。

    > component --> dispatch(action) --> reducer --> subscribe --> getState --> component

    redux包括：state ，action,reducer
    
    store的方法：

      1. dispatch:

      2. subscribe：

      3. getState：

      4. replaceReducer:

    一般来会通过 store.dispatch() 将 action 传到 store。它是 store 数据的唯一来源。,通过在组件中引入action和store,调用store.dispatch() 进行修改。

  * 三大原则

    1. 单一数据流

        整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中。
    1. State 是只读的

       唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象。

    1. 使用纯函数来执行修改

        为了描述 action 如何改变 state tree ，你需要编写 reducers。

  * actions对象：描述修改store的动作
           
        export function SavePlace(txt) {
        return {
              type:'SAVE',
              place:txt
            }
          }
  * reducers 动作的具体描述

        const changepalce= (state=initValue,action)=>{ //接收一个state和action
          //state具体的更新逻辑
            switch (action.type) {
                case "SAVE":
                //拷贝一个对象
                    return Object.assign({}, state, {
                      id:0,
                      place:action.place
                    })
                default:
                    return state
            }
        }



  * store 状态对象

        const initValue={id:0,place:'北京'};
        //创建初始store
        const store = createStore(changepalce,initValue)
        //createStore的第一个参数是一个reducer，第二个可选参数用于设置 state 初始状态
        export  default store;
  
  * 引入使用

        import { SavePlace } from '../../redux/Actions';
        import store from '../../redux/Redux';
        store.getState()
        store.dispatch(SavePlace(text));

---
## 异步请求

  1. 原生 ajax (XMLHttpRequest)

          var xhr = new XMLHttpRequest(); 
          xhr.open("GET", url); 
          xhr.responseType = 'json'; 
          xhr.onload = function(){ 
          console.log(xhr.response); 
          }; 
          xhr.onerror = function(){ 
          console.log("error") 
          } 
          xhr.send();
  1.  fetch

      fetch不是ajax的进一步封装，而是原生js，没有使用XMLHttpRequest对象。fetch 是一个新的游览器对象 

      fetch请求默认是不带cookie的，需要设置fetch(url, {credentials: 'include'})
      服务器返回400,500这样的错误码时不会reject,只有网络错误这些导致请求不能完成时，fetch才会被reject.

          fetch(url, options).then(function(response) { 
          // handle HTTP response 
          }, function(error) { 
          // handle network error 
          })

  1. async/await (Promise)

  1. axios

      Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。是对XHR的封装

      如果您的环境不支持ES6 Promises，您可以使用polyfill。

      shim是一个库,它将一个新的API引入到一个旧的环境中,而且仅靠旧环境中已有的手段实现 polyfill就是一个用在浏览器API上的shim
      Polyfill是一个js库，主要抚平不同浏览器之间对js实现的差异

          // get向具有指定ID的用户发出请求
          axios.get('/user?ID=12345'
          <!-- {
            params: {
            ID: 12345
            }
          } -->
          
          )
          .then(function (response) {
          console.log(response);
          })
          .catch(function (error) {
          console.log(error);
          });

          //post
          axios.post('/user', {
          firstName: 'Fred',
          lastName: 'Flintstone'
          })
          .then(function (response) {
          console.log(response);
          })
          .catch(function (error) {
          console.log(error);
          });
          
---

## if else判断

  { } 里面为js 代码，可以将其分装成函数或者变量，或者用三元运算符 ？ ：进行判断

---

## 生命周期

* 初始化

  1. getDefaultProps() getInitialState()

      设置默认的props，也可以用dufaultProps设置组件的默认属性.

      在使用es6的class语法时是没有这个钩子函数的，可以直接在constructor中定义this.state。此时可以访问this.props

  1. componentWillMount() 
    
      组件初始化时只调用，以后组件更新不调用，整个生命周期只调用一次，此时可以修改state。

  1. render()

      react最重要的步骤，创建虚拟dom，进行diff算法，更新dom树都在此进行。此时就不能更改state了  
  
  1. componentDidMount()

      组件渲染之后调用，只调用一次。

* 更新

  1. componentWillReceiveProps(nextProps)

    
  1. 
  1. 


* 卸载



---

## 获取定位需要申请获取百度api的密钥

  > http://lbsyun.baidu.com/index.php?title=jspopular/guide/getkey