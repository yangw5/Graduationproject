var querystring = require("querystring"),//用于处理query字符串的模块
    mysqlc=require("./mysqlc"),
    mysql1= require('./mysql'),
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

function upload(response, postData) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("You've sent the text: "+postData);
  // querystring.parse(postData).text);//parse与decode方法是一样的，都用于将query字符串解析成对象
  response.end();//stringify、encode方法 两个方法的作用也是一样的，用于将对象转换成query字符串
}

function mysql(response, postData,params) {
  console.log("Request handler 'sql' was called.");
  (async ()=>{
      //更新
      //let str='update user set name="修" where id=1 '
      //let s = await mysql1.EXECUTE(str,'');

      //查询
      var str='select * from user'
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
        // data:{
        //   data: s[0]
        // }
      }
      var json = JSON.stringify(data);
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

exports.start = start;
exports.upload = upload;
exports.mysql = mysql;