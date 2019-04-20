import React,{Component} from 'react'
import { NavBar, Icon ,InputItem, WhiteSpace, Button,List} from 'antd-mobile';
import store from '../../../redux/Redux'
import M from '../../../assets/common'
const Item = List.Item;
const Brief = Item.Brief;



class ItemName extends Component{
  constructor(props){
    super(props)
    this.state={
      user:null,
      hasError:true
    }
  }
  //用户名修改
  resave=()=>{
    let that=this;
    M.ajax({
      type: 'POST',
      url: '/revisename',
      headers: {
      },
      data: {
        name:this.state.user,
        userid:store.getState().userid
      }
    }).then((value)=>{
      console.log(value);  
      if (value.status === 200) {
      //  let data = value.data.data;
      // console.log( );
      that.props.history.go(-1);

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
          >修改用户名</NavBar>
         <div>
         <InputItem
            placeholder="请输入用户名"
            value={this.state.user}
            onChange={(value)=>{
              if(value){
                this.setState({
                  user:value,
                  hasError:false
                })
              }else{
                this.setState({
                  user:value,
                  hasError:true
                })
              }
            }}
            clear
          />
          <span style={{display:'block',padding:'15px',backgroundColor:'#fff',color:'rgb(84, 76, 76)'}}>用户名只能修改一次，5-24个字</span>
          <Button type="primary" disabled={this.state.hasError}  onClick={this.resave}>确认修改</Button><WhiteSpace />
         </div>
      </div>
    )
  }
}
export default ItemName;