var querystring = require("querystring"),//用于处理query字符串的模块
    // mysqlc=require("./mysqlc"),
    mysql1= require('./mysql'),
    readImg=require('./saveimg')
    saveimage=require('./saveimg')
    fs = require("fs");//文件操作模块


function start(response, postData,params) {
  console.log("Request handler 'start' was called.");
  if(params.name){
    console.log(params.name);//get数据
  }
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(params.name);
    response.end();
}


function mysql(response, postData,params) {
  console.log("Request handler 'sql' was called.");
  (async ()=>{
      //更新
      //let str='update user set name="修" where id=1 '
      //let s = await mysql1.EXECUTE(str,'');

      //查询
      let str='select * from user'
      let s = await mysql1.ROW(str,'');

      //增加
      // let str='INSERT INTO USER (number,NAME,phone,address) VALUES ("user_02","滑动","15208192472","四川省成都市郫都区红")'
      // let s = await mysql1.EXECUTE(str,'');

      //删除
      // let  str='delete from user where id = 5'
      // let s = await mysql1.EXECUTE(str,'');


      //let s = await mysql1.FIRST(str,'');

      //let s = await mysql1.SINGLE(str,'');

       console.log(s);


      var data={
        status:200,
        data:{
          data: s[0]
        }
      }
      var json = JSON.stringify(data);//对象转化为字符串
      response.writeHead(200, {"Content-Type":"application/json"});
      response.write(json);
      response.end();
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
    let str='select * from user where phone= "'+ params.phone +'"';
    let s = await mysql1.FIRST(str,'');
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
        let str='update user set himg="'+ url +'" where id= 1 '
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
      let str='update user set name="'+ name +'" where id= 1 '
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
      let str='update user set phone="'+ phone +'" where id= 1 '
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
    let str='select * from address where usernumber= "'+ params.usernumber +'"';
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
      let str='INSERT INTO address (name,sex,phone,address,street,usernumber) VALUES ("'+pdata.name+'",'+pdata.sex+',"'+pdata.phone+'","'+pdata.address+'","'+pdata.street+'","'+pdata.usernumber+'")'
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
function updataaddress(){
  console.log("Request handler 'updataaddress' was called.");
  (async ()=>{
      let user=JSON.parse(postData);//json转化为对象
      let name=user.name;
      let str='update address set name="'+ name +'" where id= 1 '
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
//删除地址
function deleteaddress(){
  console.log("Request handler 'deleteaddress' was called.");
  (async ()=>{
    let  str='delete from address where id = 5';
    let s = await mysql1.EXECUTE(str,'');
    var data={
      status:200,
      data:{
        data: resault
      }
    }
    returnjson(data,response)
  })()
}


//返回json数据
function returnjson(data,response){
  response.writeHead(200, {"Content-Type": "application/json"});
  var json = JSON.stringify(data);//对象转化为字符串
  response.write(json);
  response.end();
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

