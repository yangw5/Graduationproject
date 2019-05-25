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
      <div class="from-item sss">
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
import M from '../../assets/js/common.js'
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
     //登录验证
     goto(){
        M.ajax({
          type: 'POST',
          url: '/shoperlogin',
          headers: {
          },
          data: {
           phone:this.input
          }
        }).then((value)=>{
          if (value.status === 200) {
            let data = value.data;
            console.log(data)
            //若用户存在，将商店信息存入vuex里面
            if(data.data.length>0){
               this.$store.dispatch('onFirstLoading2',data.shopinf)
               this.$router.push("/shopcenter");
            }else{
            //调用  this.$store.state.userphone
            //调用  this.$store.dispatch('onFirstLoading',false)
            this.$store.dispatch('onFirstLoading',this.input);
            // alert(this.$store.state.userphone);
            //若用户不存在，跳转进入注册地铺页面
            this.$router.push({
            //path:'/list/123',
                    name:'register' 
              //  params:{
              //           id:123
              //       }
            })

            }
          }
        }).catch((error)=>{
          if (error.response && error.response.status == 400) {
            this.msg = `${error.response.data.error}!`;
          }
        });
     }
   }
}
</script>
<style  scoped>
.container{
  min-height: 800px;
  width: 100%;
  background-color: #008de1;
  overflow: hidden;
  background-image: url('./image/04_bg.png')
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
.sss{
  text-align: left;
  color: white;
}
/* .from-item >>> .el-input{
  padding: 20px;
  background: white;
} */
.from-item >>> .el-input__inner{
  padding: 10px;
  background: white;
}

.from-item >>> .el-button--primary {
  width: 100%;
  padding: 10px;
}
</style>
