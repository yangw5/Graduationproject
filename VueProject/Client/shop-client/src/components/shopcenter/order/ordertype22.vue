<template>
  <div class="foodinf">  
  <div class="orderitem" v-for="(item,index) in orderlist" :key=index  >
    <div class="map">
      <iframe src="../../../../static/baidumap.html" frameborder="1" width="100%" height="500px">
      </iframe>
    </div>
    <div class="order">
      <div class="user">
      <div class="userimg">
        <img :src=" 'http://localhost:8888/getimg?himg='+orderlist[0].ruser.himg" alt="">
      </div>
      <div class="username">
        <span>{{item.ruser.name}}</span>
      </div>
      <div class="action">
        <el-button type="success" size="mini" @click="updatastate(2,item.orderid)">完成</el-button>
        <el-button type="danger" size="mini" @click="updatastate(4,item.orderid)">退单</el-button>
      </div>
    </div>
    
    <div class="ordercontainer">
      <div class="order">
        <ul class="orderul">
          <li class="fooditem" >
            <span class="span1">商品名称</span>
            <span class="span2">数量</span>
            <span class="span2">小计</span>
          </li>
          <li class="fooditem" v-for="value in item.rfood" :key=value.foodname>
            <span  class="span1">{{value.foodname}}</span>
            <span class="span2">{{value.dri_number}}</span>
            <span class="span2">{{Number(value.money)*Number(value.dri_number)}}</span>
          </li>
        </ul>
        <div class="allmoney">
          <span>实际支付：{{item.allmoney}}</span>
        </div>
      </div>
      <div class="address">
        <div>
          <div class="address-item">配送信息</div>
          <br/>
          <div class="address-item">配送方式：	果木烤鸭提供配送服务</div>
          <div class="address-item">送达时间：	尽快送出</div>
          <br/>
          <div class="address-item">联 系 人：	{{item.raddress.ad_name}}</div>
          <div class="address-item">联系电话：	{{item.raddress.ad_phone}}</div>
          <div class="address-item">收货地址：	{{item.raddress.ad_address+orderlist[0].raddress.ad_street}} </div>
          <br/>
          <div class="address-item">发票信息：	无发票 </div>
          <div class="address-item">备 注：	无备注</div>
        </div>
      </div>
    </div>
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
            shopid:this.$store.state.usershop.id,
            state:2
          }
        }).then((value)=>{
          if (value.status === 200) {   
            this.orderlist.push(value.data.data[0])
            console.log(this.orderlist);
          }
        }).catch((error)=>{
          if (error.response && error.response.status == 400) {
            this.msg = `${error.response.data.error}!`;
          }
      })
    }, 
    updatastate(a,b){
      M.ajax({
          type: 'POST',
          url: '/yang/updatastate',
          headers: {
          },
          data: {
            id:b,
            state:a
          }
        }).then((value)=>{
          if (value.status === 200) {
            this.getorder();
          }
        }).catch((error)=>{
          if (error.response && error.response.status == 400) {
            this.msg = `${error.response.data.error}!`;
          }
      })
    }  
  }
}
</script>
<style  scoped>
.orderitem{
  width: 100%;
  margin: 10px auto;
  border: 1px dotted bisque;
  padding: 5px;
  height: auto;
  height: 350px;
  overflow: hidden;
}
.map{
  width: 48%;
  float: left;
  margin-right: 10px;
}
.orderul{
  height: 250px;
  overflow-y: scroll;
}
.user{
  height: 40px;
  background: #f8f8f6;
  width: 100%;
  text-align: left;
}
.username{
  height: 40px;
  float: left;
  line-height: 40px;
  font-size: 20px;
  font-weight: 600;
}
.userimg{
  height: 40px;
  float: left;
}
.action{
   height: 40px;
   float:right;
   text-align: right;
   line-height: 40px;
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
  height: 20px;
  padding: 10px;
  border-radius: 40px;
}
.ordercontainer{
  height:350px;
  width: 100%;
  float: left;
}
.order{
  float: left;
  background: #eee;
  height: 300px;
  width: 48%;
  position: relative;
}
.address{
  height: 350px;
  width: 50%;
  float: left;
  background: white;
}

.fooditem{
  padding:5px;
  height: 20px;
  line-height:30px;
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
  height: 20px;
  line-height: 40px;
  text-align: right;
  padding: 10px;
  margin-right: 50px;
  position: absolute;
  bottom: 30px;
  right: -10px;
}

.address-item{
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
  text-align: left;
}

</style>

