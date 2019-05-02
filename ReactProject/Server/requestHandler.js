var querystring = require("querystring"),//用于处理query字符串的模块
    // mysqlc=require("./mysqlc"),
    mysql1= require('./mysql'),
    readImg=require('./saveimg'),
    saveimage=require('./saveimg'),
    ant=require('./ant')
    fs = require("fs");//文件操作模块


function start(response, postData,params) {
  console.log("Request handler 'start' was called.");
  // if(params.name){
  //   console.log(params.name);//get数据
  // }
    response.writeHead(200, {"Content-Type": "text/html"});
  // response.write(params.name);
    response.end();
}

//用户注册 登录
function mysql(response, postData,params) {
  console.log("Request handler 'sql' was called.");
  (async ()=>{
      //更新
      //let str='update user set name="修" where id=1 '
      //let s = await mysql1.EXECUTE(str,'');

      //查询
      let str='select * from user'
      let s = await mysql1.ROW(str,'');
      let userflog=false;
      for(let i=0;i<s.length;i++){
        if(s[i].phone === params.phone){
          userflog=true;
          break;
        }
      }
      var s1 ='';
      //第一登录 默认设置用户名
      if( userflog == false ){
        let name='默认初级用户';
        let address=1;
        str='INSERT INTO user (phone,name)  VALUES ("'+params.phone+'","'+name+'")';
        await mysql1.EXECUTE(str,'');
        strid='SELECT id  FROM   USER WHERE phone = "'+params.phone+'"';
        let id=await mysql1.FIRST(strid,'');
      //默认设置地址
      let ads={
        address:'默认地址',
        street:'默认街道'
      }
        let  straddress='INSERT INTO address (ad_name,ad_sex,ad_phone,ad_address,ad_street,ad_usernumber,ad_checked) VALUES ("默认用户",1,"'+params.phone+'","'+ads.address+'","'+ads.street+'","'+id.id+'",0)'
        s1= await mysql1.EXECUTE(straddress,'');
      }
      else{
        s1='用户已注册，直接登录';
      }
      let returnid='SELECT id  FROM   USER WHERE phone = "'+params.phone+'"';
      let returns=await mysql1.FIRST(returnid,'');
      var data={
        status:200,
        data:{
          data: returns,
          s:s1
        }
      }
      returnjson(data,response);
     
 

      //增加
      // let str='INSERT INTO USER (number,NAME,phone,address) VALUES ("user_02","滑动","15208192472","四川省成都市郫都区红")'
      // let s = await mysql1.EXECUTE(str,'');

      //删除
      // let  str='delete from user where id = 5'
      // let s = await mysql1.EXECUTE(str,'');


      //let s = await mysql1.FIRST(str,'');

      //let s = await mysql1.SINGLE(str,'');

  })();

  // (async ()=>{
  //   let s = await mysqlc.sqlc('select * from user');
  //   console.log(s);
  // })();

    // var r=mysqlc.sqlc('select * from user');
    //  console.log(r);
   
}

//获取用户信息
function userinf(response, postData,params){
  console.log("Request handler 'userinf' was called.");
  (async ()=>{
    // console.log(params.phone);
    // let str='select * from user where phone= "'+ params.phone +'"';
    let str='SELECT * FROM USER  JOIN  address ON address.ad_usernumber=user.id WHERE user.phone= "'+ params.phone +'" AND ad_checked = "true" ';
    let s = await mysql1.FIRST(str,'');
    console.log(str);
    // console.log(s);
    var data={
      status:200,
      data:{
        data: s
      }
    }
    
    var json = JSON.stringify(data);//对象转化为字符串
    response.writeHead(200, {"Content-Type":"application/json"});
    response.write(json);
    response.end();
  })()
}

//图片上传
function upload(response, postData) {
  console.log("Request handler 'upload' was called.");
  // response.write("You've sent the text: "+postData.data);
  // console.log(img.data);
      (async ()=>{
        let img=JSON.parse(postData);//json转化为对象
        let url= await saveimage.SAVEBASE64(img.data);
        // console.log(url);
        let str='update user set himg="'+ url +'" where id= '+img.userid
        let s = await mysql1.EXECUTE(str,'');
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("ok");
        // querystring.parse(postData).text);//parse与decode方法是一样的，都用于将query字符串解析成对象
        response.end();//stringify、encode方法 两个方法的作用也是一样的，用于将对象转换成query字符串
      })()

}

//修改用户姓名
function revisename(response, postData,params){
  console.log("Request handler 'revisename' was called.");
  (async ()=>{
      let user=JSON.parse(postData);//json转化为对象
      let name=user.name;
      let str='update user set name="'+ name +'" where id= '+user.userid
      let result = await mysql1.EXECUTE(str,'');
      var data={
        status:200,
        data:{
          data: result 
        }
      }
      returnjson(data,response);
  })()
}

//修改手机号
function revisephone(response, postData,params){
  console.log("Request handler 'revisephone' was called.");
  (async ()=>{
      let user=JSON.parse(postData);//json转化为对象
      let phone=user.phone;
          phone=phone.replace(/\s*/g,"");//去除字符串的空格
      let str='update user set phone="'+ phone +'" where id= '+user.userid
      let result = await mysql1.EXECUTE(str,'');
      var data={
        status:200,
        data:{
          data: result 
        }
      }
      returnjson(data,response);
  })()
}

//获取图片信息
function getimg(response, postData,params){
  (async ()=>{
    // console.log(params.himg);
    let path=params.himg;
    // let path='./imgs/yang5/1554102490957.png';
    // console.log(params.himg);
    readImg.GETIMG(path,response);
  })();

}

//获取地址
function getaddress(response, postData,params){
  console.log("Request handler 'getaddress' was called.");
  (async ()=>{
    console.log(params.usernumber);
    let str='select * from address where ad_usernumber= "'+ params.usernumber +'"';
    let resault= await mysql1.ROW(str,'');
    // console.log(s);
    var data={
      status:200,
      data:{
        data: resault
      }
    }
    returnjson(data,response);
  })()
}
//新增地址
function addaddress(response, postData,params){
  console.log("Request handler 'addaddress' was called.");
  (async ()=>{
      let pdata=JSON.parse(postData);//json转化为对象
      pdata=pdata.data;
      console.log(pdata);
      let str='INSERT INTO address (ad_name,ad_sex,ad_phone,ad_address,ad_street,ad_usernumber) VALUES ("'+pdata.name+'",'+pdata.sex+',"'+pdata.phone+'","'+pdata.address+'","'+pdata.street+'","'+pdata.usernumber+'")'
      let s = await mysql1.EXECUTE(str,'');
      var data={
        status:200,
        data:{
          data: s 
        }
      }
      returnjson(data,response);

  })()
  
}
//修改地址
function updataaddress(response, postData,params){
  console.log("Request handler 'updataaddress' was called.");
  (async ()=>{
      postData=JSON.parse(postData).data;//json转化为对象
      let str='update address set ad_name="'+ postData.name +'" ,ad_sex="'+ postData.sex +'" ,ad_phone="'+ postData.phone +'" ,ad_address="'+ postData.address +'" ,ad_street="'+ postData.street +'"  where ad_id = "' + postData.id +'"';
      console.log(str);
      let result = await mysql1.EXECUTE(str,'');
      var data={
        status:200,
        data:{
          data: result 
        }
      }
      returnjson(data,response);
  })()
  
}
//修改默认地址
function updataadtype(response, postData,params){
  console.log("Request handler 'updataadtype' was called.");
  (async ()=>{
      //获取用户下的默认地址
      let udstr='SELECT address FROM USER WHERE id='+params.userid;
      let result1 = await mysql1.FIRST(udstr,'');
      //设置地址的ad_checked 为1

      //设置默认地址


      let str1='update address set ad_checked="'+ 0 +'"  where ad_id = "' + params.addressid +'" and ad_usernumber='+params.userid;
      
      let str2='update address set ad_checked="'+ 1 +'"  where ad_id = "' + result1.address +'" and ad_usernumber='+params.userid;
      
      let str3='update user set address="'+params.addressid+'" where id='+params.userid;
      console.log(udstr)
      console.log(str1)
      console.log(str2)
      console.log(str3)
      let result2 = await mysql1.EXECUTE(str1,'');
      let result3 = await mysql1.EXECUTE(str2,'');
      let result = await mysql1.EXECUTE(str3,'');
      var data={
        status:200,
        data:{
          data: result 
        }
      }
      returnjson(data,response);
  })()
  
}
//删除地址
function deleteaddress(response, postData,params){
  console.log("Request handler 'deleteaddress' was called.");
  (async ()=>{
    let  str='delete from address  where ad_id = "' + params.id +'"';
    console.log(str);
    let s = await mysql1.EXECUTE(str,'');
    var data={
      status:200,
      data:{
        data: s
      }
    }
    returnjson(data,response)
  })()
}
//支付
function payfor(response, postData,params){
  console.log("Request handler 'payfor' was called.");
  ant(response, postData,params);
  orderadd(response, postData,params);
} 
//订单保存
function orderadd(response, postData,params){
  console.log("Request handler 'orderadd' was called.");
  (async ()=>{
      let pdata=JSON.parse(postData);//json转化为对象
          pdata=pdata.data;
      let fordata=pdata.foodvalue
        //总订单
        //用户编号  地址编号  订单状态  时间 商店编号  价格 
        let str='INSERT INTO orders (or_usernumber,or_addressid,or_state,or_foodtime,or_shopid,or_allmoney) VALUES ("'+pdata.userid+'","'+pdata.addressid+'","'+pdata.state+'","'+pdata.addtime+'","'+pdata.shopid+'","'+pdata.allmoney+'")'
        // console.log(str);
        let s = await mysql1.EXECUTE(str,'');
        // console.log(s)
        //查询id
        let strid='select or_id from orders where or_foodtime="'+pdata.addtime+'"';
        // console.log(strid);
        let resault= await mysql1.ROW(strid,'');
        console.log(resault)
        
        for(item of fordata){
          //订单项
          //商品编号 商品数量  订单编号
          let str1='INSERT INTO ordersitem ( dri_foodid,dri_number,dri_orid) VALUES ("'+item.value.id+'","'+item.value.sl+'","'+resault[0].or_id+'")';
          s1 = await mysql1.EXECUTE(str1,'');
        }
      console.log(s)
      var data={
        status:200,
        data:{
          data: 'ok'
        }
      }
      returnjson(data,response);

  })()
}
//订单的修改

//订单状态改变  0 未接收  1 接收  2 派送中 3 完成  4 退单
function uploadeorder(response, postData,params){
  console.log("Request handler 'uploadeorder' was called.");
  (async ()=>{
      postData=JSON.parse(postData);//json转化为对象
      postData=postData;
      console.log(postData)
      let str='update orders set or_state ="'+ postData.state +'" where or_id = "' + postData.id +'"';
      console.log(str);
      let result = await mysql1.EXECUTE(str,'');
      var data={
        status:200,
        data:{
          data: result 
        }
      }
      returnjson(data,response);
  })()
}

//用户订单获取
function getorder(response, postData,params){
  console.log("Request handler 'getorder' was called.");
  (async ()=>{
    console.log(params.usernumber);
    let str='SELECT shopname,or_foodtime,or_state,or_allmoney,or_id,or_shopid FROM orders JOIN shops ON or_shopid=id  WHERE or_state= "'+ params.state +'" and or_usernumber= "'+ params.usernumber +'" ORDER BY or_foodtime DESC';
    console.log(str);
    let resault= await mysql1.ROW(str,'');
    // console.log(s);
    var data={
      status:200,
      data:{
        data: resault
      }
    }
    returnjson(data,response);
  })()
}

//商家订单获取
function getordershop(response, postData,params){
  console.log("Request handler ' getordershop ' was called.");
  (async ()=>{
    let orderitem=[];
    //查询地址
    //查询用户
    //查询商品单项
    //获取总价
    console.log(params.shopid);//获取商店id 并且 获取到订单类型state
    let str='SELECT * FROM orders  WHERE or_shopid= "'+ params.shopid +'" AND or_state='+ params.state;
    let resault= await mysql1.ROW(str,'');//数据库查询到 用户id  订单id  地址id
    console.log(resault);
    for(let i=0;i<resault.length;i++){
      let obj={};
      let orderid=resault[i].or_id;
      obj.allmoney=resault[i].or_allmoney;
      obj.orderid=orderid;
      obj.ordertime=resault[i].or_foodtime;
      obj.ordermore=resault[i].or_more;
      let struser='SELECT name,himg,phone FROM user WHERE phone= "'+ resault[i].or_usernumber+'"';
      let ruser= await mysql1.FIRST(struser,'');//获取用户信息
      console.log(ruser);
      obj.ruser=ruser;
      let straddress='SELECT * FROM address WHERE ad_id= "'+ resault[i].or_addressid+'"';
      let raddress= await mysql1.FIRST(straddress,'');//获取地址信息
      console.log(raddress);
      obj.raddress=raddress;
      let strfood='SELECT foodname,dri_number,money,foodimg FROM  ordersitem JOIN foods ON dri_foodid=id WHERE dri_orid= '+ resault[i].or_id;
      let rfood= await mysql1.ROW(strfood,'');//获取商品项信息 商品名 数量 单价 图片
      console.log(rfood);
      obj.rfood=rfood;
      orderitem.push(obj);
    }
    var data={
      status:200,
      data:{
        data: orderitem
      }
    }
    returnjson(data,response);
  })()
}

//订单项的获取
function getorderitem(response, postData,params){
  console.log("Request handler 'getorderitem' was called.");
  (async ()=>{
    console.log(params.usernumber);
    let str='SELECT * FROM ordersitem JOIN  foods ON ordersitem.dri_foodid = foods.id WHERE dri_orid = '+ params.orderid ;
    console.log(str);
    let resault= await mysql1.ROW(str,'');
    // console.log(s);
    var data={
      status:200,
      data:{
        data: resault
      }
    }
    returnjson(data,response);
  })()
}
//评价获取
function getevaluate(response, postData,params){
  console.log("Request handler 'getevaluate' was called.");
  (async ()=>{
    let str='SELECT * FROM evaluate JOIN USER ON ev_usernumber =id where ev_shopid= "'+ params.shopid +'"';
    console.log(str);
    let resault= await mysql1.ROW(str,'');
    // console.log(s);
    var data={
      status:200,
      data:{
        data: resault
      }
    }
    returnjson(data,response);
  })()
}
//商家评论获取
function getevaluate2(response, postData,params){
  console.log("Request handler 'getevaluate2' was called.");
  (async ()=>{
    let str='SELECT * FROM evaluate JOIN USER ON ev_usernumber =id where ev_shopid= "'+ params.shopid +'"';
    console.log(str);
    let resault= await mysql1.ROW(str,'');
    // console.log(s);
    var data={
      status:200,
      data:{
        data: resault
      }
    }
    returnjson(data,response);
  })()
}
//评论订单内容 订单详情

//新增评价
function addevaluate(response, postData,params){
  console.log("Request handler 'addevaluate' was called.");
  (async ()=>{
    
      let pdata=JSON.parse(postData);//json转化为对象
      console.log(pdata)
          pdata=pdata.data;
         
        //图片保存
        let url= await saveimage.SAVEBASE64(pdata.files[0].url);
        console.log(url)
        // 订单号 信息  图片  时间 
        // files:[],
        // text:'',
        // time:'',
        // orderid:''
        let str='INSERT INTO evaluate (ev_Ordersnumber,ev_inf,ev_img,ev_time,ev_shopid,ev_usernumber) VALUES ("'+pdata.orderid+'","'+pdata.text+'","'+url+'","'+pdata.time+'","'+pdata.shopid+'","'+pdata.userid+'")'
        console.log(str);
        let s = await mysql1.EXECUTE(str,'');
 
      var data={
        status:200,
        data:{
          data: s 
        }
      }
      returnjson(data,response);

  })()
}

//查询商店
function searchshop(response, postData,params){
  console.log("Request handler 'searchshop' was called.");
  (async ()=>{
    let pdata=JSON.parse(postData);//json转化为对象
    console.log(pdata)
    let str='';
    console.log(pdata.state)
    if(pdata.state === 0){
      str='select * from shops where shoptype="'+pdata.type+'" and shopname like "%'+   pdata.nametext +'%"';
    }else{
      str='select * from shops where shopname like "%'+   pdata.nametext +'%"';
    }
    console.log(str);
    let resault= await mysql1.ROW(str,'');
    // console.log(s);
    var data={
      status:200,
      data:{
        data: resault
      }
    }
    returnjson(data,response);
  })()
}

//返回json数据
function returnjson(data,response){
  response.writeHead(200, {"Content-Type": "application/json"});
  var json = JSON.stringify(data);//对象转化为字符串
  response.write(json);
  response.end();
}

//--------------------------------------------------------------------

//商家登录
function shoperlogin(response, postData,params){
  console.log("Request handler 'shoperlogin' was called.");
  (async ()=>{
     postData=JSON.parse(postData);//json转化为对象
     //查询是否有该用户
    let  str='select * from shoper  where s_phone ="'+postData.phone+'"';
    console.log(str);
    let s = await mysql1.ROW(str,'');
    //获取该用户下的商店信息
    let  shopstr='select * from shops where uphone ="'+postData.phone+'"'
    console.log(shopstr);
    let rshop = await mysql1.FIRST(shopstr,'');
    console.log(rshop);
    var data={
      status:200,
      data:{
        data: s,
        shopinf:rshop 
      }
    }
    returnjson(data,response)
  })()
}



//获取所以商家后台处理
function getallshop(response, postData,params){
  console.log("Request handler 'getallshop' was called.");
  (async ()=>{
    let  str='select * from shops';
    console.log(str);
    let s = await mysql1.ROW(str,'');
    var data={
      status:200,
      data:{
        data: s
      }
    }
    returnjson(data,response)
  })()
 }

//获取特定商家后台处理
 function getshop(response, postData,params){
  console.log("Request handler 'getshop' was called.");
  (async ()=>{
    let  str='select * from shops where id ='+params.shopid;
    console.log(str);
    let s = await mysql1.FIRST(str,'');
    var data={
      status:200,
      data:{
        data: s
      }
    }
    returnjson(data,response)
  })()
 }


//商家后台处理
function shop(response, postData,params){
  
  console.log("Request handler 'setshop' was called.");
  (async ()=>{
    console.log(postData);
    let pdata=JSON.parse(postData).data;//json转化为对象
    let url=  saveimage.SAVEIMAGE(pdata.shopimage);
    console.log(url);
    let str='INSERT INTO shops (shopname,shoptype,shopphone,uname,uphone,shopimage,address) VALUES ("'+pdata.shopname+'","'+pdata.shoptype+'","'+pdata.shopphone+'","'+pdata.uname+'","'+pdata.uphone+'","'+url+'","'+pdata.address+'")'
    console.log(str)
    let s = await mysql1.EXECUTE(str,'');
    var data={
      status:200,
      data:{
        data: s
      }
    }
    returnjson(data,response)
  })()
}

//修改商家信息
function uploadshop(response, postData,params){
  console.log("Request handler 'uploadshop' was called.");
  (async ()=>{
    console.log(postData);
    postData=JSON.parse(postData).data;//json转化为对象
    let url=  saveimage.SAVEIMAGE(postData.shopimage);
    console.log(url);
    //let str='update shops set (shopname,shoptype,shopphone,uname,uphone,shopimage,address) VALUES ("'+pdata.shopname+'","'+pdata.shoptype+'","'+pdata.shopphone+'","'+pdata.uname+'","'+pdata.uphone+'","'+url+'","'+pdata.address+'")'
    let str='update shops set shopname="'+ postData.shopname +'",shoptype="'+ postData.shoptype +'",shopphone="'+ postData.shopphone +'",uname="'+postData.uname +'",uphone="'+ postData.uphone +'",shopimage="'+ url +'" ,address="'+ postData.address +'"  where id= '+postData.id;
    console.log(str)
    let s = await mysql1.EXECUTE(str,'');
    var data={
      status:200,
      data:{
        data: s
      }
    }
    returnjson(data,response)
  })()
}

//商品分类获取
function foodtype(response, postData,params){
  console.log("Request handler 'foodtype' was called.");
  (async ()=>{
    let  str='select * from foodtype';
    console.log(str);
    let s = await mysql1.ROW(str,'');
    var data={
      status:200,
      data:{
        data: s
      }
    }
    returnjson(data,response)
  })()
 }

 //商品上传
 function postfood1(response, postData,params){
  console.log("Request handler 'postfood1' was called.");
  (async ()=>{
    let s='';
    let pdata=JSON.parse(postData).data;//json转化为对象
      let url=  saveimage.SAVEIMAGE(pdata.img);
      let str='INSERT INTO foods (foodname,foodtype,money,foodimg,fooddescribe, material,shopid) VALUES ("'+pdata.foodname+'","'+pdata.foodtype+'",'+pdata.money+',"'+url+'","'+pdata.fooddescribe+'","'+pdata. material+'",'+pdata.shopid+')'
      console.log(str)
      s = await mysql1.EXECUTE(str,'');
    var data={
      status:200,
      data:{
        data: s
      }
    }
    returnjson(data,response)
  })()
}

 function postfood(response, postData,params){
  console.log("Request handler 'postfood' was called.");
  (async ()=>{
    let s='';
    let pdata=JSON.parse(postData).data;//json转化为对象
    for(var i=0;i<=pdata.fooditem.length;i++){
      let url=  saveimage.SAVEIMAGE(pdata.fooditem[i].img);
      let str='INSERT INTO foods (foodname,foodtype,money,foodimg,fooddescribe, material,shopid) VALUES ("'+pdata.fooditem[i].name+'","'+pdata.name+'",'+pdata.fooditem[i].price+',"'+url+'","'+pdata.fooditem[i].describe+'","'+pdata.fooditem[i].material+'",'+pdata.shopid+')'
      console.log(str)
      s = await mysql1.EXECUTE(str,'');
    }
    var data={
      status:200,
      data:{
        data: s
      }
    }
    returnjson(data,response)
  })()
}
//获取分类下的food信息
function getfood(response, postData,params){
  console.log("Request handler 'getfood' was called.");
  (async ()=>{
    let  str='select * from foods where shopid='+params.shopid+' AND foodtype="'+params.type+'"';
    console.log(str);
    let s = await mysql1.ROW(str,'');
    var data={
      status:200,
      data:{
        data: s
      }
    }
    returnjson(data,response)
  })()
 }
//获取全部食物
 function getallfood(response, postData,params){
  console.log("Request handler 'getallfood' was called.");
  (async ()=>{
    let  str='select * from foods where shopid='+params.shopid;
    console.log(str);
    let s = await mysql1.ROW(str,'');
    var data={
      status:200,
      data:{
        data: s
      }
    }
    returnjson(data,response)
  })()
 }


 //获取已有food类型
 function shopfoodtype(response, postData,params){
  console.log("Request handler 'shopfoodtype' was called.");
  (async ()=>{
    let  str='select DISTINCT foodtype from foods where shopid='+params.shopid;
    console.log(str);
    let s = await mysql1.ROW(str,'');
    var data={
      status:200,
      data:{
        data: s
      }
    }
    returnjson(data,response)
  })()
 }

 //修改food
 function upadtafood(response, postData,params){
  console.log("Request handler 'upadtafood' was called.");
  (async ()=>{
       postData=JSON.parse(postData).data;//json转化为对象
      let url= saveimage.SAVEIMAGE( postData.foodimg);
      //foodname,foodtype,money,foodimg,fooddescribe, material,shopid
      let str='update foods set foodname="'+ postData.foodname +'",foodtype="'+ postData.foodtype +'",money="'+ postData.money +'",foodimg="'+ url +'",fooddescribe="'+ postData.fooddescribe +'",material="'+ postData.material +'"  where id= '+postData.id;
      console.log(str);
      let result = await mysql1.EXECUTE(str,'');
      var data={
        status:200,
        data:{
          data: result 
        }
      }
      returnjson(data,response);
  })()
 }
 //删除food信息
 function deletefood(response, postData,params){
  console.log("Request handler 'deletefood' was called.");
  (async ()=>{
    let  str='delete from foods  where id = "' + params.id +'"';
    console.log(str);
    let s = await mysql1.EXECUTE(str,'');
    var data={
      status:200,
      data:{
        data: s
      }
    }
    returnjson(data,response)
  })()

 }
//商家修改订单状态
 //订单状态改变  0 未接收  1 接收  2 派送中 3 完成  4 退单
function updatastate(response, postData,params){
  console.log("Request handler 'updatastate' was called.");
  (async ()=>{
      postData=JSON.parse(postData);//json转化为对象
      postData=postData;
      console.log(postData)
      let str='update orders set or_state ="'+ postData.state +'" where or_id = "' + postData.id +'"';
      console.log(str);
      let result = await mysql1.EXECUTE(str,'');
      var data={
        status:200,
        data:{
          data: result 
        }
      }
      returnjson(data,response);
  })()
}
 
 //socket 商家获取订单和评论
 function socket(params,socket){
  // console.log("Request handler 'orderslength' was called.");
  (async ()=>{
    let str='SELECT * FROM orders  WHERE or_shopid= "'+ params.shopid +'" AND or_state='+ params.state;
    // console.log(str);
    let s = await mysql1.ROW(str,'');
    // console.log(s.length)
    socket.emit('progress', s.length);

    // return s.length;
    // returnjson(data,response)
  })()
 }


exports.start = start;
exports.upload = upload;
exports.mysql = mysql;
exports.userinf=userinf;
exports.getimg=getimg;
exports.revisename=revisename;
exports.revisephone=revisephone;
exports.getaddress=getaddress;
exports.addaddress=addaddress;
exports.updataaddress=updataaddress;
exports.deleteaddress=deleteaddress;
exports.getshop=getshop;
exports.payfor=payfor;
exports.orderadd=orderadd;
exports.uploadeorder=uploadeorder
exports.updataadtype=updataadtype
exports.getorder=getorder
exports.getorderitem=getorderitem
exports.getevaluate=getevaluate
exports.getevaluate2=getevaluate2
exports.addevaluate=addevaluate
exports.searchshop=searchshop
exports.getallshop=getallshop


exports.shoperlogin=shoperlogin
exports.shop=shop;
exports.uploadshop=uploadshop
exports.foodtype=foodtype
exports.postfood=postfood
exports.postfood1=postfood1
exports.getfood=getfood
exports.shopfoodtype=shopfoodtype
exports.upadtafood=upadtafood
exports.deletefood=deletefood
exports.getallfood=getallfood
exports.getordershop=getordershop
exports.updatastate=updatastate


exports.socket=socket