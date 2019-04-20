import React,{Component} from 'react';
import { NavBar, Icon,SearchBar } from 'antd-mobile';

class Remarks extends  Component {
  constructor(props){
    super(props);
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
              <Icon key="1" type="ellipsis" />,
            ]}
          >饿了呀</NavBar>
           <SearchBar placeholder="星选好点8元红包" onFocus={this.goto} maxLength={8} />
      </div>
    )
  }
}
export default Remarks;