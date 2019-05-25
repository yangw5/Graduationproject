import React from 'react';
import { TabBar } from 'antd-mobile'; //引入antd相关组件
import {HashRouter, Route, Switch,Link,withRouter} from 'react-router-dom';
import store from '../src/redux/Redux'
import {  SavenavTab } from '../src/redux/Actions'

 import HomePage from './pages/HomePage/HomePage'
 import MyInf from './pages/MyInf/MyInf'
 import MyCar from './pages/MyCar/MyCar'
 import MyOrder from './pages/MyOrder/MyOrder'

 class TabBarExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'blueTab',
      hidden: false,
      fullScreen: false,
    };
  }
  componentDidMount(){
    if(store.getState().navTab===''){

    }else{
      this.setState({
        selectedTab:store.getState().navTab
      })
    }

  }
  renderContent(pageText) {
    return (
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
        <div>
            <Route  path="/V1/homepage" component={HomePage}/>
            {/* <Route  path="/V1/mycar" component={MyCar}/> */}
            <Route  path="/V1/myorder" component={MyOrder}/>
            <Route  path="/V1/myinf" component={MyInf}/>
        </div>
        <div >
          {/* app组件标签跳转
          <Link to="/myinf" replace>link 跳转 去我的</Link> */}
        </div>      
      </div>
    );
  }

  render() {
    return (
      <div style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: '100%' }}>

        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}
        >
          <TabBar.Item
            title="首页"
            key="Life"
            icon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat' }}
            />
            }
            selectedIcon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat' }}
            />
            }
            selected={this.state.selectedTab === 'blueTab'}
            badge={1}
            onPress={() => {
              this.setState({
                selectedTab: 'blueTab',
              });
              store.dispatch( SavenavTab('blueTab'));
              this.props.history.push('/v1/homepage');
            }}
            data-seed="logId"
          >
            {this.renderContent('Life')}
          </TabBar.Item>
          {/* <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat' }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat' }}
              />
            }
            title="运送"
            key="Koubei"
            badge={'new'}
            selected={this.state.selectedTab === 'redTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'redTab',
              });
              store.dispatch( SavenavTab('redTab'));
              this.props.history.push('/v1/mycar');
            }}
            data-seed="logId1"
          >
            {this.renderContent('Koubei')}
          </TabBar.Item> */}
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat' }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat' }}
              />
            }
            title="订单"
            key="Friend"
            dot
            selected={this.state.selectedTab === 'greenTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'greenTab',
              });
              store.dispatch( SavenavTab('greenTab'));
              this.props.history.push('/v1/myorder');
            }}
          >
            {this.renderContent('Friend')}
          </TabBar.Item>
          <TabBar.Item
            icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
            selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
            title="我的"
            key="my"
            selected={this.state.selectedTab === 'yellowTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'yellowTab',
              });
              store.dispatch( SavenavTab('yellowTab'));
              console.log(this.props);
             // this.context.router.history.push('/myinf');
             this.props.history.push('/v1/myinf');
            }}
          >
            {this.renderContent('My')}
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}
export default withRouter(TabBarExample);