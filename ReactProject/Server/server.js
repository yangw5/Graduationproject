
// //引入http模块
// var http = require('http');
// //开启本地http服务，监听相应端口号
// http.createServer(function(req,res){

// 	console.log('执行');//会执行两次大部分浏览器都会在你访问 http://localhost:8888/ 时尝试读取 http://localhost:8888/favicon.ico )
// 	res.writeHead(200, {"Content-Type": "text/plain"});//状态码 头类型
// 	res.write("node start");//相应体
// 	res.end();//完成响应
// }).listen(8080)
// console.log("http://localhost:8080/");


var  http =require('http');
var url = require("url");
// var io = require('socket.io')(http);
/*
    *新手必读
    *function中的socket为每个客户端单独连接的socket实例，只通知当前连接用户
    *io.sockets 通知所有连接用户
    *socket.broadcast 给除了自己以外的客户端广播消息
*/
// io.on('connection', function (socket) {
//     for(let i=0; i<100; i++){
//         setTimeout(()=>{
//             io.sockets.emit('progress',i);
//             console.log("当前进度为",i+1);
//         },300*i)
//     }
// })


// var socket=sio.listen(server)//监听http服务器
// socket.on('connection',(socket)=>{//建立连接后的回调函数
// })//这里的socket参数，是服务器端用于与客户端建立连接的scoket端口对象


function start(route,handle){
	function onRequest(request, response) {

		// response.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
		// response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
		// response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
		// response.setHeader('Access-Control-Allow-Credentials', true)

		var postData = "";
		var params = url.parse(request.url, true).query//get 获取数据对象
		var pathname = url.parse(request.url).pathname;//获取url 中 /.. 信息
    // console.log("Request for " + pathname + " received.");

		
		request.setEncoding("utf8");//设置了接收数据的编码格式为UTF-8

    // console.log("Request received.");
    // response.writeHead(200, {"Content-Type": "text/plain"});
		// var content = route(handle, pathname,response)
		// response.write(content);
		// response.end();



		//注册了“data”事件的监听器,用于收集每次接收到的新数据块，并将其赋值给postData 变量
    request.addListener("data", function(postDataChunk) {
			// console.log(postDataChunk);
      postData = postDataChunk;
      // console.log("Received POST data chunk '"+
      // postDataChunk + "'.");
		});
		
		//请求路由的调用移到end事件处理程序中，以确保它只会当所有数据接收完毕后才触发，并且只触发一次
		request.addListener("end", function() {
      route(handle, pathname, response, postData,params);
    });
	}
	//开启本地http服务，监听相应端口号
	let server=http.createServer(onRequest).listen(8888)
	console.log("Server has started.");
	console.log("http://localhost:8888/");
	console.log('Server running ');
		let val={
			value1:0,
			value2:1
		}


		var io = require('socket.io').listen(server);
		var requestHandler=require('./requestHandler');
		io.sockets.on('connection', (socket) => {
				console.log('链接成功'); 
				//监听msg 触发事件 接收消息
				socket.on('msg', (val) => {
					//先执行
					requestHandler.socket(val,socket)
					setInterval(()=>{//再循环
					 requestHandler.socket(val,socket)
						// console.log(index)
						// //触发前端设置 回调事件
						// socket.emit('progress', index);
					},3000)

				});   
		});
}

exports.start=start;