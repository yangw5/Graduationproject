import React ,{ Component} from 'react';
import { NavBar, Icon,Button, } from 'antd-mobile';
import './css/HomeHeard.css';
import { SavePlace } from '../../redux/Actions';
import store from '../../redux/Redux';
//import {connect} from 'react-redux';


class HomeHeard extends Component {
  constructor(props){
    super(props);
    this.state={

    }
  }
  obtn =() =>{
    console.log(store.getState());
    this.boundAddTodo('成都');
    console.log(store.getState());
  }
  boundAddTodo = text =>{
    store.dispatch(SavePlace(text));
  } 
  render(){
    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => console.log('onLeftClick')}
          rightContent={[
            // <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
            <Icon key="1" type="ellipsis" />,
          ]}
        >
        <span class="iconfont icondizhi"></span>
        <Button onClick={this.obtn}>获取地址</Button>
        </NavBar>
      </div>
    )
  }

}
export default HomeHeard;