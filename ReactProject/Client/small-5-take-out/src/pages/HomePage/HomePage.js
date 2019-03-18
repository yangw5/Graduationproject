import React, { Component } from 'react';
import { withRouter,Link } from 'react-router-dom';
import HomeHeard from './HomeHeard';
import { SearchBar,Tag,Accordion, List} from 'antd-mobile';
import './css/HomePage.css';


import imgURL from './images/fenxiang.png';
import lodeing from './images/1.jpg';





class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {

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
          <div className='list-reading'>
            <div className='reading-img'>
              <img src={lodeing}  alt=''/>
            </div>
          </div>
          <div></div>


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
