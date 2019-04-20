import React,{Component} from  'react';
import { Button, WhiteSpace, WingBlank ,List} from 'antd-mobile';
import M from '../../assets/common'
const Item = List.Item;


class    Business extends Component{
  constructor(props){
    super(props);
    this.state={
      shopinf:{}
    }
  }
  componentDidMount(){
    this.shopinit();
  }
  shopinit(){
    M.ajax({
      type: 'GET',
      url: '/getshop',
      headers: {
      },
      params: {
        shopid:this.props.postshopid
      }
    }).then((value)=>{
      if (value.status === 200) {
        let data = value.data.data[0];
        console.log(data);
        this.setState({
          shopinf:data
        })
      }
    }).catch((error)=>{
      if (error.response && error.response.status === 400) {
        this.msg = `${error.response.data.error}!`;
      }
  })
  }
  render(){
    return (
    <div>
      <div className='infitem'>
          <div>
            <List renderHeader={() => '基本信息'} className="my-list">
              <Item extra={ <img src={'http://localhost:8888/getimg?himg='+this.state.shopinf.shopimage } alt="" />}
                arrow="horizontal"
                onClick={() => {
     
                }}
              >头像</Item>
              <Item extra={this.state.shopinf.shopname }
                arrow="horizontal"
                onClick={() => {
                  
                }}
              >商家名称</Item>
              <Item extra={this.state.shopinf.shoptype}
               arrow="horizontal" 
              >商家品类 </Item>
                <Item extra={'四川省成都市郫县西华大学'}
               arrow="horizontal" 
              >商家地址 </Item>
              <Item extra={this.state.shopinf.uphone}
               arrow="horizontal" 
              >商家电话 </Item>
              <Item extra={'10:00-22:00'}
               arrow="horizontal" 
              >营业时间 </Item>
            </List>
          </div>
          <div className='zh'>
          <Item extra={''}
               arrow="horizontal" 
              >营业资质</Item>
          </div>
          <Button>举报商家</Button><WhiteSpace />
      </div>
    )
    </div>
    )
  }
}
export default Business;