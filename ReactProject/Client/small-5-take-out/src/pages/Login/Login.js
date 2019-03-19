import React,{Component} from 'react';
import { NavBar, Icon ,InputItem,ActionSheet, WingBlank, WhiteSpace, Button, Toast} from 'antd-mobile';
import './css/login.css';
import { Saveuser } from '../../redux/Actions';
import store from '../../redux/Redux';

class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      value: '',
      hasError: true,
      value1:'获取验证码',
      number:60
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
  onChange = (value) => {
    if (value.replace(/\s/g, '').length < 11) {
      this.setState({
        hasError: true,
      });
    } else {
      this.setState({
        hasError: false,
      });
    }
    this.setState({
      value,
    });
  }
  gotonum=()=>{
    alert("获取验证码");
    store.dispatch(Saveuser(this.state.value));
    console.log(store.getState());
    this.setState({
      hasError: true,
    });
    let count = this.state.number;
    console.log(count);
    const timer =setInterval(()=>{
      this.setState({
        number:(count--),
        value1:'已发送（'+count+'s)',
      });
      console.log(count);
      if (count === 0) {
	      clearInterval(timer);
	      this.setState({
          number: 60,
          value1:'获取验证码',
	      })
	    }
    },1000);
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
          <div className='register-phone'>
            <InputItem
              type="phone"
              className='phone'
              clear
              placeholder="手机号码 :"
              onChange={this.onChange}
              value={this.state.value}
            ></InputItem>
            <Button type="primary" onClick={this.gotonum} className='pnumber' inline size="small" disabled={this.state.hasError}>{this.state.value1}</Button>
          </div>

          <InputItem
            type="digit"
            className='yzm'
            placeholder="验证码 :"
          ></InputItem>
          </div>
          <br/>
          <br/>
          <span className='tips'>温馨提示:未注册的饿了么的手机账号，登录时将自动注册，且代表您已同意《用户服务协议》《隐私政策》</span>
          <Button type="primary" onClick={this.showShareActionSheet}>立即登录</Button>
      </div>
    )
  }
}
export default Login;