const  webstage={
  localStorage:{//永久
    //添加
    setstorage:function(name1,value){
      var localStorage=window.localStorage;
      let value1=JSON.stringify(value)
      if(localStorage.hasOwnProperty(name1)){
        localStorage.name=value1;
      }else{
        localStorage.setItem(name1,value1);
      }
      //读取判断
      //第一种方法读取
      // var a=storage.a;
      // console.log(a);
      // //第二种方法读取
      // var b=storage["b"];
      // console.log(b);
      // //第三种方法读取
      // var c=storage.getItem("c");  
    },
    //获取  JSON.parse()
    getstorage:function(name1){
      return window.localStorage[name1];
    },
    //判断是有
    //删除
    deleteitem:function(name){
      window.localStorage.removeItem(name)
    },
    //清除
    clearstorage:function(){
      window.localStorage.clear();
    }
  },
  sessionStorage:{
    setstorage:function(name1,value){
      var sessionStorage=window.sessionStorage;
      let value1=JSON.stringify(value)
      if(sessionStorage.hasOwnProperty(name1)){
        sessionStorage.name=value1;
      }else{
        sessionStorage.setItem(name1,value1);
      }
    },
    //获取  JSON.parse()
    getstorage:function(name1){
      return window.sessionStorage.getItem(name1);
    },
    //删除
    deleteitem:function(name){
      window.sessionStorage.removeItem(name)
    },
    //清除
    clearstorage:function(){
      window.sessionStorage.clear();
    }
  },
  cookie:{
    setcookie:function(name,value){
      // Cookie cookie1 = new Cookie(name,value);// 新建一个Cookie对象
      // cookie1.setMaxAge(24*60*60);                    // 设置过期时间1天，以秒为单位
      // response.addCookie(cookie1);                    // 保存cookie到客户端
    }
  }
}

export default webstage