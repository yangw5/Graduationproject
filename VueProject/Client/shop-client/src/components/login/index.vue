<template>
<div class="container">
  <div class="login">
    <img src="./image/logo.png" alt="">
    <div class="from">
      <div class="from-item">
          <el-input placeholder="手机号" v-model="input">
            <el-button slot="append" >获取验证码</el-button>
          </el-input>
      </div>
      <div class="from-item">
        <el-input v-model="input1" placeholder="验证码"></el-input>
      </div>
      <div class="from-item">
        <span>
          
      新用户登录即自动注册，并表示已同意《用户注册协议》
      
        </span>
      </div>  
      
      <div class="from-item ">
         <el-button type="primary" @click="goto">登录</el-button>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      titel:'注册首页',
      input: '',
      input1: ''
    }
  },
   mounted() {},
   methods:{
     goto(){
       this.$router.push({
         //path:'/list/123',
                name:'register' 
          //  params:{
          //           id:123
          //       }
            })
     }
   }
}
</script>
<style  scoped>
.container{
  min-height: 1200px;
  width: 100%;
  background-color: #008de1;
  overflow: hidden;
}
.login{
  width: 40%;
  height: 600px;
  margin: 100px auto;
}
.login img{
  width: 40%;
}
.from{
  width: 50%;
  margin: 10px auto;
}
.from-item{
  margin: 20px auto;
}
/* .from-item >>> .el-input{
  padding: 20px;
  background: white;
} */
.from-item >>> .el-input__inner{
  padding: 40px;
  background: white;
}

.from-item >>> .el-button--primary {
  width: 100%;
  padding: 25px;
}
</style>
