<template>
  <div>
    <div class="Navigation">
       <el-col :span="12">
        <el-menu
          default-active="1-4"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
          <!-- <el-menu-item index="3" @click="goto(3)">
            <i class="el-icon-setting"></i>
            <span slot="title">个人中心</span>
          </el-menu-item> -->
          <el-menu-item index="1" @click="goto(1)">
            <i class="el-icon-setting"></i>
            <span slot="title">店铺信息</span>
          </el-menu-item>
          <el-menu-item index="2"  @click="goto(2)">
            <i class="el-icon-setting"></i>
            <span slot="title">店铺设置</span>
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
    switchcp: {
      type: Function,
      default: null
    }
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
          this.$router.push({path:'/shopcenter/shop'});
          break;
        case 2:
          this.$router.push({path:'/shopcenter/shop/food'});
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
  height: 800px;
  border-right: 1px solid #eee;
}

.Navigation >>> .el-menu{
  border: 0px;
  width: 100%;

}
.Navigation >>> li{
  border-bottom: 1px solid #eee;
}
.Navigation >>> .el-col-12{
  width: 100%;

}
.ncontainer{
  width: 70%;
  float: left;
  height: 800px;
  background: white;
}

</style>

