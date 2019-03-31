import React,{Component} from  'react';
import { Tag } from 'antd-mobile';
import './css/Comments.css'
import add from './images/add.png'
import food from './images/food.jpg'

class   Comments extends Component{
  constructor(props){
    super(props);
    this.state={

    }

  }
  onChange=()=>{
    console.log(`tag selected:`);
  }
  render(){
    return (
    <div className='pl'>
      <div className='pl-title'>
        <div className='pl-title-zh'>
          <div className='pl-title-fs'>3.9</div>
          <div className='pl-title-xx'>商家评分</div>
          {/* <div>星星</div> */}
        </div>
        <div className='pl-title-wd'>
          <div>味道</div>
          <div>3.8</div>
        </div>
        <div className='pl-title-bz'>
          <div>包装</div>
          <div>4.2</div>
        </div>
        <div className='pl-title-ps'> 
          <div>配送</div>
          <div>4.8</div>
        </div>
      </div>

      <div>
        <div className="tag-container">
          <Tag data-seed="logId">全部</Tag>
          <Tag selected>最新</Tag>
          <Tag disabled>好评</Tag>
          <Tag onChange={this.onChange}>差评</Tag>
          <Tag disabled>图片</Tag>
        </div>
      </div>
      <div className='pl-containner'>
        <div className='pl-item'>
        <div className='pl-item-user'>
          <div className='item-user-img'><img src={add} alt='' /></div>
          <div className='item-user-inf'>
            <span>用户</span>
            <span>星星</span>
          </div>
        </div>
        <div className='pl-text'>
          <div className='pl-text1'>
            <div className='pl-text-text'>评论内容</div>
            <div className='pl-text-img'>
              <img src={food}  alt='' />
            </div>
          </div>
        </div>
        <div className='shop-qus'>
          <div className='shop-qus1'>
            回复:谢谢
          </div>
        </div>
        </div>
      </div>
    </div>
    )
  }
}
export default Comments;