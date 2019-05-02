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
      address:''
    }
  }
  componentDidMount(){
    this.init()
  }
  obtn =() =>{
    alert( window.lat )
    console.log(store.getState());
    this.boundAddTodo('成都');
    console.log(store.getState());
  }
  boundAddTodo = text =>{
    store.dispatch(SavePlace(text));
  }
  init(){
    let _this=this;
    let BMap=window.BMap;

    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r){
        console.log(r.point);
        window.lat=r.point.lat;   //window.lat是在其他页面设置的全局变量
        window.lng=r.point.lng;   //window.lng是在其他页面设置的全局变量
            //获取地理位置
    var myGeo = new BMap.Geocoder();      
    // 根据坐标得到地址描述    
    myGeo.getLocation(new BMap.Point(window.lng,window.lat), function(result){      
        if (result){   
        // console.log(1111111111);   
        // console.log(result.address);  
        _this.setState({
          address:result.address
        })
        // //计算两点间的距离
        // var pointA = new BMap.Point(window.lat,window.lng); // 创建点坐标A–宁波市宁海县 
        // var pointB = new BMap.Point(121.436043,29.294384); // 创建点坐标B–北京市朝阳区 
        
        // var map = new BMap.Map("allmap");
        // var range=map.getDistance(pointA,pointB).toFixed(2);
        // alert(range) 
        }      
    });
    },{enableHighAccuracy: true});
  }
  render(){
    return (
      <div>
        <NavBar
          mode="light"
          // icon={<Icon type="left" />}
          onLeftClick={() => console.log('onLeftClick')}
          rightContent={[
            // <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
            // <Icon key="1" type="ellipsis" />,
          ]}
        >
        <span className="iconfont icondizhi"></span>
        <Button onClick={this.obtn}>{this.state.address}</Button>
        </NavBar>
      </div>
    )
  }

}
export default HomeHeard;