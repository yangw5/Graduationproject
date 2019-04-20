<template>
  <div class="foodinf">  
  <div class="orderitem" >
    <div>
      <iframe src="../../../../static/baidumap.html" frameborder="1" width="100%" height="1000px">
      </iframe>
    </div>
    </div>
  </div>
</template>
<script>
import M from '../../../assets/js/common.js';
export default {
  data(){
    return{
      allmoney:0,
      orderlist:[]
    }
  },
  props:{
  },
  components:{
    
  },
  mounted:function(){
    this.getorder();
  },
  methods: {
    // 已知商店id
    //ajsx请求 
    //获取配送地址
    //获取配送food
    //获取用户信息
    getorder(){
        M.ajax({
          type: 'GET',
          url: '/getordershop',
          headers: {
          },
          params: {
            shopid:7,
            state:0
          }
        }).then((value)=>{
          if (value.status === 200) {
            this.orderlist = value.data.data;
            console.log(this.orderlist);
          }
        }).catch((error)=>{
          if (error.response && error.response.status == 400) {
            this.msg = `${error.response.data.error}!`;
          }
    })
    },   
  }
}
</script>
<style  scoped>
.orderitem{
  width: 90%;
  margin: 10px auto;
  border: 1px dotted bisque;
  padding: 5px;
  height: auto;
}
.user{
  height: 100px;
  background: #f8f8f6;
  width: 100%;
  text-align: left;
}
.username{
  height: 100px;
  float: left;
  line-height: 100px;
  font-size: 30px;
  font-weight: 600;
}
.userimg{
  height: 100px;
  float: left;
}
.action{
   height: 100px;
   float:right;
   text-align: right;
   line-height: 100px;
   padding-right: 50px;
}
.action span{
  display: inline-block;
  padding-left:50px;
}
.action span:hover{
  color: blue;
}
.userimg img{
  height: 80px;
  padding: 10px;
  border-radius: 60px;
}
.ordercontainer{
  height: 500px;
  width: 100%;
  float: left;
}
.order{
  height: 500px;
  width: 50%;
  float: left;
  background: #eee;
}
.address{
  height: 500px;
  width: 50%;
  float: left;
  background: white;
}

.fooditem{
  padding: 20px;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px dotted wheat
}
.fooditem span{
  display: inline-block;
  text-align: left;  
}
.span1{
  width: 50%;
}
.span2{
  width: 19%;
}
.allmoney{
  height: 50px;
  line-height: 50px;
  text-align: right;
  padding: 10px;
  margin-right: 50px;
}

.address-item{
  height: 50px;
  line-height: 50px;
  padding-left: 20px;
  text-align: left;
}

</style>

