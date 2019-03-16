import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
class MyOrder extends Component {
  render() {
    return (
      <div className="App">
       订单
      </div>
    );
  }
}

export default withRouter(MyOrder);
