import Vue from 'vue'
import VueSocketio from 'vue-socket.io'
Vue.use(VueSocketio, 'ws://localhost:8080') // 注意和本地服务器地址及端口一致
//申请一个WebSocket对象，参数是需要连接的服务器端的地址，同http协议使用http://开头一样，WebSocket协议的URL使用ws://开头，另外安全的WebSocket协议使用wss://开头。
ws.onopen = function()//当websocket创建成功时，即会触发onopen事件
{
  console.log("open");
  ws.send("hello");//用于叫消息发送到服务端
};
ws.onmessage = function(evt)
{//当客户端收到服务端发来的消息时，会触发onmessage事件，参数evt.data中包含server传输过来的数据
  console.log(evt.data)
};
ws.onclose = function(evt)
{//当客户端收到服务端发送的关闭连接的请求时，触发onclose事件
  console.log("WebSocketClosed!");
};
ws.onerror = function(evt)
{//如果出现连接，处理，接收，发送数据失败的时候就会触发onerror事件
  console.log("WebSocketError!");
};

export default ws