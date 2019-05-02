import React, { Component } from 'react';
import { NavBar, Icon,List, Switch ,Picker,InputItem, WhiteSpace, Badge } from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import M from '../../assets/common'

import store from '../../redux/Redux';
import {Saveordertype,Saveorderdata} from '../../redux/Actions';
import './css/NewOrder.css'
let user=store.getState().user;
const seasons = [
  [
    {
      label: '无需餐具',
      value: '无需餐具',
    },
    {
      label: '1份',
      value: '1份',
    },   {
      label: '2份',
      value: '2份',
    },   {
      label: '3份',
      value: '3份',
    },   {
      label: '4份',
      value: '4份',
    },   {
      label: '5份',
      value: '5份',
    },
    {
      label: '5份以上',
      value: '5份以上',
    },
  ],
];



class NewOrder extends Component {
  constructor(props,context) {
    super(props,context);
    this.state = {
      checked: false,
      ordertype:'',
      address:'',
      foodlist:[],
      allmoney:0,
      user:''
    };
  }
  componentDidMount(){
    user=store.getState().user;
    let a=store.getState().ordertype;
    let b=store.getState().orderdata;
    this.getaddesss();
    //获取路由数据
    let money=0;
    console.log(b)
    b.forEach(function(value,i){
      money+=value.number*value.value.money;
    })

    this.setState({
      ordertype:a,
      foodlist:b,
      allmoney:money
    })

  }
  //获取地址
  getaddesss(){
    let that=this;
    //获取数据
    M.ajax({
      type: 'GET',
      url: '/userinf',
      headers: {
      },
      params: {
        phone:user
      }
    }).then((value)=>{  
      if (value.status === 200) {
       let data = value.data.data;
       //获取送货地址
       that.setState({
         id:data.ad_id,
         name:data.ad_name,
         sex:data.ad_sex,
         phone:data.ad_phone,
         address:data.ad_address,
         street:data.ad_street,
       })
      }
    }).catch((error)=>{
      if (error.response && error.response.status === 400) {
        this.msg = `${error.response.data.error}!`;
      }
    });
  }// 第一个参数为日期，第二个参数为年月日分割格式 '/'或'-'
format(Date,str){
  let supplement=this.supplement;
  var obj = {
      Y: Date.getFullYear(),
      M: Date.getMonth() + 1,
      D: Date.getDate(),
      H: Date.getHours(),
      Mi: Date.getMinutes(),
      S: Date.getSeconds()
  }
  // 拼接时间 hh:mm:ss
  var time = ' ' +supplement(obj.H) + ':' + supplement(obj.Mi) + ':' + supplement(obj.S);
  // yyyy-mm-dd
  if(str.indexOf('-') > -1){
      return obj.Y + '-' + supplement(obj.M) + '-' + supplement(obj.D) + time;
  }
  // yyyy/mm/dd
  if(str.indexOf('/') > -1){
      return obj.Y + '/' + supplement(obj.M) + '/' + supplement(obj.D) + time;
  }
}
      
// 位数不足两位补全0
supplement(nn){
    return nn = nn < 10 ? '0' + nn : nn;
}

  orderpost(){
    // 菜品号  用户编号  地址编号  订单状态  事件  数量 

    //添加用户id 
    //reactx里获取用户
    //子组件获取food信息
    //获取 地址id
    //获取时间
    var todaydate = new Date();
    var end_time = this.format(todaydate,'-');
    console.log(end_time)
    let psotdata={
      userid:'15208192473',
      foodvalue:this.state.foodlist,
      addressid:this.state.id,
      addtime:end_time,
      state:0,
      shopid:'7',
      allmoney:this.state.allmoney
    }
    console.log(this.state.foodlist);
    M.ajax({
      type: 'POST',
      url: '/payfor',
      headers: {
      },
      data: {
        data:psotdata
      }
    }).then((value)=>{  
      if (value.status === 200) {
       let data = value.data.data;
        window.location = data;
      }
    }).catch((error)=>{
      if (error.response && error.response.status === 400) {
        this.msg = `${error.response.data.error}!`;
      }
    });
  }
  render() {
    let _this=this;
    return (
      <div className="moder">
        <div>
          <NavBar
            mode="light"
            icon={<Icon type="left" />}
            onLeftClick={() =>this.props.history.go(-1)}
          ></NavBar>
        </div>
        <div >
          <div>
            <List.Item
            extra={<Switch
              platform="ios"
              checked={this.state.checked}
              onChange={() => {
                this.setState({
                  checked: !this.state.checked,
                });
              }}
            />}
          >外卖配送</List.Item>
          </div>
          <div className='address' onClick={()=>{
            store.dispatch(Saveordertype(this.state.ordertype));
            this.props.history.push('/itemaddress');
          }} >
              <div className='address-inf1'>{this.state.street}</div>
              <div className='address-inf2'>{this.state.name} {this.state.sex ? '(先生)':'(女士)'} {this.state.phone}</div>
          </div>
          
        </div>
        <div className='foodmodr' >
          <ul>
            <li className='shopname'>华莱士</li>
            {
              _this.state.foodlist.map(function(value,index){
             
                return(
                  <li key={index}>
                    <div className='foodlist'>
                      <span className='item-inf1'>
                      <img src={'http://localhost:8888/getimg?himg='+value.value.foodimg} alt='' />
                      </span>
                      <span className='item-inf2'>{value.value.foodname}</span>
                      <span className='item-inf3'></span>
                      <span className='item-inf4'>{"*"+ value.number}</span>
                      <span className='item-inf4'>{"￥"+value.value.money*value.number}</span>
                    </div>
                  </li>

                )
              })
   
            }
          </ul>
         
        </div>
        <div className='foodaddinf'>
        <div onClick={()=>{
            this.props.history.push('/remarks')
          }}>
          <Picker
            value={this.state.colorValue}
            extra="口味 偏好"
            disabled
          >
          <List.Item arrow="horizontal">订单备注</List.Item>
          </Picker>

        </div>
  
        <Picker
          data={seasons}
          title="餐具份数"
          cascade={false}
          extra="未选择"
          value={this.state.sValue}
          onChange={v => this.setState({ sValue: v })}
          onOk={v => this.setState({ sValue: v })}
        >
          <List.Item arrow="horizontal">餐具份数</List.Item>
        </Picker>
        <InputItem
            placeholder="该店不支持线上开票，请电话联系商户"
            data-seed="logId"
          >发票信息</InputItem>
        
        </div>
        <div className='addorder' >
            <div className={ this.state.ordertype ? 'allmoney' : 'allmoney1'}>
              <span>{"￥" +this.state.allmoney }</span>
            </div>
            {
               this.state.ordertype ? <div className='orderpost'  onClick={()=>{this.orderpost()}}>提交</div> :''
            }
            
        </div>

      </div>
    );
  }
}

export default withRouter(NewOrder);