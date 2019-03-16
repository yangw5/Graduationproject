import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
class MyInf extends Component {
  render() {
    return (
      <div className="App">
       个人信息
      </div>
    );
  }
}

export default withRouter(MyInf);
