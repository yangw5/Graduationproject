function Location(){};
//定义一个可以获得经纬度的方法
Location.prototype.getLocation = function(callback){
  var options = {
    enableHighAccuracy: true,
    maximumAge: 1000
  };
  this.callback = Object.prototype.toString.call(callback) =="[object Function]" ?
      callback :
      function(address){
        alert(address.province + address.city);
        console.log("getocation(callbackFunction) 可获得定位信息对象");
      };
  var self = this;
  if (navigator.geolocation) {
    //浏览器支持geolocation
    navigator.geolocation.getCurrentPosition(function(position){
      //经度
      var longitude = position.coords.longitude;
      //纬度
      var latitude = position.coords.latitude;
      self.loadMapApi(longitude,latitude);
    }, self.onError, options);
  } else {
    //浏览器不支持geolocation
  }
};
//定义一个可以解析经纬度的方法，调用百度的api
Location.prototype.loadMapApi = function(longitude, latitude){
  var self = this;
  var oHead = document.getElementsByTagName('HEAD').item(0);
  var oScript= document.createElement("script");
  oScript.type = "text/javascript";
  oScript.src="http://api.map.baidu.com/getscript?v=2.0&ak=A396783ee700cfdb9ba1df281ce36862&services=&t=20140930184510";
  oHead.appendChild(oScript);
  oScript.onload = function(date){
    var point = new BMap.Point(longitude, latitude);
    var gc = new BMap.Geocoder();
    gc.getLocation(point, function(rs) {
      var addComp = rs.addressComponents;
      self.callback(addComp);
    });
  }
};
//定义出现查询位置出现意外的方法
Location.prototype.onError = function(error) {
  switch (error.code) {
    case 1:
      alert("位置服务被拒绝");
      break;
    case 2:
      alert("暂时获取不到位置信息");
      break;
    case 3:
      alert("获取信息超时");
      break;
    case 4:
      alert("未知错误");
      break;
    default:
      alert("未知错误");
      break;
    
  }
};
//调用
var local = new Location();
local.getLocation(function(res){
  var str=""
  for(let i in res ){
    str=res[i]+str
  }
  document.querySelector("p").innerHTML=str;
})