import React,{Component} from  'react';
import { Button, WhiteSpace, WingBlank ,List} from 'antd-mobile';
const Item = List.Item;

class    Business extends Component{
  constructor(props){
    super(props);
    this.state={

    }

  }
  render(){
    return (
    <div>
      <div className='infitem'>
          <div>
            <List renderHeader={() => '基本信息'} className="my-list">
              <Item extra={<img src={''} alt="" />}
                arrow="horizontal"
                onClick={() => {
                  this.props.history.push('/itemname');
                }}
              >头像</Item>
              <Item extra={'黄焖鸡米饭'}
                arrow="horizontal"
                onClick={() => {
                  this.props.history.push('/itemname');
                }}
              >商家名称</Item>
              <Item extra={'简餐'}
               arrow="horizontal" 
              >商家品类 </Item>
                <Item extra={'四川省成都市郫县西华大学'}
               arrow="horizontal" 
              >商家地址 </Item>
              <Item extra={'15208192473'}
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