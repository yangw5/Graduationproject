import React,{Component} from 'react'
import { NavBar, Icon ,} from 'antd-mobile';
import M from '../../../assets/common'

import '../css/itemaddress.css'

class ItemAddress extends Component{
  constructor(props){
    super(props)
    this.state={
      address:[]
    }
  }
  componentDidMount(){
    M.ajax({
      type:'GET',
      url:'/getaddress',
      headers: {
      },
      params:{
        usernumber:'user_01'
      }
    }).then((value)=>{  
      if (value.status === 200) {
        console.log(value.data.data);
        this.setState({
          address:value.data.data
        })

      }
    }).catch((error)=>{
      if (error.response && error.response.status === 400) {
        this.msg = `${error.response.data.error}!`;
      }
    });
  }
  updataaddress(key,value,e){
    console.log(value);
    this.props.history.push({ pathname:'/address',state:{raddress: value} });
  }
  render(){
    let _this = this;
    var showArr=[];
     this.state.address.map(function(value,key){
         return showArr.push(
          <div className='adrs' key={key}>
          <div className='adrs-item'>
            <div className='adrs-item1'>{value.street}</div>
            <div className='adrs-item2'>{value.address}</div>
            <div className='adrs-item3'>
              <span>
             {value.name}{value.sex ? "( 先生 )" : "( 女士 )"}
              </span>
              <span>
              {value.phone}
              </span>
            </div>
          </div>
          <div className='adre-do'>
            <Icon onClick={(e)=>{_this.updataaddress(e,value,key)}} type="ellipsis" size='xs' />
          </div>
        </div>
         )
     })
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
                this.props.history.push({ pathname:'/address',state:{raddress: false} })
              }}>新增地址</span>
            ]}
          >收获地址</NavBar>
         <div>
         {showArr}
         </div>

      </div>
    )
  }
}
export default ItemAddress;