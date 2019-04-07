<template>
    <div>

      <div class="shoptitle">
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#008de1"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu index="2">
            <template slot="title">我的工作台</template>
            <el-menu-item index="2-1" @click="goto">个人信息</el-menu-item>
            <!-- <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
              <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu> -->
          </el-submenu>
          <el-menu-item index="1">处理中心</el-menu-item>
          <el-menu-item index="3" >
            <el-badge :value="12" class="item">
              <el-button size="small">评论</el-button>
            </el-badge>
          </el-menu-item>
          <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
        </el-menu>
      </div>
      <div class="lb">

      </div>
      <div class="container">
        <div class="Crumbs">
          <el-breadcrumb separator="/">
          <el-breadcrumb-item >当前位置:</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/' }">我的工作台</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">个人信息</a></el-breadcrumb-item>
            <!-- <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
          </el-breadcrumb>
        </div>
        <div class="Navigation">

        </div>
        <div class="ncontainer">
           <router-view></router-view>
        </div>
      </div>
    
    </div>

</template>

<script>
  
export default {
  data(){
    return{
      activeIndex2: '1'
    }
  },
  methods:{
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      goto(){
        alert(111);
      }
  }
}

</script>
<style  scoped>
.shoptitle{
  background-color: #008de1;
  padding-left: 100px;
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
  top:10px;
  height:30px;
  width: 30px;;
  line-height: 30px;
  border-radius:20px;

}
.shoptitle >>> .el-menu-item{
  padding: 0px 50px;
} 
.shoptitle >>> .el-menu.el-menu--horizontal {
    border-right: none;
    border: 0px;
}
.lb{
  height: 100px;
  background-color: #008de1;
}
.container{
  width: 100%;
  background: #f7f7f7;
  height: 1000px;
}
.Crumbs{
  margin-top: 50px;
  width: 80%;
  height: 10%;
  margin: 0 auto;
  padding-top: 50px;
}
.Navigation{
  width: 20%;
  float: left;
  height: 90%;
}
.ncontainer{
  width: 70%;
  float: left;
  height: 90%;
  background: white;
}
</style>
