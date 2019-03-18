import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { NavBar, Icon ,List } from 'antd-mobile';
import './css/myinf.css';
import imgURL from './images/fenxiang.png';
const Item = List.Item;
const Brief = Item.Brief;


class MyInf extends Component {
  constructor(props){
    super(props);
    this.state={

    }
  }
  render() {
    return (
      <div className="App">
        <div className='header'>
          <NavBar
            mode="light"
            icon={<Icon type="left" />}
            onLeftClick={() => console.log('onLeftClick')}
            rightContent={[
              <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
              <Icon key="1" type="ellipsis" />,
            ]}
          ></NavBar>
          <div className='onlodeing'>
            <Item
              arrow="horizontal"
              thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
              multipleLine
              onClick={() => {
                alert("走，登录去");
                  this.props.history.push('/login');
              }}
              >
              立即登录 <Brief>登录后可享受更多特权</Brief>
            </Item>
          </div>
        </div>
        <div className='myinftype'>
            <ul className="mitype">
              <li>
                <div className='fdtype-div'>
                  <img src={imgURL}  alt="饿呢" />
                  <span>钱包</span>
                </div>
              </li>
              <li>
                <div className='fdtype-div'>
                  <img src={imgURL}  alt="饿呢" />
                  <span>红包</span>
                </div>
              </li>
              <li>
                <div className='fdtype-div'>
                  <img src={imgURL}  alt="饿呢" />
                  <span>金币</span>
                </div>
              </li>
            </ul>
        </div>
        <div>
          <List  className="my-list">
            <Item
                arrow="horizontal"
                thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                multipleLine
                onClick={() => {}}
              >
                我的收藏
              </Item>
            <Item
                arrow="horizontal"
                thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                multipleLine
                onClick={() => {}}
              >
                金币商城
              </Item>
              <Item
                arrow="horizontal"
                thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                multipleLine
                onClick={() => {}}
              >
                我的客服
              </Item>
              <Item
                arrow="horizontal"
                thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                multipleLine
                onClick={() => {}}
              >
                加盟合作 
              </Item>
            </List>
        </div>


      </div>
    );
  }
}

export default withRouter(MyInf);
