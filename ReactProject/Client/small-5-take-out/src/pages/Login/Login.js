import React,{Component} from 'react';
import { NavBar, Icon ,InputItem,ActionSheet, WingBlank, WhiteSpace, Button, Toast} from 'antd-mobile';
import './css/login.css'

class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      value: '美食'
    };

  }
 
  dataList = [
    { url: 'OpHiXAcYzmPQHcdlLFrc', title: '发送给朋友' },
    { url: 'wvEzCMiDZjthhAOcwTOu', title: '新浪微博' },
    { url: 'cTTayShKtEIdQVEMuiWt', title: '生活圈' },
    { url: 'umnHwvEgSyQtXlZjNJTt', title: '微信好友' },
    { url: 'SxpunpETIwdxNjcJamwB', title: 'QQ' },
  ].map(obj => ({
    icon: <img src={`https://gw.alipayobjects.com/zos/rmsportal/${obj.url}.png`} alt={obj.title} style={{ width: 36 }} />,
    title: obj.title,
  }));

  componentDidMount(){
    // this.showShareActionSheet();
  }

  showShareActionSheet = () => {
    ActionSheet.showShareActionSheetWithOptions({
      options: this.dataList,
      // title: 'title',
      message: '三方登录',
    },
    (buttonIndex) => {
      this.setState({ clicked1: buttonIndex > -1 ? this.dataList[buttonIndex].title : 'cancel' });
      // also support Promise
      return new Promise((resolve) => {
        Toast.info('closed after 1000ms');
        setTimeout(resolve, 1000);
      });
    });
  }
  render(){
    return (
      <div>
        <NavBar
            mode="light"
            icon={<Icon type="left" />}
            onLeftClick={() => {
              this.props.history.go(-1);
            }}
            rightContent={[
              <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
              <Icon key="1" type="ellipsis" />,
            ]}
          >登录/注册</NavBar>
          <div className='register'>
          <InputItem
            type="phone"
            placeholder="186 1234 1234"
          >手机号码</InputItem>
          <InputItem
            type="digit"
            placeholder=""
          >验证码</InputItem>
          </div>
          <span className='tips'>温馨提示:未注册的饿了么的手机账号，登录时将自动注册，且代表您已同意《用户服务协议》《隐私政策》</span>
          <Button type="primary" onClick={this.showShareActionSheet}>立即登录</Button>
      </div>
    )
  }
}
export default Login;