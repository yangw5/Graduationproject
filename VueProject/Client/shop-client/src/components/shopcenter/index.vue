<template>
    <div class="text-container">
      <div class="shoptitle">
        <div class="logo">
          yang5饿了-店铺后台 
        </div>
        <div class="titleitem">
          <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#008de1"
          text-color="#fff"
          active-text-color="#ffd04b">
          
          <el-menu-item index="1" @click="goto(1)" >
              首页
          </el-menu-item>
          <el-menu-item index="4"   @click="goto(4)">
              店铺
          </el-menu-item>
          <el-menu-item index="3"   @click="goto(3)">
            <el-badge :value="value2" class="item">
              <el-button size="small">订单</el-button>
            </el-badge>
          </el-menu-item>
          <el-menu-item index="2"   @click="goto(2)">
              统计
          </el-menu-item>
          <!-- <el-menu-item index="1"  @click="goto(4)">处理中心</el-menu-item> -->
          <el-menu-item index="5"   @click="goto(5)">
            <el-badge :value="value1" class="item">
              <el-button size="small">留言</el-button>
            </el-badge>
          </el-menu-item>
          <!-- <a href="https://www.ele.me" target="_blank"> -->
           <el-submenu index="6">
            <template slot="title">设置</template>
            <el-menu-item index="6-1" @click="goto(6)">设置</el-menu-item>
            <!-- <el-menu-item index="2-2" @click="goto(false)">店铺信息</el-menu-item> -->
            <!-- <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
              <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu> -->
          </el-submenu>
        </el-menu>
        </div>
        <div class="goout">
          <span class="sp1" >你有 <span class="sp2">{{value2}}</span>笔订单未处理</span>
          
          <span class="sp3" @click="goout()">退出</span>
        </div>
      </div>
      <div class="lb">

      </div>
      <div class="container">
            <el-alert
              title="消息提示的文案"
              type="success"
              show-icon>
            </el-alert>
        <!-- <div class="Crumbs">
          <el-breadcrumb separator="/">
          <el-breadcrumb-item >当前位置:</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/' }">{{address}}</el-breadcrumb-item>
            <!-- <el-breadcrumb-item><a href="/">个人信息</a></el-breadcrumb-item> -->
            <!-- <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item> 
          </el-breadcrumb>
        </div> -->
        <div class="container-text">
          <router-view></router-view>
        </div>
      </div>
    
    </div>

</template>

<script>
  
export default {
  data(){
    return{
      activeIndex2: '1',//默认选择
      data:{},
      value1:0,//留言数量
      value2:0,//订单数量
      address:'首页'
    }
  },
  //（socket.on）绑定事件放在sockets中
  sockets:{ 
    // 创建连接
    connect(){
      console.log('连接成功啦1')
    },
    // 监听自定义progress事件，需与服务端emit事件名一致
    progress(res){
      // console.log(res)
      // this.value1=res
      // alert(this.value2)
       this.value2=res
      // if(this.value2 !==res){
      //   alert(this.value2)
      //   this.value2=res
      // }
    }
  },
  created(){
    this.data={
      state:0,//订单状态
      shopid:this.$store.state.usershop.id//获取shopid
    }
    this.getlength();
  },
  // updated(){
  // //数据更新时，向服务器端发送事件
  // this.$socket.emit("msg"); //触发start
  // },
  mounted(){
    // this.$socket.emit('emit_method', val);
    //emit发送

  },
  methods:{
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      goto(a){
        if(a === 1){//首页
          this.$router.push({path:'/shopcenter/'})
          this.address='首页'
        }else if(a === 2){//统计
          alert('统计未开发')
          this.address='统计'
          // this.$router.push({path:'/shopcenter/order'})
        }else if(a === 3){//订单
          //触发服务器监听的方法
          this.$router.push({path:'/shopcenter/order'})
          this.address='订单'
          // this.$socket.emit('msg', this.data);
        }else if(a === 4){//店铺
          this.$router.push({path:'/shopcenter/shop'})
          this.address='店铺'
        }else if(a === 5){//留言
          this.$router.push({path:'/shopcenter/comment'})
          this.address='留言'
        }else if(a === 6){//设置
          alert('设置未开发')
          this.address='设置'
          //  this.$router.push({path:'/shopcenter/order'})
        }
       
      },
      goout(){
        this.$router.push({path:'/'})
      },
      getlength(){
        this.$socket.emit('msg', this.data);
      }
  }
}

</script>
<style  scoped>
.text-container{
  height: 800px;
  /* background-image: url('./images/10_v2_bg.png') */
}

.logo{
  width: 10%;
  float:left;
  line-height: 60px;
  color: aliceblue;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
}
.shoptitle{
  background-color: #008de1;
  width: 100%;
  height: 60px;
  /* padding-left: 100px; */
}
.shoptitle .el-button{
  background-color: #008de1;
  border: 0px;
  color: white;
}
/* .shoptitle .el-button:hover{
  background: #0071b4;
} */
.shoptitle >>> .el-menu-item:hover  .el-button{
  background: #0071b4;
}
.shoptitle >>> .el-badge__content.is-fixed {
  top:15px;
}
.shoptitle >>> .el-menu-item{
  padding: 0px 50px;
} 
.shoptitle >>> .el-menu.el-menu--horizontal {
    border-right: none;
    border: 0px;
}
.lb{
  background-color: #008de1;
}
.container{
  width: 100%;
  /* overflow-y: scroll; */
}
.Crumbs{
  width: 100%;
  margin: 0 auto;
  padding: 10px;
  background: #eee;
  margin: 1px;
}
.container-text{
  width: 100%;
  margin: 0 auto;
}
.titleitem{
  width: 60%;
  float: left;
}
.goout{
  width: 20%;
  float: right;
  padding: 10px;
  line-height: 40px;
  padding-right: 50px;
}
.sp1{
  float: left;
}
.sp2{
  padding-left: 10px;
  padding-right: 10px;
  color: red;
}
.sp3{
  float:right;
}
.goout .sp3:hover{
  color: red;
}
</style>
