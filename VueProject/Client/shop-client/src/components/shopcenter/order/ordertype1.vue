<template>
  <div class="order">  
    <div class="order-title">
      <div class="title-title">
        <h1>
          订单管理/未接单
        </h1>
      </div>
      <div class="title-inf">
        <span>订单数量：</span><span class="rinf"> {{this.orderlist.length}}</span>
        <!-- <span>订单金额：</span><span class="rinf">10</span> -->
      </div>
    </div>
    <div class="fg"></div>
    <div class="ordertable">
      <div class="ordertype">
        <div class="block">
           <el-button type="success" icon="el-icon-check" circle title="刷新" size="mini" ></el-button>
        </div>
        <div class="block">
          <el-date-picker
            size="mini"
            v-model="time"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </div>
        <div class="block" style="float:right">
            <el-button type="primary" size="mini" @click="searchordershop">搜索</el-button>
            <el-button type="success" size="mini">导出</el-button>
        </div>
        <div class="block"  style="float:right">
          <el-input v-model="input" placeholder="请输入内容" size="mini"></el-input>
        </div>
      </div>
      <div class="tablecen">
        <div>
          <div class="table-title">
            <div class="cl-3" style=" text-align: left;">
              <span style="margin-left:10px">菜单</span>
            </div>
            <div class="cl-2">买家</div>
            <div class="cl-1">支付方式</div>
            <div class="cl-1">交易金额</div>
            <div class="cl-1">下单时间</div>
            <div class="cl-1">备注</div>
            <div class="cl-1">状态</div>
          </div>
          <div v-for="(orderitem,index) in orderlist" :key='index' >
            <div class="shopname" >
              <span style="margin-left:10px">门店名称 :</span> <span class="shopnameinf">叫了只鸡</span>
            </div>
             <div class="orderid">
              订单编号 :<span>ctzyxvyang5{{orderitem.orderid}}</span>
              <div class="oriderdo">
                <span @click="handleRowHandle(orderitem)">查看详情 -</span>
                <span>备注 -</span>
                <span>标记</span>
              </div>
            </div>
             <div class="order-item" >
                <div class="cl-3 itemitem">
                  <div class="item-name">
                    <span class="fitem" v-for="(item,key) in orderitem.rfood " :key='key'>
                      <span class="fimg">
                        <img :src=" 'http://localhost:8888/getimg?himg='+item.foodimg "  alt="错误" >
                      </span>
                      <span class="mz"> {{item.foodname}} </span> 
                      <span class="sl">  {{'x'+item.dri_number}}</span>
                    </span>
                  </div>
                </div>
                <div class="cl-2 item-address">
                  <div>{{orderitem.raddress.ad_name}}</div>
                  <div>{{orderitem.raddress.ad_address + orderitem.raddress.ad_street}}</div>
                  <div>{{orderitem.raddress.ad_phone}}</div>
                </div>
                <div class="cl-1 paytype">
                  <span>支付宝</span>
                </div>
                <div class="cl-1">{{orderitem.allmoney+'￥'}}</div>
                <div class="cl-1 order-time">
                  <div>
                    {{orderitem.ordertime.split(".")[0].split('T')[0]}}
                  </div>
                  <div>
                   {{orderitem.ordertime.split(".")[0].split('T')[1]}}
                  </div>
                </div>
                <div class="cl-1">
                 {{orderitem.ordermore ? orderitem.ordermore : '无 '}}
                </div>
                <div class="cl-1">
                  <el-button
                    size="mini"
                    type="success"
                   
                    @click="updatastate(orderitem.orderid,1)">确认配送</el-button>
                  </div>
            </div>
          </div>
        </div>
        <!-- <el-table
          :data="orderlist"
          highlight-current-row
          border
          stripe
          @row-click='handleRowHandle'
          style="width: 100%"> 
          <el-table-column
            prop="orderid"
            label="订单号"
            width="180">
          </el-table-column>
          <el-table-column
            label="详情"
            width="200">
              <template slot-scope="scope">
                <span  @click="handleEdit(scope.$index, scope.row)" v-for=" (fooditem,index) in scope.row.rfood " :key='index'>
                  {{fooditem.foodname+' '+fooditem.dri_number+'份，'}}
                </span>
              </template>
          </el-table-column>
            <el-table-column
            prop="allmoney"
            label="总价(元)"
            width="120">
          </el-table-column>
            <el-table-column
            prop="raddress.ad_name"
            label="姓名"
            width="120">
          </el-table-column>
            <el-table-column
            prop="raddress.ad_phone"
            label="电话"
            width="180">
          </el-table-column>
            <el-table-column
            prop="raddress.ad_address"
            label="配送地址"
            width="180">
          </el-table-column>
          <el-table-column
            prop="ordertime"
            label="下单时间"
            width="180">
            <template slot-scope="scope">
                <span>
                {{scope.row.ordertime.split(".")[0].split('T').join(' ')}}
                </span>
              </template>
          </el-table-column>
            <el-table-column
            prop="ordermore"
            label="备注"
            width="180">
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="success"
                @click="handleEdit(scope.$index, scope.row)">确认配送</el-button>
            </template>
          </el-table-column>
        </el-table> -->
      </div>
    <div>

      <el-dialog
        title="订单编号"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose">
        <div class="orderitem">
          <orderitem  :porderlist='porderlist' @fatherMethod="fatherMethod"></orderitem>
        </div>
        <span slot="footer" class="dialog-footer">
          <!-- <el-button  size="mini" @click="dialogVisible = false">取 消</el-button>
          <el-button   size="mini" type="primary" @click="dialogVisible = false">确 定</el-button> -->
        </span>
      </el-dialog>
        
      </div>
    </div>
  </div>
</template>
<script>
import M from '../../../assets/js/common.js';
import orderitem from './orderitem'
export default {
  data(){
    return{
      allmoney:0,
      orderlist:[],
      fullscreenLoading: false,
      porderlist:[],
      dialogVisible: false,
      pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        time: '',
        input:''
    }
  },
  props:{
  },
  components:{
     orderitem
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
          url: '/yang/getordershop',
          headers: {
          },
          params: {
            shopid:this.$store.state.usershop.id,
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
    //订单查询
    searchordershop(){
      M.ajax({
          type: 'GET',
          url: '/yang/searchordershop',
          headers: {
          },
          params: {
            shopid:this.$store.state.usershop.id,
            state:0,
            searchtext:this.input
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
    updatastate(a,b){
      M.ajax({
          type: 'POST',
          url: '/yang/updatastate',
          headers: {
          },
          data: {
            id:a,
            state:b
          }
        }).then((value)=>{
          if (value.status === 200) {
            
            const loading = this.$loading({
              lock: true,
              text: '接单中...',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            setTimeout(() => {
              loading.close();
            }, 500);
          
            this.getorder();
          }
        }).catch((error)=>{
          if (error.response && error.response.status == 400) {
            this.msg = `${error.response.data.error}!`;
          }
      })
    },
    fatherMethod() {
      this.dialogVisible = false;
      this.getorder();
      
      },
    handleRowHandle(orderitem){
      this.porderlist.length=0;
      this.porderlist.push(orderitem);
      // console.log(111)
      // console.log(this.porderlist)
      this.dialogVisible = true
    },
    handleClose(done) {
       done();
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      //     done();
      //   })
      //   .catch(_ => {});
    } 
  }
}
</script>
<style  scoped>
.order{
  margin: 0 auto;
  width: 95%;
  padding: 10px;
}
.order-title{
  float: left;
  text-align: left;
  width: 100%;
}
.title-title{
  width: 100%;
  padding-bottom: 10px;
  font-size: 20px;
}
.title-inf{
  width: 100%;
}
.rinf{
  color: red;
  padding-right: 10px;
}
.fg{
  margin-top: 10px;
  float: left;
  width: 100%;
  border: 1px solid #eee;
}
.ordertable{
  width: 100%;
  float: left;
}
.ordertype{
  padding: 10px;
}
.block{
  float: left;
  margin-right: 10px;
}
.tablecen{
  width: 100%;
  float: left;
  padding: 10px;
  margin-top: 10px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: rgb(34, 24, 24);
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.orderitem{
  width: 100%;
}

.table-title{
  background: rgb(251, 242, 254);
  height:30px;
  line-height: 30px;
}
.cl-1,.cl-2,.cl-3,.cl-4,.cl-5,.cl-6,.cl-6，.cl-7，.cl-8，.cl-9{
    float: left;
    text-align: center;
    
}
.cl-1{
  width: 10%;
  /* padding-left: 5px;
  margin-left: -5px; */
}
.cl-2{
  width: 20%;
}
.cl-3{
  width: 30%;
}
.cl-4{
  width: 40%;
}
.cl-5{
  width: 50%;
}
.cl-6{
  width: 60%;
}
.cl-7{
  width: 70%;
}
.cl-8{
  width: 80%;
}
.cl-9{
  width: 90%;
}
.shopname{
  height: 30px;
  line-height: 30px;
  text-align: left;
}
.shopnameinf{
  color: rgb(31, 178, 151);
}
.orderid{
  text-align: left;
  height: 30px;
  background: rgb(251, 242, 254);
  line-height: 30px;
  padding-left: 20px;
  border-bottom: 1px solid #eee;
  border-top: 1px solid #eee;
}
.oriderdo{
  float: right;
  color: rgb(31, 178, 151);
  margin-right: 50px;
}
.oriderdo span:hover{
  cursor: pointer;
}
.order-item{
  width: 100%;
  min-height: 80px !important;
  line-height: 80px;
  overflow: hidden;
}
.order-item div{
  height: 100%;
}

.fitem{
  width: 100%;
  display: flex;
  height: 30px;
  line-height: 30px;
  margin-left: 20px;
}

.item-name{
 width: 100%;
 float: left;
 margin-left: 20px;
}

.item-name .mz{
  display: inline-block;
  width: 40%;
  text-align: left
}
.item-name .sl{
  display: inline-block;
  width: 30%;
  margin-right: 20px;
}
.item-name .fimg{
  text-align: left;
  width: 20%;
}
.item-name img{
  height: 29px;
  border-radius: 1px;
}
.order-item .cl-1,.cl-2,.cl-3,.cl-4,.cl-5,.cl-6,.cl-6，.cl-7，.cl-8，.cl-9{
  border-right: 1px solid #eee;
  margin-right: -1px;
  text-align: center;
}
.item-address {
  height: auto;
}
.item-address div{
  height: 27px;
  line-height: 27px;
}
.paytype span{
  background: rgb(64, 158, 255);
  color: white;
  padding: 5px;
}
.order-time div{
  height:40px;
  line-height: 40px;
  width: 100%;
}
</style>

