# vue

## 

### vue-cli项目搭建

1. npm install --global vue-cli 全局安装脚手架

1. vue init webpack test （其中test为我的项目名称）项目创建 根据需要设置属性

1. npm run dev 启动项目


### 使用elementui

  1. 下载安装依赖 npm i element-ui -D
  
     //   i -> install       D  -> --save-dev       S -> --save   都是缩写

  1. 在main.js入口文件中引入它的js和css

      import ElementUI from 'element-ui'          //固定路径，类似vuerouter

      import 'element-ui/lib/theme-default/index.css'      //固定路径

  1. 使用组件在main.js入口文件中声明使用

      声明后可以在任何一个vue模块中使用

      Vue.use(ElementUI)
  1. 在需要使用的地方直接使用对应的elementUI组件即可

  1. 如需修改样式 在外层设置类名 通过 外层类名 >>> 修改类名 找到指定元素进行样式修改。

### vue-router

* 路由使用

  1. 路由引入 
      
      import Vue from 'vue'   
  
      import Router from 'vue-router'

  2. 全局注册路由 
  
      Vue.use(Router)

  1. 生成这个router实例

      export default new Router(){
          routes:[
              {
                  path:'/',
                  name:'home',
                  component:Home
              },{
                  path:'/list',
                  name:'list',
                  component:List
              }
          ]
        }
  
  1. 在index.js中把路由实例传递给Vue根组件

      import router from './router'

      new Vue({
          el:'#app',
          router,
          template:'<APP/>',
          components:{ APP }
      })

* 静态路由

  1. 静态配置的 ---> import ....

      固定路径路由的配置

      {
          path:'/',
          name:'home',
          component:Home
      },{
          path:'/list',
          name:'list',
          component:List
      }

* 动态路由

  1. 只有动态路由可以做到分页的效果

      //localhost:8080/#/list/2 index,js

      {
          path:'/list/:id',
          name:'list',
          component:List
      }

* 嵌套路由 

  1. {
        path:'/list',
        name:'list',
        component:List,
        childeren:[{
            path:'a',
            component:A
        }]
    }

* 编程式的导航

  1. 除了<router-link :to="...">来创建a标签来定义导航链接（声明式），还可以借助router的实例方法

      router.push(location,onCompelte?,onAbort?)


      使用router.push 或者 router.replace 里面都不能让path和params同时存在

* 路由传参



### 复制组件传参

  * 子组件调用父组件方法

    1. 第一种方法是直接在子组件中通过this.$parent.event来调用父组件的方法

    1. 第二种方法是在子组件里用$emit向父组件触发一个事件，父组件监听这个事件就行了。
    
      child @fatherMethod="fatherMethod"></child

       this.$emit('fatherMethod');

    1. 第三种是父组件把方法传入子组件中，在子组件里直接调用这个方法

      child :fatherMethod="fatherMethod"></child

      props: {
        fatherMethod: {
          type: Function,
          default: null
        }
      },
      methods: {
        childMethod() {
          if (this.fatherMethod) {
            this.fatherMethod();
          }
        }
      }


###  blob和base64之间的相互转换

           /**
          * base64  to blob二进制
          */
          dataURItoBlob(dataURI) {
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]; // mime类型
            var byteString = atob(dataURI.split(',')[1]); //base64 解码
            var arrayBuffer = new ArrayBuffer(byteString.length); //创建缓冲数组
            var intArray = new Uint8Array(arrayBuffer); //创建视图

            for (var i = 0; i < byteString.length; i++) {
                intArray[i] = byteString.charCodeAt(i);
            }
            return new Blob([intArray], {type: mimeString});
          },

        /**
        * 
        * blob二进制 to base64
        **/
          blobToDataURI(blob, callback) {
              var reader = new FileReader();
              reader.onload = function (e) {
                  callback(e.target.result);
              }
              reader.readAsDataURL(blob);
          },
          


  


