# 项目简介

## 项目技术栈

   通过 creact-react-app搭建项目，使用Ant Design Mobile of React 作为移动端UI框架，
   
## 技术配置
   
   在使用Ant Design Mobile of React 时，先对入口页面 (html 或 模板) 相进行关设置，并引入样式

  >https://mobile.ant.design/docs/react/introduce-cn#3.-%E4%BD%BF%E7%94%A8


        import 'antd-mobile/dist/antd-mobile.css';
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


---



## 获取定位需要申请获取百度api的密钥

  > http://lbsyun.baidu.com/index.php?title=jspopular/guide/getkey