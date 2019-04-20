import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import './css/myorder.css';
import { Button, WhiteSpace, WingBlank } from 'antd-mobile';
import store from '../../redux/Redux';
import M from '../../assets/common';
import lodeing from './img/1.jpg';

class MyOrder extends Component {
  constructor(props){
    super(props)
    this.state={
      userflog:false,
      orderlist:[]
    }
  }
  componentDidMount(){
    this.initstate();
    let  user=store.getState();
    if(user.user){
      this.setState({
        userflog:true
      })
    }
  }
  initstate(){
    //获取数据
    M.ajax({
      type: 'GET',
      url: '/getorder',
      headers: {
      },
      params: {
        usernumber:'15208192473'
      }
    }).then((value)=>{  
      if (value.status === 200) {
       let data = value.data.data;
       this.setState({
         orderlist:data
       })
  
      }
    }).catch((error)=>{
      if (error.response && error.response.status === 400) {
        this.msg = `${error.response.data.error}!`;
      }
    });
  }
  gotoshop(value,e){
    e.stopPropagation();
    console.log(value);
    this.props.history.push({ pathname:'/evaluate',state:{orderid:value.or_id,shopid:value.or_shopid} })
    // this.props.history.push('/evaluate');
  }
  gotoorderinf(value,type){
        //获取某一项订单数据数据
        M.ajax({
          type: 'GET',
          url: '/getorderitem',
          headers: {
          },
          params: {
            orderid:value.or_id
          }
        }).then((value)=>{  
          if (value.status === 200) {
           let data = value.data.data;
           console.log(data);
           let orderdata=[];   
           for(let i=0;i<data.length;i++){
            let obj={
              number:data[i].dri_number,
              value:{
                fooddescribe: data[i].fooddescribe,
                foodimg: data[i].foodimg,
                foodname: data[i].foodname,
                foodnumber: null,
                foodtype: data[i].foodtype,
                id: data[i].dri_foodid,
                material: data[i].material,
                money: data[i].money,
                shopid: data[i].shopid,
                sl: data[i].dri_number
              }
            };
            orderdata.push(obj);
           }
          //  number: 1
          //  value:
          //  fooddescribe: "好吃不上火"
          //  foodimg: "./imgs/shops/1554881512882.png"
          //  foodname: "土豆里"
          //  foodnumber: null
          //  foodtype: "素菜"
          //  id: 1
          //  material: "1"
          //  money: 12
          //  shopid: 7
          //  sl: 1
           console.log(777777777);
           console.log(orderdata);
           if(type){
            this.props.history.push({ pathname:'/neworder',state:{data:orderdata,type:true} })
           }else{
            this.props.history.push({ pathname:'/neworder',state:{data:orderdata,type:false} })
           }

          }
        }).catch((error)=>{
          if (error.response && error.response.status === 400) {
            this.msg = `${error.response.data.error}!`;
          }
        });
  
  }
  addorder(id,e){
    e.stopPropagation();
    M.ajax({
      type: 'POST',
      url: '/uploadeorder',
      headers: {
      },
      data: {
        state:4,
        id:id
      }
    }).then((value)=>{  
      if (value.status === 200) {
       let data = value.data.data;
        alert('已取消订单')
        this.initstate();
  
      }
    }).catch((error)=>{
      if (error.response && error.response.status === 400) {
        this.msg = `${error.response.data.error}!`;
      }
    });
  }
  render() {
    let _this=this;
    let arrydim=[];
    this.state.orderlist.map(function(value,index){
      let a1='';
      switch(value.or_state){
        case 0:
          a1='已提交';
          break;
        case 1:
          a1='已接单';
          break;
        case 2:
          a1='派送中';
          break;
        case 3:
          a1='已完成';
          break;
        case 4:
          a1='已退单';
          break;
        default :
          a1='无所谓';
          break;
        
      }
      return  arrydim.push(
        <div className='orderitem' key={index} onClick={()=>{this.gotoorderinf(value,false)}}>
        <div className='order-title'>
        <span className='order-shopname'>{value.shopname}</span>
        <span className='state'>{a1}</span>
        {
          value.or_state === 0 ? <span className='state state1' onClick={(e)=>{this.addorder(value.or_id,e)}}>取消订单</span> : ''
        }
        </div>
        <div className='order-inf'>
          <div className='order-shop-img'>
            <img src={lodeing} alt='' />
          </div>
          <div className='order-inf-text'>
            <span>下单时间：{value.or_foodtime}</span>
            <span>总价：￥{value.or_allmoney}</span>
          </div>
        </div>
        <div className='order-do'>
        <Button  inline size="small" style={{ marginRight: '4px' }}    onClick={(e)=>{_this.gotoshop(value,e)}} >评价</Button>
        <Button  inline size="small" style={{ marginRight: '4px' }}  onClick={()=>{this.gotoorderinf(value,true)}} >再来一单</Button>
        </div>
      </div>
      )
    },this)

    return (
      <div className="App">
      <div className='title'>我的订单</div>
      { 
        this.state.userflog ? 
        arrydim
        :
        <div className='lodeing'>
          <img src={lodeing} alt='' />
          <span className='tips'>登录后查看外卖订单</span>
          <Button type="primary" onClick={()=>{  this.props.history.push('/login'); }}>立即登录</Button><WhiteSpace />
        </div>
      }
      </div>
       
    );
  }
}

export default withRouter(MyOrder);
