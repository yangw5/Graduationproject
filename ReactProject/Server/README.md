# node

## 搭建基本服务

### 一个基础的HTTP服务器


    //引入http模块
    var http = require('http');
    //开启本地http服务，监听相应端口号
    http.createServer(function(req,res){
      console.log('执行');//会执行两次大部分浏览器都会在你访问 http://localhost:8888/ 时尝试读取 http://localhost:8888/favicon.ico )
    res.writeHead(200, {"Content-Type": "text/plain"});//状态码 头类型
    res.write("node start");//相应体
    res.end();//完成响应
    }).listen(8080)
    console.log("http://localhost:8080/");


    通过 server.on('request',function(req,res){
      req.url获取请求路由进行判断
    })监听请求

    返回 如果是文件 通过fs.readFile(文件地址，回调函数处理)返回对应的文件数据 读取成功后返回二进制数据

## 模块

具名模块 用户自己编写的文件模块，node没有全局作用域,只有模块作用域。相对路径加 ./

  1. 模块的引入

            var http = require("http");//具名

  
  1. 基于事件驱动的回调


  1. 模块导出 

    exports

  1. 获取git或者post请求

      导入模块：var url = require("url");


                   url.parse(string).query
                                           |
           url.parse(string).pathname      |
                       |                   |
                       |                   |
                     ------ -------------------
          http://localhost:8888/start?foo=bar&hello=world
                                ---       -----
                                 |          |
                                 |          |
              querystring(string)["foo"]    |
                                            |
                         querystring(string)["hello"]


## 路由

  1. 行为驱动执行

  1. 请求处理程序

      * 路由，顾名思义，是指我们要针对不同的URL有不同的处理方式。例如处理/start的“业务逻辑”就应该和处理/upload的不同。

  1. 阻塞与非阻塞

      * node中除了代码，所有一切都是并行执行的”。

      * Node.js是单线程的。它通过事件轮询（event loop）来实现并行操作

      * 要多用非阻塞操作，如使用回调


## 获取get 和 post 数据

通过  

    res.on('requsest',function(res,rep){

    })

设置 rep.setHeader设置不同对应content-Type

## 获取ip地址和端口号

  ip定位计算机 端口定位软件程序
  req.socket.remoteAddress   req.socket.remotePort

## 代码风格

  [javascript standard style]()

  [javascript-style-guide]()

  分号(也可以使！或者~)：  在( )  [ ]    ` 开头补上 ；
  
   单引号 空格 冗余 等等

## 模板引擎

  art-template

  只关心 模板引擎语法api，如{{}}，不关心内容,返回模板字符串
