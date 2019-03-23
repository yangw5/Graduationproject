import React,{Component} from 'react'
import { NavBar, Icon ,InputItem,ActionSheet, WingBlank, WhiteSpace, Button, Toast,List} from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;


class ItemName extends Component{
  constructor(props){
    super(props)
    this.state={

    }
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
          >修改用户名</NavBar>
         <div>
         <InputItem
            placeholder="请输入用户名"
            clear
          />
          <span style={{display:'block',padding:'15px',backgroundColor:'#fff',color:'rgb(84, 76, 76)'}}>用户名只能修改一次，5-24个字</span>
          <Button type="primary" disabled>确认修改</Button><WhiteSpace />
         </div>
      </div>
    )
  }
}
export default ItemName;