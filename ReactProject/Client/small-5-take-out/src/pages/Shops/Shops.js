import React,{Component} from  'react';
import { NavBar, Icon,Tabs, WhiteSpace, Badge,Modal,List,Toast } from 'antd-mobile';
import './css/shops.css';
import M from '../../assets/common'
import { Saveshopid,Saveordertype,Saveorderdata} from '../../redux/Actions';

import store from '../../redux/Redux';

import Business from './Business';
import Foods from './Foods';
import Comments from './Comments';

import car from './images/car.png';
import add from './images/add.png'
import reduce from './images/reduce.png'


const tabs = [
  { title: <Badge >点餐</Badge> },
  { title: <Badge >评论</Badge> },
  { title: <Badge >商家</Badge> },
];
class Shops extends Component{
  constructor(props){
    super(props);
    this.state={
      shopinf:{},
      total:0,
      foodlist:[],
      showclass:true,
      moneyok:false,
      modal2:false
    }

  }
  componentDidMount(){
    this.initdata();
  }
  //获取商店信息
  initdata(){
    let shopid='';
    shopid=store.getState().shopid;
    M.ajax({
      type: 'GET',
      url: '/getshop',
      headers: {
      },
      params: {
        shopid:shopid,
      }
    }).then((value)=>{
      if (value.status === 200) {
        let data = value.data.data;
        this.setState({
          shopinf:data,
        })
      }
    }).catch((error)=>{
      if (error.response && error.response.status == 400) {
        this.msg = `${error.response.data.error}!`;
      }
  })
  }
  //关闭购物车
  onClose = key => () => {
    this.setState({
      [key]: false,
    });
    this.showfood()
  }
  //显示
  showModal = key => (e) => {
    if(this.state.showclass){
      e.preventDefault(); // 修复 Android 上点击穿透
      this.setState({
        [key]: true,
      });
    }else{
      this.setState({
        [key]: false,
      });
    }
    this.showfood()
    
  }
  //计算总价
  getdata=(value)=>{
    console.log(value);
    let  sl=0;
    if(value.length !== 0){
      value.forEach(element => {
        sl=sl+element.value.money*element.number;
      });
      sl=sl+1;
    }
    
    this.setState({
      total:sl,
      foodlist:value
    })
  }
  //显示已选菜单
  showfood(){
    this.setState({
      showclass: !this.state.showclass
    })

  }
  //点击加减进行商品的增减
  arfood(type,item){
    let cpfoodlist=JSON.parse(JSON.stringify(this.state.foodlist));
    let cptotal=JSON.parse(JSON.stringify(this.state.total));
    if( type==='add'){
      for(let i=0;i<cpfoodlist.length;i++){
        if(cpfoodlist[i].value.id === item.value.id){
          cpfoodlist[i].number++;
          cpfoodlist[i].value.sl++;
          cptotal=cptotal+(cpfoodlist[i].value.money)
          break;
 
        }
      }
    }else{
      let j = (-1);
      for(let i=0;i<cpfoodlist.length;i++){
        if(cpfoodlist[i].value.id === item.value.id){
          cpfoodlist[i].number--;
          cpfoodlist[i].value.sl--;
          if(cpfoodlist[i].number===0){
            j=i;
          }
          cptotal=cptotal-(cpfoodlist[i].value.money)
          break;
        }
      }
      if(j !== -1){
        cpfoodlist.splice(j,1);
      }
    }
    
    console.log(cpfoodlist);
    this.setState({
      foodlist:cpfoodlist,
      total:cptotal
      
    })
  }
  //跳转到结算页面
  Settlement(){
    var user=store.getState();
    if(user.user){
      let data1=this.state.foodlist;
      store.dispatch(Saveordertype(true));
      store.dispatch(Saveorderdata(data1));
      this.props.history.push({ pathname:'/neworder',state:{data:data1,type:true} })
    }else{
      Toast.info('你尚未登录，请登录',2);
    }
  
    // this.props.router.push({patch:'/neworder',query:{data:data1}});
    //this.props.history.push({ pathname:'/neworder',state:{data:data1} })
    //  this.props.router.push({ pathname:'/sort',state:{name : 'sunny' } })

    // this.props.location.state.name
  }
  render(){
    let _this=this;
    return (
    <div>
      <NavBar
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() =>this.props.history.go(-1)}
        rightContent={[
          <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
          <Icon key="1" type="ellipsis" />,
        ]}
      > {this.state.shopinf.shopname}</NavBar>
      <div className='shops-heard'>
        <div className='shops-title'>
          <p>
          {this.state.shopinf.shopname}
          </p>
        </div>
        <div className='shops-inf'>
          <span>评价</span>
          <span>月售</span>
          <span>蜂鸟快送约23分钟</span>
        </div>
        <div className='shops-discount'>
          <span>共￥6 </span>
          <span>店铺</span>
          <span>领取</span>
        </div>
        <div className='shops-reduce'>
          <span style={{color:'red',backgroundColor:'#f0c1c1'}}>减满</span>
          <span>满25减2</span>
          <span>满25减2</span>
          <span>满25减2</span>
          <span style={{color:'rgb(179, 151, 151)',fontSize:'6px'}}>6个优惠</span>
        </div>    
      </div>
      { 
        this.state.shopinf.id === undefined ? '':
        <div className='shops-sel' >
        <Tabs tabs={tabs}
          initialPage={0}
          onChange={(tab, index) => { console.log('onChange', index, tab); }}
          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
          <div style={{ height: '370px', backgroundColor: '#fff' }}>
            <Foods  getdata={this.getdata}  pcarfood={this.state.foodlist}  postshopid={this.state.shopinf.id} />
          </div>
          <div style={{  height: '420px', backgroundColor: '#fff' }}>
            <Comments postshopid={this.state.shopinf.id} />
          </div>
          {/* display: 'flex', alignItems: 'center', justifyContent: 'center', */}
          <div style={{  height: '420px', backgroundColor: '#fff' }}>
            <Business postshopid={this.state.shopinf.id} />
          </div>
        </Tabs>
        <WhiteSpace />
        </div>

      }
      <div className='shop-cart'>
      <div className='cart-inf'>
        <div className='shop-money'>
          <div className='shop-inf-number'>
              <img src={car} alt=''  onClick={this.showModal('modal2')} />  <WhiteSpace />
        <Modal
          popup
          visible={this.state.modal2}
          onClose={this.onClose('modal2')}
          animationType="slide-up"
          // afterClose={() => { alert('afterClose'); }}
        >
        <List renderHeader={() => <div>
          {
            (20-this.state.total <= 0) ? "欢迎下单" :  "还差"+ (20-this.state.total)+"元 去凑单"
          }
        </div>} className="popup-list"></List>
          {
            this.state.foodlist.length > 0  ? 
            <div className={this.state.showclass ? 'foodmenu' : "foodmenu1" }  >
              <ul>
                <li>
                <div className='fooditem inf-title'>
                  <span className='inf-title1'>已选商品</span>
                  <span className='inf-title2' onClick={()=>{
                    this.setState({
                      foodlist:[],
                      total:0
                    })
                  }}>清空</span>
                </div>
                </li>
                {
                  this.state.foodlist.map(function(item,index){
                    return (
                      <li key={index} className='fooditem'>
                        <span  className='fooditem1'>{item.value.foodname}</span>
                        <span className='fooditem2'> {'￥'+item.value.money}</span>
                        <span className='fooditem3'>
                        <img className='add1' src={add} alt='' onClick={()=>{
                            _this.arfood('add',item)
                        }}/> 
                        <span className='sl1'> {item.number} </span> 
                        <img className='delete1' src={reduce} alt='' onClick={()=>{
                          _this.arfood('delete',item)
                        }}/>
                        </span>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
            : ''
          }
        </Modal>
          </div>
          <div className='shop-inf-money'>
            <span>{"￥"+this.state.total}</span>
            <span style={{ color:'#b7abab',fontSize:'12px'}}>另需配送费1元/可自取</span>
          </div>
        </div>
        <div className='shop-end'  onClick={()=>{this.Settlement()}}>
          去结算
        </div>
      </div>
     </div>
    </div>
    )
  }
}

export default Shops;