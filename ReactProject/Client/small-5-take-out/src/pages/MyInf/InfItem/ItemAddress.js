import React,{Component} from 'react'
import {Route} from 'react-router-dom';
import Address from './Address';
import { NavBar, Icon ,InputItem,ActionSheet, WingBlank, WhiteSpace, Button, Toast,List} from 'antd-mobile';

import '../css/itemaddress.css'

const Item = List.Item;
const Brief = Item.Brief;


class ItemAddress extends Component{
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
            rightContent={[
              <span key='1' onClick={()=>{
                this.props.history.push('/address')
              }}>新增地址</span>
            ]}
          >收获地址</NavBar>
         <div>
         <div className='adrs'>
            <div className='adrs-item'>
              <div className='adrs-item1'>德馨苑</div>
              <div className='adrs-item2'>一栋248</div>
              <div className='adrs-item3'>
                <span>
                杨(先生)
                </span>
                <span>
                15208192473
                </span>
              </div>
            </div>
            <div className='adre-do'>
              <Icon type="ellipsis" size='xs' />
            </div>
         </div>
      </div>

      </div>
    )
  }
}
export default ItemAddress;