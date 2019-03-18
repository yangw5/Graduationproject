import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import './css/myorder.css';
import { Button, WhiteSpace, WingBlank } from 'antd-mobile';
import lodeing from './img/1.jpg';

class MyOrder extends Component {
  render() {
    return (
      <div className="App">
        <div className='lodeing'>
            <img src={lodeing} alt='' />
            <span className='tips'>登录后查看外卖订单</span>
            <Button type="primary">立即登录</Button><WhiteSpace />
        </div>
      </div>
    );
  }
}

export default withRouter(MyOrder);
