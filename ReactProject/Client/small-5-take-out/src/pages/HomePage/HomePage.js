import React, { Component } from 'react';
import { withRouter,Link } from 'react-router-dom';
import HomeHeard from './HomeHeard';
import { SearchBar } from 'antd-mobile';
import './css/HomePage.css';




class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  goto=()=>{
    alert("走你。。。");
     this.props.history.push('/search');
  }
  render() {
    return (
      <div className="home-body">
       <div className="hompheard">
        <HomeHeard />
       </div>
       <div className="home-container">
       <div>
          <SearchBar placeholder="星选好点8元红包" onFocus={this.goto} maxLength={8} />
      </div>
       </div>
       <br/>    
       {/* <a href='#/myinf'>a 跳转 去我的</a>
       <br/>
       <Link to="/myinf" replace>link 跳转 去我的</Link>  
       <br/>
       <Button onClick={this.goto}>函数跳转到 我的</Button> */}

      </div>
    );
  }
}

export default withRouter(HomePage);
