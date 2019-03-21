import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { NavBar, Icon ,List } from 'antd-mobile';
import './css/myinf.css';
import imgURL from './images/fenxiang.png';
import userlogo from './images/userlogo.jpg'

import { SavePlace } from '../../redux/Actions';
import store from '../../redux/Redux';

const Item = List.Item;
const Brief = Item.Brief;
let user=store.getState().user;



class MyInf extends Component {
  constructor(props){
    super(props);
    this.state={
      user:false
    }
  }
  componentWillMount(){
    user=store.getState().user;
  }
  render() {
    return (
      <div className="App">
       <NavBar
            mode="dark"
            // icon={<Icon type="left" />}
            icon={<span >我的</span>}
            onLeftClick={() => console.log('onLeftClick')}
            rightContent={[
              <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
              <Icon key="1" type="ellipsis" />,
            ]}
        ></NavBar>
      { user ?

        <div>
          <div className='header'>
            <div className='onlodeing'>
              <Item
                arrow="horizontal"
                thumb={userlogo}
                multipleLine
                onClick={() => {
                    this.props.history.push('/infitem');
                }}
                >
                我是新用户 <Brief>{user}</Brief>
              </Item>
            </div>
          </div>
          <div className='myinftype'>
            <ul className="mitype">
              <li>
                <div className='fdtype-div'>
                  <span style={{ color: '#108ee9',fontSize:'28px' }}>0.00</span><span className='unit'>元</span>
                  <br/>
                  <span className='moneyType'>钱包</span>
                </div>
              </li>
              <li>
                <div className='fdtype-div'>
                  <span style={{color: 'red' ,fontSize:'28px'}}>0</span><span className='unit'>个</span>
                  <br/>
                  <span className='moneyType'>红包</span>
                </div>
              </li>
              <li>
                <div className='fdtype-div'>
                  <span style={{ color: 'rgb(233, 128, 16)',fontSize:'28px' }}>0</span><span className='unit'>个</span>
                  <br/>
                  <span className='moneyType'>金币</span>
                </div>
              </li>
            </ul>
        </div>
        </div>
        :
        <div>
        <div className='header'>
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
                  <img src={imgURL}  alt="饿呢" /><br/>
                  <span>钱包</span>
                </div>
              </li>
              <li>
                <div className='fdtype-div'>
                  <img src={imgURL}  alt="饿呢" /><br/>
                  <span>红包</span>
                </div>
              </li>
              <li>
                <div className='fdtype-div'>
                  <img src={imgURL}  alt="饿呢" /> <br/>
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
        }
      </div>
    );
  }
}

export default withRouter(MyInf);
