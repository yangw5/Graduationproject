<template>
  <div>
    <div class="Navigation">
       <el-col :span="12">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <!-- <el-menu-item index="1" @click="goto(1)">
            <i class="el-icon-setting"></i>
            <span slot="title">个人中心</span>
          </el-menu-item> -->
          <el-menu-item index="2" @click="goto(1)">
            <i class="el-icon-menu"></i>
            <span slot="title">未接收订单</span>
          </el-menu-item>
          <el-menu-item index="3" @click="goto(3)">
            <i class="el-icon-setting"></i>
            <span slot="title">配送中订单</span>
          </el-menu-item>
          <el-menu-item index="4" @click="goto(4)">
            <i class="el-icon-setting"></i>
            <span slot="title">已完成订单</span>
          </el-menu-item>
          <el-menu-item index="5" @click="goto(5)">
            <i class="el-icon-setting"></i>
            <span slot="title">已取消订单</span>
          </el-menu-item>
          <el-menu-item index="6" @click="goto(6)">
            <i class="el-icon-setting"></i>
            <span slot="title">订单数据展示</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </div>
    <div class="ncontainer">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      imageUrl:'',
    
    }
  },
  props:{

  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    goto(a){
      switch(a){
        case 1:
          this.$router.push({path:'/shopcenter/order'});
          break;
        case 2:
          this.$router.push({path:'/shopcenter/order'});
        case 3:
          this.$router.push({path:'/shopcenter/order/runorder'});
          break;
        case 4:
          this.$router.push({path:'/shopcenter/order'});
          break;

        }
      }
  }
}
</script>
<style  scoped>
.Navigation{
  width: 10%;
  float: left;
  height: 900px;
  background: rgb(0, 141, 225);;
}
.Navigation >>> li{
  background: rgb(0, 141, 225) !important;
}
.Navigation >>> .el-menu{
  border:  0px;
}
.ncontainer{
  width: 70%;
  float: left;
  height: 800px;
  background: white;
}

</style>

