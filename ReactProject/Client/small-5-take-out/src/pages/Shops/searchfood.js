import React,{Component} from 'react';
import { NavBar, Icon,SearchBar,Tag } from 'antd-mobile';
import M from '../../assets/common.js';
import store from '../../redux/Redux';

import './css/searchfood.css'
import add from './images/add.png'
import reduce from './images/reduce.png'

class Search extends  Component {
  constructor(props){
    super(props);
    this.state={
      text:'',
      foodlist:[]
    }
  }
  componentDidMount(){
    this.autoFocusInst.focus();

  }
  searchshop(value){
    console.log(value)
    this.setState({
      text:value
    })
    if(value ===''.trim()){
      this.setState({
        foodlist:[]
      })
    }else{
      //查询数据
    M.ajax({
      type: 'POST',
      url: '/searchfood',
          headers: {
          },
          data: {
            nametext:value,
            shopid:store.getState().shopid,
            
          }
        }).then((value)=>{
          if (value.status === 200) {
            let data = value.data;
            this.setState({
              foodlist:data.data
            })
            console.log(data.data);
          }
        }).catch((error)=>{
          if (error.response && error.response.status == 400) {
            this.msg = `${error.response.data.error}!`;
          }
    });
    }
    
  }
  render(){
    let _this=this;
    let fooditem=[];
    this.state.foodlist.map(function(item,key){
      return fooditem.push(
        <div className='sshop-item' key={key} 
        onClick={()=>{
          _this.props.history.push('/shops');
        }}
        >
                <div className='food-img'>
                  <img src={'http://localhost:8888/getimg?himg='+item.foodimg} alt=''   />
                </div>
                <div className='food-inf'>
                  <p className='food-name'>{item.foodname}</p>
                  <span className='food-material'>{item.material}</span>
                  <span className='food-evaluate'>月售174，好评率90%</span>
                  <span className='food-discount'>9折 每单限1份优惠</span>
                  <div className='AA'>
                    <span className='food-price'>{item.money}</span>
                    
                    <img className='add' src={add} alt='' onClick={(e)=>{_this.addShoppingCart(item,e)}}/>
                   {
                     item.sl === 0 ? '' :  <div className='BB'>
                     <span className='sl'> {item.sl} </span> 
                     <img className='delete' src={reduce} alt='' onClick={(e)=>{_this.deleteShoppingCart(item,e)}}/>
                     </div>
                   }
                   
                  </div>
                </div>       
        </div>
      )
    })
    return(
      <div>
          <NavBar
            mode="light"
            icon={<Icon type="left" />}
            onLeftClick={() => {
              this.props.history.go(-1);
            }}
            rightContent={[
              <Icon key="1" type="ellipsis" />,
            ]}
          >饿了呀</NavBar>
           <SearchBar placeholder="请输入商品" value={this.state.text}   ref={ref => this.autoFocusInst = ref} onChange={(value)=>{
             this.searchshop(value)
           }} maxLength={8} />
          <div>
            { !this.state.foodlist.length > 0 ? 
            <div> 
              <div className='foodtj'>热门商品 </div>
                <div className="tag-container">
                  <Tag data-seed="logId">鱼香肉丝</Tag>
                  <Tag selected>鱼香肉丝</Tag>
                  <Tag disabled>鱼香肉丝</Tag>
                  {/* <Tag onChange={onChange}>Callback</Tag> */}
                  <Tag closable
                    onClose={() => {
                      console.log('onClose');
                    }}
                    afterClose={() => {
                      console.log('afterClose');
                    }}
                  >
                  鱼香肉丝
                  </Tag>
                </div>
            <div> 
            </div>
            </div> 
            
            
            : fooditem
            }
          </div>

      </div>
    )
  }
}
export default Search;