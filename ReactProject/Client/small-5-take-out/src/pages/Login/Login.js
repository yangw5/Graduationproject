import React,{Component} from 'react';
import { NavBar, Icon ,InputItem, Button, Toast,ActionSheet} from 'antd-mobile';
import './css/login.css';
import { Saveuser ,Saveuserid} from '../../redux/Actions';
import store from '../../redux/Redux';
import M from '../../assets/common'

class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      value: '',
      hasError: true,
      value1:'获取验证码',
      number:10,
      yzm:''
    };
  }
 
  dataList = [
    { url: 'OpHiXAcYzmPQHcdlLFrc', title: '支付宝' },
    { url: 'wvEzCMiDZjthhAOcwTOu', title: '新浪微博' },
    // { url: 'cTTayShKtEIdQVEMuiWt', title: '' },
    { url: 'umnHwvEgSyQtXlZjNJTt', title: '微信' },
    { url: 'SxpunpETIwdxNjcJamwB', title: 'QQ' },
  ].map(obj => ({
    icon: <img src={`https://gw.alipayobjects.com/zos/rmsportal/${obj.url}.png`} alt={obj.title} style={{ width: 36 }} />,
    title: obj.title,
  }));

  componentDidMount(){
    // this.showShareActionSheet();
    
  }
//用户点击登录
  showShareActionSheet = () => {

    if(this.state.value===''){
      Toast.info('请输入手机号进行验证')
      return;
    }
    if(this.state.yzm===''){
      Toast.info('请输入验证码')
      return;
    }

    if(this.state.yzm !== '111111'){
      Toast.info('验证码错误 请重新输入')
    }else{
      let ph=this.state.value;
      ph=ph.replace(/\s*/g,"");
      M.ajax({
        type: 'GET',
        url: '/mysql',
        headers: {
        },
        params: {
          phone:ph
        }
      }).then((value)=>{
        if (value.status === 200) {
          let data = value.data.data;
          store.dispatch(Saveuser(ph));
          store.dispatch(Saveuserid(data.id));
          console.log(store.getState());
          console.log(data);
          this.props.history.go(-1);
        }
      }).catch((error)=>{
        if (error.response && error.response.status === 400) {
          this.msg = `${error.response.data.error}!`;
        }
      });
    }

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
          number: 10,
          value1:'获取验证码',
          hasError: false,
	      })
      }
      if(count === 5){
        Toast.info("验证码：  111111", 2);
      }
    },1000);
  }//三方登录
  loginother(){
    ActionSheet.showShareActionSheetWithOptions({
      options: this.dataList,
      title: '三方登录',
      // message: 'I am description, description, description',
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
      <div className='logintext'>
        <NavBar
            mode="light"
            icon={<Icon type="left" />}
            onLeftClick={() => {
              this.props.history.go(-1);
            }}
            rightContent={[
              <Icon key="0" type="ellipsis"  
              onClick={()=>{
                this.loginother();
              }}
              />,
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
            clear
            value={this.state.yzm}
            onChange={
              (value)=>{
                this.setState({
                  yzm:value
                })
              }
            }         
            placeholder="验证码 :"
          ></InputItem>
          </div>
          <span className='tips'>温馨提示:未注册的饿了么的手机账号，登录时将自动注册，且代表您已同意《用户服务协议》《隐私政策》</span>
          <Button type="primary"   onClick={this.showShareActionSheet}>立即登录</Button>
      </div>
    )
  }
}
export default Login;