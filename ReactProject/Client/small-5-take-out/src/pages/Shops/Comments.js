import React,{Component} from  'react';
import { Tag } from 'antd-mobile';
import './css/Comments.css'
import add from './images/add.png'
import food from './images/food.jpg'
import M from '../../assets/common'

class   Comments extends Component{
  constructor(props){
    super(props);
    this.state={
      evlist:[]

    }

  }
  componentDidMount(){
    this.getinit()

  }
  getinit(){
    M.ajax({
      type: 'GET',
      url: '/getevaluate',
      headers: {
      },
      params: {
        shopid:this.props.postshopid
      }
    }).then((value)=>{
      if (value.status === 200) {
        let data = value.data.data;
        console.log(data);
        this.setState({
          evlist:data
        })
      }
    }).catch((error)=>{
      if (error.response && error.response.status == 400) {
        this.msg = `${error.response.data.error}!`;
      }
  })
  }
  onChange=()=>{
    console.log(`tag selected:`);
  }
  render(){
    return (
      <div>
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
                {
                this.state.evlist.map(function(item,index){
                  return (
                  <div className='pl-item' key={index}>
                  <div className='pl-item-user'>
                    <div className='item-user-img'><img src={'http://localhost:8888/getimg?himg='+item.himg } alt='' /></div>
                    <div className='item-user-inf'>
                      <span>{item.name}</span>
                      {/* <span>星星</span> */}
                      
                    </div>
                  </div>
                  <div className='pl-text'>
                    <div className='pl-text1'>
                      <div className='pl-text-text'>{item.ev_inf}</div>
                      <div className='pl-text-img'>
                        <img src={'http://localhost:8888/getimg?himg='+item.ev_img}  alt='' />
                      </div>
                      <span className='evtime'>{item.ev_time}</span>
                    </div>
                    
                  </div>
                  <div className='shop-qus'>
                    <div className='shop-qus1'>
                      {/* 回复:谢谢 */}
                    </div>
                  </div>
                  </div>
            )
          })
        }
        </div>
  
        </div>
    </div>
    )
  }
}
export default Comments;