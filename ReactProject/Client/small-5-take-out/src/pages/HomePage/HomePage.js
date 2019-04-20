import React, { Component } from 'react';
import { withRouter, } from 'react-router-dom';
import HomeHeard from './HomeHeard';
import { SearchBar,Tag,Accordion, List,Toast, WhiteSpace, WingBlank, Button} from 'antd-mobile';
import './css/HomePage.css';
import store from '../../redux/Redux';

import M from '../../assets/common.js';


import imgURL from './images/fenxiang.png';
import imgURL1 from './images/shop.jpg';
import lodeing from './images/1.jpg';
import xx from './images/xx.png'


class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:true,
      type:[
        '炸鸡','炸鸡','炸鸡','炸鸡','炸鸡',
        '炸鸡','炸鸡','炸鸡','炸鸡','炸鸡'
      ],
      data:[]
    };
  }
  componentDidMount(){
    //获取shop数据
    M.ajax({
      type: 'GET',
      url: '/getallshop',
          headers: {
          },
          data: {
          }
        }).then((value)=>{
          if (value.status === 200) {
            let sdata = value.data;
           this.setState({
             data:sdata.data
           })

           console.log(this.state);
           console.log(this.state.data[0].shopimage)
          }
        }).catch((error)=>{
          if (error.response && error.response.status == 400) {
            this.msg = `${error.response.data.error}!`;
          }
    });
  }
  //轻提示
  showToast(value) {
    Toast.info(value, 1);
  }
  //查询店铺
  goto=()=>{
     this.props.history.push('/search');
  }
  onChange = (selected) =>{
    console.log(`tag selected: ${selected}`);
  }
  onChange1 = (key) => {
    console.log(key);
  }
  foodinf=() =>{
    
    var user=store.getState();
    // M.ajax({
    //   type: 'GET',
    //   url: '/start',
    //       headers: {
    //       },
    //       params: {
    //         name:123123
    //       }
    //     }).then((value)=>{
    //       if (value.status === 0) {
    //         this.data = value.data;
    //         console.log(this.data);
    //       }
    //     }).catch((error)=>{
    //       if (error.response && error.response.status == 400) {
    //         this.msg = `${error.response.data.error}!`;
    //       }
    // });

    // M.ajax({
    //   type: 'POST',
    //   url: '/upload',
    //       headers: {
    //       },
    //       data: {
    //         name:"123123"
    //       }
    //     }).then((value)=>{
    //       if (value.status === 0) {
    //         this.data = value.data;
    //         console.log(this.data);
    //       }
    //     }).catch((error)=>{
    //       if (error.response && error.response.status == 400) {
    //         this.msg = `${error.response.data.error}!`;
    //       }
    // });

    if(user.user){
      alert("欢迎你"+user.user);
    }
    else{
      this.showToast('你尚未登录，请登录')
    }
    
  }
  //进入具体的商店
  gotoshop(id){
    // this.props.history.push('/shops');
    this.props.history.push({ pathname:'/shops',state:{shopid: id}});
  }
  render() {
    let _this=this;
    let shopitem=[];
    let shoptype=[];

    this.state.type.map(function(item,key){
      return shoptype.push(
        <li key={key}>
          <div className='fdtype-div' onClick={_this.foodinf}>
            <img src={imgURL}  alt="饿呢" />
            <span>{ item }</span>
          </div>
      </li>
      )
    })


    this.state.data.map(function(value,key){
      return shopitem.push(
        <div className='shop-item' key={key} 
        onClick={()=>{_this.gotoshop(value.id)}}
        >
          <div className='shop-item-heard'>
            <div className='shop-item-img'>
              <img  src={'http://localhost:8888/getimg?himg='+value.shopimage} alt='' />
            </div>
            <div className='shop-item-inf'>
              <div className='inf-title'>{value.shopname}</div>
              <div className='inf-number'>
                <div className='inf-number-v1'>
                  <img  src={xx} alt='' /><span className='px'> 4.6</span>
                  <span>月售2012</span>
                </div>
                <div className='inf-number-v2'> 
                  <span className='v2-sp1'>准时送达</span>
                  <span className='v2-sp2'>蜂鸟专送</span>
                </div>
              </div>
              <div className='inf-money'>
                <div className='inf-money-v1'>
                  <span>起送￥15 </span>
                  <span>夜间配送￥2</span>
               </div>
                <div className='inf-money-v2'> 
                  <span>25分钟 </span>
                  <span>464m</span>
                </div>
              </div>
            </div>
          </div>
          <div className='shop-item-yh'>
            <div className='yh-title'>'外卖套餐特别优惠'</div>
            <div className='yh-inf'>
              <span> 首单减16</span>
              <span> 8减6</span>
              <span> 20减9</span>
              <span> 30减16</span>
            </div>
          </div>
        </div>
      )
    })
    return (
      <div className="home-body">
        <div className="hompheard">
          <HomeHeard />
        </div>
      <div className="home-container">
        <div className="home-search">
          <SearchBar placeholder="星选好点8元红包" onFocus={this.goto} maxLength={8} />
        </div>
        <div>
          <ul className="fdtype">
           {shoptype}
          </ul>
        </div>
        <div className='shop-list'>
        <p style={{float:'left',fontSize:'21px',marginTop:'20px',marginLeft:'10px',fontWeight:'800'}}>推荐商家</p>
          <div className=' shop-title'>
            <div className='title-search shop-title-item'>
              <Accordion accordion openAnimation={{}} className="my-accordion" onChange={this.onChange1}>
                <Accordion.Panel header="综合">
                  <List className="my-list">
                    <List.Item >综合排序</List.Item>
                    <List.Item>好评优先</List.Item>
                    <List.Item>起送价最低</List.Item>
                  </List>
                </Accordion.Panel>
              </Accordion>
            </div>
            <div className='shop-title-item '>距离</div>
            <div className='shop-title-item '>销量</div>
            <div className='shop-title-item shop-title-item-l'>筛选</div>

          </div>
          <div className="tag-container">
            <Tag data-seed="logId">首单立减</Tag>
            <Tag >减满优惠</Tag>
            <Tag onChange={this.onChange}>品质联盟</Tag>
            {/* <Tag closable
              onClose={() => {
                console.log('onClose');
              }}
              afterClose={() => {
                console.log('afterClose');
              }}
            >
              品质联盟
            </Tag>           */}
             <Tag onChange={this.onChange}>新店</Tag>
          </div>
          { this.state.user ?
            <div className='shop-list'>
            {shopitem}
              <div className='shop-item'>
                <div className='shop-item-heard'>
                  <div className='shop-item-img'>
                    <img src={imgURL1} alt='' />
                  </div>
                  <div className='shop-item-inf'>
                    <div className='inf-title'>华莱士（西华大学店）</div>
                    <div className='inf-number'>
                      <div className='inf-number-v1'>
                        <img  src={xx} alt='' /><span className='px'> 4.6</span>
                        <span>月售2012</span>
                      </div>
                      <div className='inf-number-v2'> 
                        <span className='v2-sp1'>准时送达</span>
                        <span className='v2-sp2'>蜂鸟专送</span>
                      </div>
                    </div>
                    <div className='inf-money'>
                      <div className='inf-money-v1'>
                        <span>起送￥15 </span>
                        <span>夜间配送￥2</span>
                     </div>
                      <div className='inf-money-v2'> 
                        <span>25分钟 </span>
                        <span>464m</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='shop-item-yh'>
                  <div className='yh-title'>'外卖套餐特别优惠'</div>
                  <div className='yh-inf'>
                    <span> 首单减16</span>
                    <span> 8减6</span>
                    <span> 20减9</span>
                    <span> 30减16</span>
                  </div>
                </div>
              </div>
            </div>
            :
            <div className='list-reading' >
              <div className='reading-img'>
                <img src={lodeing}  alt=''/>
              </div>
            </div>
          }
          
        </div>
       </div>
       <br/>    
       {/* <a href='#/myinf'>a 跳转 去我的</a>
       <br/>
       <Link to="/myinf" replace>link 跳转 去我的</Link>  
       <br/>
       <Button onClick={this.goto}>函数跳转到 我的</Button> */}

      </div>
    );
  }
}

export default withRouter(HomePage);
