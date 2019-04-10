<template>
  <div class="register">
    <div class="register-title">
      <p>饿了么商户中心</p>
    </div>
    <div class="register-item">
      <div class="register-step">
        <el-steps :active="active" simple >
          <el-step title="步骤 1" icon="el-icon-edit"></el-step>
          <el-step title="步骤 2" icon="el-icon-upload"></el-step>
          <el-step title="步骤 3" icon="el-icon-picture"></el-step>
        </el-steps>
      </div>
    </div>
    <div class="inf">
      <A v-if="flog1" :switchcp='switchcp' ></A>
      <B v-if="flog2" @switchcpB="switchcpB" ></B>
      <C v-if="flog3" @switchcpC='switchcpC'></C>
    </div>
  </div>
</template>
<script>

import A from './register/registeritem1.vue'
import B from './register/registeritem2.vue'
import C from './register/registeritem3.vue'
import M from '../../assets/js/common.js'

export default {
  data(){
    return{
      active:1,
      flog1:false,
      flog2:false,
      flog3:false,
      from:{}
    }
  },
  components:{
    A,
    B,
    C
  },
  beforeUpdate:function(){},
  beforeMount(){},
  mounted: function(){
     this.flog1=true;
  },
  methods: {
    switchcp(data){
      console.log(data);
      this.flog1=false;
      this.flog2=true;
      this.active++;
      this.from=JSON.parse(JSON.stringify(data));
      console.log(this.from);
    },
    switchcpB(avg){
      if(avg){
        this.flog2=false;
        this.flog3=true;
        this.active++
      }
      else{
      this.flog2=false;
      this.flog1=true;
      this.active--
      }

    },
    switchcpC(avg){
      if(avg){
        let _this=this;
        M.ajax({
          type: 'POST',
          url: '/shop',
          headers: {
          },
          data: {
            data:_this.from
          }
        }).then((value)=>{
          if (value.status === 200) {
            this.data = value.data;
            _this.$router.push("/shopcenter");
          }
        }).catch((error)=>{
          if (error.response && error.response.status == 400) {
            this.msg = `${error.response.data.error}!`;
          }
        });
      }else{
        this.flog3=false;
        this.flog2=true;
        this.active--
      }
      
    },
    next() {
        if (this.active++ > 2) this.active = 0;
    }
  }
}
</script>
<style  scoped>
.register{
  width: 100%;
  height: 100%;
  background: white;
  /* display: flex;
  flex-direction:column;
  align-items: center;  */
}
.register-title{
  width: 100%;
  height: 100px;
  background-color:  #008de1;
  text-align: left;
  color: white;
  line-height: 100px;
  font-size: 40px;
  font-weight: 800;
  padding-left: 40%;
}
.register-item{
  width: 60%;
  height: 100px;
  margin: 0 auto;
  margin-top: 20px;
}
.register-step >>> .el-steps--simple{
  padding: 35px 8%;
}
.inf{
  width: 60%;
  margin: 0 auto;
  margin-top: 20px;
}




</style>

