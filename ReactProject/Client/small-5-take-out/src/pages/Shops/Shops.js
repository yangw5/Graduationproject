import React,{Component} from  'react';
import { NavBar, Icon,Tabs, WhiteSpace, Badge } from 'antd-mobile';
import './css/shops.css';

import Business from './Business';
import Foods from './Foods';
import Comments from './Comments';

import car from './images/car.png';


const tabs = [
  { title: <Badge >点餐</Badge> },
  { title: <Badge >评论</Badge> },
  { title: <Badge >商家</Badge> },
];
class Shops extends Component{
  constructor(props){
    super(props);
    this.state={

    }

  }
  render(){
    return (
    <div>
      <NavBar
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() =>this.props.history.go(-1)}
        rightContent={[
          <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
          <Icon key="1" type="ellipsis" />,
        ]}
      >华莱士（西华大学店）</NavBar>
      <div className='shops-heard'>
        <div className='shops-title'>
          <p>
            华莱士
          </p>
        </div>
        <div className='shops-inf'>
          <span>评价</span>
          <span>月售</span>
          <span>蜂鸟快送约23分钟</span>
        </div>
        <div className='shops-discount'>
          <span>共￥6 </span>
          <span>店铺</span>
          <span>领取</span>
        </div>
        <div className='shops-reduce'>
          <span style={{color:'red',backgroundColor:'#f0c1c1'}}>减满</span>
          <span>满25减2</span>
          <span>满25减2</span>
          <span>满25减2</span>
          <span style={{color:'rgb(179, 151, 151)',fontSize:'6px'}}>6个优惠</span>
        </div>    
      </div>
      <div className='shops-sel' >
      <Tabs tabs={tabs}
        initialPage={0}
        onChange={(tab, index) => { console.log('onChange', index, tab); }}
        onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
      >
        <div style={{ height: '370px', backgroundColor: '#fff' }}> 
          <Foods />
        </div>
        <div style={{  height: '420px', backgroundColor: '#fff' }}>
          <Comments />
        </div>
        {/* display: 'flex', alignItems: 'center', justifyContent: 'center', */}
        <div style={{  height: '420px', backgroundColor: '#fff' }}>
          <Business />
        </div>
      </Tabs>
      <WhiteSpace />
      </div>
      <div className='shop-cart'>
      <div className='cart-yh'>还差好多元 去凑单 ></div>
      <div className='cart-inf'>
        <div className='shop-money'>
          <div className='shop-inf-number'>
              <img src={car} alt='' />
          </div>
          <div className='shop-inf-money'>
            <span>￥37.9 </span>
            <span style={{ color:'#b7abab',fontSize:'12px'}}>另需配送费7.5元/可自取</span>
          </div>
        </div>
        <div className='shop-end'>
          去结算
        </div>
      </div>
     </div>
    </div>
    )
  }
}

export default Shops;