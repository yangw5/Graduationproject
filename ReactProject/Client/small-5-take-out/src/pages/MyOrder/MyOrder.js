import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import './css/myorder.css';
import { Button, WhiteSpace, Tabs,  Badge,Toast ,Modal} from 'antd-mobile';
import store from '../../redux/Redux';
import {Saveordertype,Saveorderdata,Saveshopid,SavenavTab2,Saveorderstate} from '../../redux/Actions';
import M from '../../assets/common';
import lodeing from './img/1.jpg';
import no from './img/no.jpg';

const alert = Modal.alert;

const tabs = [
  { title: <Badge text={''}>已提交</Badge> },
  { title: <Badge text={''}>已接收</Badge> },
  { title: <Badge dot>配送中</Badge> },
  { title: <Badge dot>已完成</Badge> },
  { title: <Badge dot>退单</Badge> },
];

class MyOrder extends Component {
  constructor(props){
    super(props)
    this.state={
      userflog:false,
      orderlist:[]
    }
  }
  componentDidMount(){
    this.initstate(0);
    let  user=store.getState();
    if(user.user){
      this.setState({
        userflog:true
      })
    }
  }
  initstate(type){
    //获取数据
    M.ajax({
      type: 'GET',
      url: '/getorder',
      headers: {
      },
      params: {
        usernumber:store.getState().user,
        state:type
      }
    }).then((value)=>{  
      if (value.status === 200) {
       let data = value.data.data;
       console.log(data)
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
  gotoorderinf(value1,type,state){
        //获取某一项订单数据数据
        store.dispatch(Saveshopid(value1.or_shopid));
        M.ajax({
          type: 'GET',
          url: '/getorderitem',
          headers: {
          },
          params: {
            orderid:value1.or_id
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
              },
              addressid:value1.or_addressid
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
           console.log(orderdata);
           store.dispatch(Saveordertype(type));
          store.dispatch(Saveorderstate(state))
           store.dispatch(Saveorderdata(orderdata));
           //跳转到订单详情，
           this.props.history.push({ pathname:'/neworder',state:{data:orderdata,type:true,state:1} })

          }
        }).catch((error)=>{
          if (error.response && error.response.status === 400) {
            this.msg = `${error.response.data.error}!`;
          }
        });
  
  }
  //是否确认
 showAlert(id,e){
  e.stopPropagation();
    const alertInstance = alert('取消订单', '你是认真的吗???', [
      { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
      { text: '确定', onPress: () => this.addorder(id,e)},
    ]);
    setTimeout(() => {
      // 可以调用close方法以在外部close
      console.log('auto close');
      alertInstance.close();
    }, 500000);
  };


  addorder(id,e){
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
       Toast.loading('取消订单中...', 1, () => {
          this.initstate();
      });
        
  
      }
    }).catch((error)=>{
      if (error.response && error.response.status === 400) {
        this.msg = `${error.response.data.error}!`;
      }
    });
  }
  render() {
    let noorder=  
      <div className='lodeing'>
        <img src={no} alt='' />
        <span className='tips'>暂无订单</span>
      </div>

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
        <div className='orderitem' key={index} onClick={()=>{this.gotoorderinf(value,false,value.or_state)}}>
        <div className='order-title'>
        <span className='order-shopname'>{value.shopname}</span>
        <span className='state'>{a1}</span>
        {
          value.or_state === 0 ? <span className='state state1' onClick={(e)=>{this.showAlert(value.or_id,e)}}>取消订单</span> : ''
        }
        </div>
        <div className='order-inf'>
          <div className='order-shop-img'>
            <img src={'http://localhost:8888/getimg?himg='+value.shopimage} alt='' />
          </div>
          <div className='order-inf-text'>
            <span>下单时间：{value.or_foodtime.split(".")[0].split('T')[0]+' '+value.or_foodtime.split(".")[0].split('T')[1]}</span>
            <span>总价：￥{value.or_allmoney}</span>
          </div>
        </div>
        <div className='order-do'>{
          value.or_state === 3 ?    <Button  inline size="small" style={{ marginRight: '4px' }}    onClick={(e)=>{_this.gotoshop(value,e)}} >评价</Button> : ''
        }
     
        <Button  inline size="small" style={{ marginRight: '4px' }}  onClick={()=>{this.gotoorderinf(value,true,value.or_state)}} >再来一单</Button>
        </div>
      </div>
      )
    },this)

    return (
      <div className="App">
      <div className='title'>我的订单</div>
   
      { 
        this.state.userflog ? 
        <div className='ordertype'>
          <Tabs tabs={tabs}
          initialPage={0|| store.getState().navTab2}
          onChange={(tab, index) => { console.log('onChange', index, tab);
          
        }}
          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); 
          store.dispatch(SavenavTab2(index));
          this.initstate(index)}}
        >
          <div style={{ backgroundColor: '#eee' }}>
           { this.state.orderlist.length>0 ? arrydim : noorder}
          </div>
          <div style={{ backgroundColor: '#eee' }}>
          { this.state.orderlist.length>0 ? arrydim : noorder}
          </div>
          <div style={{ backgroundColor: '#fff' }}>
          { this.state.orderlist.length>0 ? arrydim : noorder}
          </div>
          <div style={{ backgroundColor: '#eee' }}>
          { this.state.orderlist.length>0 ? arrydim : noorder}
          </div>
          <div style={{ backgroundColor: '#eee' }}>
             { this.state.orderlist.length>0 ? arrydim : noorder}
          </div>
        </Tabs>
        <WhiteSpace />
      </div>
        
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
