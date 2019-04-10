
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


function start(route,handle){
	function onRequest(request, response) {

		response.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
		response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
		response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
		response.setHeader('Access-Control-Allow-Credentials', true)

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
	http.createServer(onRequest).listen(8888)
	console.log("Server has started.");
	console.log("http://localhost:8888/");
}

exports.start=start;