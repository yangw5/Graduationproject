var server = require("./server");//http模块
var router = require("./router");//路由模块
var requestHandlers = require("./requestHandler");//路由处理模块

var handle = {}//路由分配
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/mysql"] = requestHandlers.mysql;
handle["/upload"] = requestHandlers.upload;//图片上传
handle["/getimg"] = requestHandlers.getimg;//图片下载
handle["/userinf"] = requestHandlers.userinf;//个人信息





server.start(router.route, handle);