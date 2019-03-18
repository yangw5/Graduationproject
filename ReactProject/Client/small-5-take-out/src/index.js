import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd-mobile/dist/antd-mobile.css'; //引入antd样式
import './assets/aifont/font_1091223_zlhmvhmmyj/iconfont.css';//引入阿里矢量样式
import './assets/css/init.css'//引入淘宝css初始代码
import Router from './router/Router'; //引入路由组件


ReactDOM.render(< Router/>, document.getElementById('root'));
