<template>
  <div class="ordercontainer">
    <div class="c-l">
      <div class="tips">
        <el-alert
          title=""
          type="warning"
          description="交易成功的订单会计入销售统计，交易失败的订单不会计入销售统计"
          show-icon>
        </el-alert>
      </div>
      <div class="">
         <router-view></router-view>
      </div>
    </div>
    <div class="c-r">
      <div class="Navigation">
        <div class="ntitle">
          订单:
        </div>
        <el-col :span="12">
          <el-menu
            default-active="0"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="black"
            active-text-color="#ffd04b">
            <!-- <el-menu-item index="1" @click="goto(1)">
              <i class="el-icon-setting"></i>
              <span slot="title">个人中心</span>
            </el-menu-item> -->
            <el-menu-item index="0" @click="goto(0)">
              <i class="el-icon-menu"></i>
              <span slot="title">未接收
              </span>
            
            </el-menu-item>
            <el-menu-item index="1" @click="goto(1)">
              <i class="el-icon-setting"></i>
              <span slot="title">配送中</span>
             
            </el-menu-item>
            <el-menu-item index="2" @click="goto(2)">
              <i class="el-icon-setting"></i>
              <span slot="title">已完成</span>
           
            </el-menu-item>
            <el-menu-item index="3" @click="goto(3)">
              <i class="el-icon-setting"></i>
              <span slot="title">已取消</span>
           
            </el-menu-item>
            <el-menu-item index="4" @click="goto(4)">
              <i class="el-icon-setting"></i>
              <span slot="title">全部订单</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </div>
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
        case 0:
          this.$router.push({path:'/shopcenter/order'});
          break;
        case 1:
          this.$router.push({path:'/shopcenter/order/runorder'});
          break;
        case 2:
          this.$router.push({path:'/shopcenter/order/orderdata', query: {
              state: 3
            }});
          // this.$router.push({path:'/shopcenter/order/didorder'});
          break;
        case 3:
          this.$router.push({path:'/shopcenter/order/orderdata',query: {
              state: 4//取消
            }});
          // this.$router.push({path:'/shopcenter/order/badorder'});
          break;
        case 4:
          this.$router.push({path:'/shopcenter/order/orderdata',query: {
              state: 0
            }});
          break;
        }
      }
  }
}
</script>
<style  scoped>
.ordercontainer{
  width: 100%;
}
.c-l{
  width: 90%;
  float: right;

}
.c-r{
  width: 10%;
  float: left;
}
.ntitle{
  color: #e9e9e9;
  padding: 10px;
  text-align: left;
  padding-left: 20px;

}
.tips{
  margin: 0 auto;
  width: 95%;
  padding: 10px;
  text-align: center;
}
.ncontainer{
  width: 100%;
  float: left;
  background: white;
}
.Navigation{
  width: 100%;
  float: left;
  background: white;
}
.Navigation >>> li{
  background:white !important;
  /* color:  rgb(0, 141, 225) !important; */
}
.Navigation >>> .el-menu{
  border:  0px;
}
.sl{
  margin-left: 30px;
}

</style>

