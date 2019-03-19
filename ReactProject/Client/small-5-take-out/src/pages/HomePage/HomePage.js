import React, { Component } from 'react';
import { withRouter,Link } from 'react-router-dom';
import HomeHeard from './HomeHeard';
import { SearchBar,Tag,Accordion, List} from 'antd-mobile';
import './css/HomePage.css';
import store from '../../redux/Redux';


import imgURL from './images/fenxiang.png';
import imgURL1 from './images/shop.jpg';
import lodeing from './images/1.jpg';





class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:true
    };
  }
  goto=()=>{
    alert("走你。。。");
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
    if(user.user){
      alert("欢迎你"+user.user);
    }
    else{
      alert('请登录');
    }
    
  }
  render() {
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
            <li>
              <div className='fdtype-div' onClick={this.foodinf}>
              <img src={imgURL}  alt="饿呢" />
              <span>炸鸡</span>
              </div>
            </li>
            <li>
              <div className='fdtype-div'>
              <img src={imgURL}  alt="饿呢" />
              <span>炸鸡</span>
              </div>
            </li>
            <li>
              <div className='fdtype-div'>
              <img src={imgURL}  alt="饿呢" />
              <span>炸鸡</span>
              </div>
            </li>
            <li>
              <div className='fdtype-div'>
              <img src={imgURL}  alt="饿呢" />
              <span>炸鸡</span>
              </div>
            </li>
            <li>
              <div className='fdtype-div'>
              <img src={imgURL}  alt="饿呢" />
              <span>炸鸡</span>
              </div>
            </li>
            <li>
              <div className='fdtype-div'>
              <img src={imgURL}  alt="饿呢" />
              <span>炸鸡</span>
              </div>
            </li>
            <li>
              <div className='fdtype-div'>
              <img src={imgURL}  alt="饿呢" />
              <span>炸鸡</span>
              </div>
            </li>
            <li>
              <div className='fdtype-div'>
              <img src={imgURL}  alt="饿呢" />
              <span>炸鸡</span>
              </div>
            </li>
            <li>
              <div className='fdtype-div'>
              <img src={imgURL}  alt="饿呢" />
              <span>炸鸡</span>
              </div>
            </li>
            <li>
              <div className='fdtype-div'>
              <img src={imgURL}  alt="饿呢" />
              <span>炸鸡</span>
              </div>
            </li>
          </ul>
        </div>
        <div className='shop-list'>
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
              <div className='shop-item'>
                <div className='shop-item-heard'>
                  <div className='shop-item-img'>
                    <img src={imgURL1} alt='' />
                  </div>
                  <div className='shop-item-inf'>
                    <div className='inf-title'>华莱士（西华大学店）</div>
                    <div className='inf-number'>
                      <div className='inf-number-v1'>4.6 月售2012</div>
                      <div className='inf-number-v2'>准时送达 蜂鸟专送</div>
                    </div>
                    <div className='inf-money'>
                      <div className='inf-money-v1'>起送￥15 夜间配送￥2</div>
                      <div className='inf-money-v2'>25分钟 464m</div>
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
