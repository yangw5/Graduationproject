import React,{Component} from 'react';
import { NavBar, Icon,SearchBar } from 'antd-mobile';
import M from '../../assets/common.js';

import xx from './xx.png'
import './css/Search.css'

class Search extends  Component {
  constructor(props){
    super(props);
    this.state={
      text:'',
      shoplist:[],
      type:'',
      shoptype:[
        '美食','水果','饮品甜品','午餐','速食简餐',
        '汉堡披萨','米线面馆','鸭脖卤味','炸鸡炸串','包子粥店'
      ],
    }
  }
  componentDidMount(){

    let index=this.props.match.params.id;
    this.setState({
      type:index
    })
    this.init(index)
    this.autoFocusInst.focus();

  }
  init(val){
    M.ajax({
      type: 'POST',
      url: '/searchshop',
          headers: {
          },
          data: {
            nametext:this.state.text,
            type:val,
            state:0
          }
        }).then((value)=>{
          if (value.status === 200) {
            let data = value.data;
            this.setState({
              shoplist:data.data
            })
            console.log(data.data);
          }
        }).catch((error)=>{
          if (error.response && error.response.status == 400) {
            this.msg = `${error.response.data.error}!`;
          }
    });
    
  }
  searchshop(value){
    console.log(value)
    this.setState({
      text:value
    })
    if(value ===''.trim()){
      this.setState({
        shoplist:[]
      })
    }else{
      //查询数据
    M.ajax({
      type: 'POST',
      url: '/searchshop',
          headers: {
          },
          data: {
            nametext:value,
            type:this.state.type,
            state:0
          }
        }).then((value)=>{
          if (value.status === 200) {
            let data = value.data;
            this.setState({
              shoplist:data.data
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
    let shopitem=[];
    this.state.shoplist.map(function(value,key){
      return shopitem.push(
        <div className='sshop-item' key={key} 
        onClick={()=>{
          _this.props.history.push('/shops');
        }}
        >
          <div className='sshop-item-heard'>
            <div className='sshop-item-img'>
              <img  src={'http://localhost:8888/getimg?himg='+value.shopimage} alt='' />
            </div>
            <div className='sshop-item-inf'>
              <div className='sinf-title'>{value.shopname}</div>
              <div className='sinf-number'>
                <div className='sinf-number-v1'>
                  <img  src={xx} alt='' /><span className='px'> 4.6</span>
                  <span>月售2012</span>
                </div>
                <div className='sinf-number-v2'> 
                  <span className='sv2-sp1'>准时送达</span>
                  <span className='sv2-sp2'>蜂鸟专送</span>
                </div>
              </div>
              <div className='sinf-money'>
                <div className='sinf-money-v1'>
                  <span>起送￥15 </span>
                  <span>夜间配送￥2</span>
               </div>
                <div className='sinf-money-v2'> 
                  <span>25分钟 </span>
                  <span>464m</span>
                </div>
              </div>
            </div>
          </div>
          <div className='sshop-item-yh'>
            <div className='syh-title'>'外卖套餐特别优惠'</div>
            <div className='syh-inf'>
              <span> 首单减16</span>
              <span> 8减6</span>
              <span> 20减9</span>
              <span> 30减16</span>
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
          >{this.state.shoptype[this.state.type]}</NavBar>
           <SearchBar placeholder="输入查询店铺111" value={this.state.text}   ref={ref => this.autoFocusInst = ref} onChange={(value)=>{
             this.searchshop(value)
           }} maxLength={8} />
          <div>
            {shopitem}
          </div>

      </div>
    )
  }
}
export default Search;