import React,{Component} from 'react'
import { NavBar, Icon ,InputItem, Tag, WhiteSpace, Button,List} from 'antd-mobile';
import M from '../../../assets/common'
import '../css/address.css'
const Item = List.Item;
const Brief = Item.Brief;


class Address extends Component{
  constructor(props,context){
    super(props,context)
    this.state={
        name:'',
        phone:'',
        sex:false,
        address:'',
        street:'',
        usernumber:'user_01',
        flog:false

    }
  }
  componentDidMount(){

    console.log(this.props.location.state.address);
    
  }
  inputchange1=(value)=>{
    this.setState({
      name:value
    });
  }
  inputchange2=(e)=>{
    alert(e.target.getAttribute('class'));

  }
  inputchange3=(value)=>{
    this.setState({
      phone:value
    });
  }
  inputchange4=(value)=>{
    this.setState({
      address:value
    });
  }
  inputchange5=(value)=>{
    this.setState({
      street:value
    });
  }

  postaddress=()=>{

    console.log(this.state);
    M.ajax({
      type:'POST',
      url:'/addaddress',
      headers: {
      },
      data:{
        data:this.state
      }
    }).then((value)=>{  
      if (value.status === 200) {
        this.props.history.go(-1);
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
            rightContent={[
              <Icon key="1" type="ecross" />,
            ]}
          >新增/修改地址</NavBar>
         <div>
         <div>
            <div className='address-item'>
            <InputItem
              placeholder="姓名"
              value={this.state.name}
              onChange={ this.inputchange1 }
            >联系人</InputItem>
            </div>
            <div className='address-item usersex'>
              <span ref='man' className='man'  onClick={this.inputchange2}>先生</span>
              <span ref='woman' className='woman' onClick={this.inputchange2}>女士</span>
            </div>
            <div className='address-item'>
            <InputItem
              placeholder="手机号码"
              value={this.state.phone}
              onChange={ this.inputchange3 }
            >电话</InputItem>
            </div>
            <div className='address-item'>
            <InputItem
              placeholder="选择收货地址"
              onChange={ this.inputchange4 }
              value={this.state.address}
            >地址</InputItem>
            </div>
            <div className='address-item'>
            <InputItem
              placeholder="例如：5号楼123号"
              onChange={ this.inputchange5 }
              value={this.state.street}
            >门牌号</InputItem>
            </div>
            <div className='address-item'>

            </div>
            <div>
              <Button type="primary" disabled={this.state.flog}  onClick={this.postaddress}>保存</Button><WhiteSpace />
            </div>

         </div>

         </div>
      </div>
    )
  }
}
export default Address;