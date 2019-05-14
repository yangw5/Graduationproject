<template>
  <div class="foodinf">  
  <div class="orderitem" v-for="(item,index) in orderlist" :key=index>
    <div class="user">
      <div class="userimg">
        <img :src=" 'http://localhost:8888/getimg?himg='+orderlist[0].ruser.himg" alt="">
      </div>
      <div class="username">
        <span>{{item.ruser.name}}</span>
      </div>
      <div class="action">
        <el-button type="success" size="mini" @click="updatastate(1,item.orderid)">接单</el-button>
        <el-button type="danger" size="mini" @click="updatastate(4,item.orderid)">拒绝</el-button>
      </div>
    </div>
    
    <div class="ordercontainer">
      <div class="order">
        <ul class="orderul">
          <li class="fooditem" >
            <span class="span1">商品名称</span>
            <span class="span2">数量</span>
            <span class="span2">小计(￥)</span>
          </li>
          <li class="fooditem" v-for="value in item.rfood" :key=value.foodname>
            <span  class="span0">  <img :src=" 'http://localhost:8888/getimg?himg='+value.foodimg "  alt="x" ></span>
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
    porderlist:Array
  },
  components:{
    
  },
  mounted:function(){
    // console.log(1111222);
    // console.log(this.porderlist);
    this.orderlist=[];
    this.orderlist=this.porderlist;
    // this.getorder();
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
          url: '/yang/getordershop',
          headers: {
          },
          params: {
            shopid:this.$store.state.usershop.id,
            state:0
          }
        }).then((value)=>{
          if (value.status === 200) {
            this.orderlist.push(value.data.data[0]);
            console.log(this.orderlist);
          }
        }).catch((error)=>{
          if (error.response && error.response.status == 400) {
            this.msg = `${error.response.data.error}!`;
          }
      })
    },  
    updatastate(a,b){
      let text=''
      if(a === 1){
        text='接单中...'
      }else if(a === 4){
        text='退单中...'
      }else{

      }
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
            // this.getorder();
              const loading = this.$loading({
              lock: true,
              text: text,
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            setTimeout(() => {
              loading.close();
            }, 500);
            this.$emit('fatherMethod');
            //this.$parent.fatherMethod();
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
  width: 90%;
  margin: 10px auto;
  border: 1px dotted bisque;
  padding: 5px;
  height: 350px;
}
.user{
  height: 50px;
  background: #f8f8f6;
  width: 100%;
  text-align: left;
}
.username{
  height: 50px;
  float: left;
  line-height: 50px;
  font-size: 20px;
  font-weight: 600;
}
.userimg{
  height: 50px;
  float: left;
}
.action{
   height: 50px;
   float:right;
   text-align: right;
   line-height: 50px;
   padding-right: 50px;
}
.userimg img{
  height: 30px;
  padding: 10px;
  border-radius: 60px;
}
.ordercontainer{
  height:300px;
  width: 100%;
  float: left;
}
.order{
  height:300px;
  width: 50%;
  float: left;
  background: #eee;
  position: relative;
}
.address{
  height: 300px;
  width: 50%;
  float: left;
  background: white;
}

.fooditem{
  padding: 10px;
  height: 20px;
  line-height: 40px;
  border-bottom: 1px dotted wheat
}
.orderul{
  height:260px;
  overflow-y: scroll;
}
.fooditem span{
  display: inline-block;
  text-align: left;  
}
.span0{
  width: 10%

}
.span0 img{
  width: 100%;
  height: 30px;
}
.span1{
  width: 30%;
}
.span2{
  width: 20%;
}
.allmoney{
  height: 20px;
  line-height: 40px;
  text-align: right;
  padding: 10px;
  margin-right: 50px;
  position: absolute;
  bottom: 20px;
  right: 5px;
}

.address-item{
  height: 30px;
  line-height:30px;
  padding-left: 20px;
  text-align: left;
}

</style>

