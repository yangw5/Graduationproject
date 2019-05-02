<template>
  <div class="Navigation">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item  v-for="(value,index) in datalist" :title="index+':   '+value.ev_inf" :key="index" :name="index">
        <div class='card'>
          <el-card :body-style="{ padding: '0px' }">
            <img  :src=" 'http://localhost:8888/getimg?himg='+value.ev_img" class="image">
            <div style="padding: 14px;">
              <span>{{value.ev_inf}}</span>
              <div class="bottom clearfix">
                <time class="time">{{value.ev_time}}</time>
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        </div>
         
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import M from '../../../assets/js/common.js';
export default {
  data(){
    return{
      activeNames: ['1'],
      datalist:[]
    
    }
  },
  props:{

  },
  mounted(){
    this. init();
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleChange(val) {
        console.log(val);
    },
    init(){
      console.log(this.$store.state.usershop)
        M.ajax({
          type: 'GET',
          url: '/yang/getevaluate2',
          headers: {
          },
          params: {
           shopid:this.$store.state.usershop.id
          }
        }).then((value)=>{
          if (value.status === 200) {
            let data = value.data.data;
            this.datalist=data;
            console.log(data)
          }
        }).catch((error)=>{
          if (error.response && error.response.status == 400) {
            this.msg = `${error.response.data.error}!`;
          }
       })
    },
    showorder(evid){
      alert(evid);
    }
  }
}
</script>
<style  scoped>
.Navigation{
  width: 90%;
  margin: 10px auto;
  height: 900px;
  /* background: rgb(0, 141, 225);; */
}
.time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }
.card{
  width: 300px;
}
  .img {
    width:20%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }

</style>

