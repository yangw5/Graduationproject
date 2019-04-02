import React,{Component} from 'react'
import { NavBar, Icon ,InputItem,ActionSheet, WingBlank, WhiteSpace, Button, Toast,List} from 'antd-mobile';
import '../css/itemphone.css'

import M from '../../../assets/common';

import { Saveuser } from '../../../redux/Actions';
import store from '../../../redux/Redux';


const Item = List.Item;

const Brief = Item.Brief;


class ItemPhone extends Component{
  constructor(props){
    super(props)
    this.state={
      value: '',
      hasError: true,
      flag:true,
      value1:'获取验证码',
      number:60
    }
  }
  //输入手机号变化
  onChange = (value) => {
    if (value.replace(/\s/g, '').length < 11) {
      this.setState({
        hasError: true,
      });
    } else {
      this.setState({
        hasError: false,
      });
    }
    this.setState({
      value,
    });
  }
  //获取验证码
  gotonum=()=>{
    store.dispatch(Saveuser(this.state.value));
    console.log(store.getState());
    this.setState({
      hasError: true,
      flag:false,
    });
    let count = this.state.number;
    console.log(count);
    const timer =setInterval(()=>{
      this.setState({
        number:(count--),
        value1:'已发送（'+count+'s)',
      });
      console.log(count);
      if (count === 0) {
	      clearInterval(timer);
	      this.setState({
          number: 60,
          value1:'获取验证码',
	      })
	    }
    },1000);
  }
  revisephone=()=>{
    M.ajax({
      type: 'POST',
      url: '/revisephone',
      headers: {
      },
      data: {
        phone:this.state.value
      }
    }).then((value)=>{
      console.log(value);  
      if (value.status === 200) {
        let phone=this.state.value.replace(/\s*/g,"");
        this.props.history.push({pathname:"/infitem/" + phone});

      }
    }).catch((error)=>{
      if (error.response && error.response.status === 400) {
        this.msg = `${error.response.data.error}!`;
      }
    });
  }
  render(){
    return(
      <div>
          <NavBar
            mode="light"
            icon={<Icon type="left" />}
            onLeftClick={() => {
              this.props.history.go(-1);
            }}
          >绑定手机</NavBar>
         <div>
         <div className='register'>
          <div className='register-phone'>
            <InputItem
              type="phone"
              className='phone'
              clear
              placeholder="手机号码 :"
              onChange={this.onChange}
              value={this.state.value}
            ></InputItem>
            <Button type="primary" onClick={this.gotonum} className='pnumber' inline size="small" disabled={this.state.hasError}>{this.state.value1}</Button>
          </div>
          <InputItem
            type="digit"
            className='yzm'
            placeholder="验证码 :"
          ></InputItem>
          </div>
         </div>
         <Button className='resave' type="primary" disabled={this.state.flag}  onClick={this.revisephone}>通过验证获取新手机号</Button>
      </div>
    )
  }
}
export default ItemPhone;