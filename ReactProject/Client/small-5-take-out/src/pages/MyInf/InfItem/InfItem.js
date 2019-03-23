import React,{Component} from 'react';
import { NavBar, Icon ,List} from 'antd-mobile';
import '../css/infitem.css';
import imgURL from '../images/userlogo.jpg';
const Item = List.Item;



class InfItem extends Component{
  constructor(props){
    super(props)
    this.state={

    }
  }
  render(){
    return(
      <div className='infitem'>
          <NavBar
            mode="light"
            icon={<Icon type="left" />}
            onLeftClick={() => {
              this.props.history.go(-1);
            }}
          >个人资料</NavBar>
          <div>
            <List renderHeader={() => '基本信息'} className="my-list">
              <Item extra={<img src={imgURL} alt="" />}
                arrow="horizontal"
                onClick={() => {
                  this.props.history.push('/itemname');
                }}
              >头像</Item>
              <Item extra={'杨文伍'}
                arrow="horizontal"
                onClick={() => {
                  this.props.history.push('/itemname');
                }}
              >姓名</Item>
              <Item extra={'四川省成都市郫县西华大学'}
               arrow="horizontal" 
              >收货地址 </Item>
            </List>
          </div>
          <div className='zh'>
            <List renderHeader={() => '账号绑定'} className="my-list">
              <Item extra={'15208192473'}
                thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                arrow="horizontal"
                onClick={() => {
                  this.props.history.push('/itemphone');
                }}
              >手机号码</Item>
              <Item extra={'未绑定'}
                thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                arrow="horizontal"
              >淘宝</Item>
               <Item extra={'未绑定'}
                thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                arrow="horizontal"
              >支付宝</Item>
              
            </List>
          </div>
      </div>
    )
  }
}
export default InfItem;