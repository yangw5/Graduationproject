var server = require("./server");//http模块
var router = require("./router");//路由模块
var requestHandlers = require("./requestHandler");//路由处理模块

var handle = {}//路由分配
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/mysql"] = requestHandlers.mysql;

server.start(router.route, handle);