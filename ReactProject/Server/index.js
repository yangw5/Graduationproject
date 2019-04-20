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
handle["/revisename"]=requestHandlers.revisename;//修改用户名
handle["/revisephone"]=requestHandlers.revisephone;//修改手机号
handle['/getaddress']=requestHandlers.getaddress;//获取地址
handle['/addaddress']=requestHandlers.addaddress;//新增地址
handle['/updataaddress']=requestHandlers.updataaddress;//修改地址
handle['/deleteaddress']=requestHandlers.deleteaddress//删除地址
handle['/getshop']=requestHandlers.getshop;//获取的特定店铺
handle['/getallfood']=requestHandlers.getallfood;//获取全部food
 
handle['/payfor']=requestHandlers.payfor;//支付 同时 保存订单
handle['/uploadeorder']=requestHandlers.uploadeorder//订单的状态修改
handle['/getorder']=requestHandlers.getorder//获取订单
handle['/getorderitem']=requestHandlers.getorderitem//订单项的获取
handle['/getevaluate']=requestHandlers.getevaluate//获取评价
handle['/addevaluate']=requestHandlers.addevaluate//新增评价
handle['/searchshop']=requestHandlers.searchshop//查询商店
handle['/getallshop']=requestHandlers.getallshop//获取所有商店




//商家后台接口
handle['/shoperlogin']=requestHandlers.shoperlogin//商家验证
handle['/shop']=requestHandlers.shop;//店铺第一次申请注册
handle['/foodtype']=requestHandlers.foodtype//获取商品分类
handle['/postfood']=requestHandlers.postfood//上传商品
handle['/getfood']=requestHandlers.getfood//获取分类下的商品信息
handle['/shopfoodtype']=requestHandlers.shopfoodtype//获取已有food类型
handle['/upadtafood']=requestHandlers.upadtafood//修改food商品信息
handle['/deletefood']=requestHandlers.deletefood//删除food商品信息
handle['/getordershop']=requestHandlers.getordershop//获取订单







server.start(router.route, handle);