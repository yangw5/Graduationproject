<template>
  <div>
    <div class="Navigation">
       <el-col :span="12">
        <el-menu
          default-active="1-4"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1" @click="goto(1)">
            <i class="el-icon-setting"></i>
            <span slot="title">店铺信息</span>
          </el-menu-item>
          <el-menu-item index="2"  @click="goto(2)">
            <i class="el-icon-menu"></i>
            <span slot="title">店铺设置</span>
          </el-menu-item>
          <el-menu-item index="3" @click="goto(3)">
            <i class="el-icon-setting"></i>
            <span slot="title">个人中心</span>
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
          this.$router.push({path:'/shopcenter/'});
          break;
        case 2:
          this.$router.push({path:'/shopcenter/food'});
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
  height: 500px;
  background: rgb(0, 141, 225);;
}
.Navigation >>> li{
  background: rgb(0, 141, 225) !important;
}
.ncontainer{
  width: 70%;
  float: left;
  height: 800px;
  background: white;
}

</style>

