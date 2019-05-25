<template>
  <div class="orderdata">  
   <div class="order-title" v-if="this.$route.query.state !== 0">
      <div class="title-title">
        <h1>
          订单管理/{{this.$route.query.state===4 ? '已完成' : '已取消'}}
        </h1>
      </div>
      <div class="title-inf">
        <span>订单数量：</span><span class="rinf"> {{this.orderlist.length}}</span>
        <!-- <span>订单金额：</span><span class="rinf">10</span> -->
      </div>
    </div>
    <div class="fg"></div>
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
        <el-button type="primary" size="mini" @click="searchordershop">查看</el-button>
      </div>
      <div class="block" style="float:right">
          <el-button type="primary" size="mini" @click="searchordershop">搜索</el-button>
          <el-button type="success" size="mini">导出</el-button>
      </div>
      <div class="block"  style="float:right">
        <el-input v-model="input" placeholder="请输入内容" size="mini"></el-input>
      </div>
    </div>

    <div class="fg"></div>
    <div class="ordertype" v-if="this.$route.query.state === 0">
      <el-button type="success" size="mini" @click="showcheck(1)">交易成功</el-button>
      <el-button type="danger" size="mini" @click="showcheck(2)">交易失败</el-button>
      <el-button type="primary" size="mini" @click="showcheck(3)">只看今天</el-button>
    </div>
    <div class="fg"></div>

    <div class="ordertable">
      <el-table
        :data="orderlist"
        highlight-current-row
        border
        stripe
        @row-click='handleRowHandle'
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
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
          label="备注">
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
        title="订单编号111"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose">
        <div class="orderitem">
          <orderitem  :porderlist='porderlist'></orderitem>
        </div>
        <span slot="footer" class="dialog-footer">
          <!-- <el-button  size="mini" @click="dialogVisible = false">取 消</el-button>
          <el-button   size="mini" type="primary" @click="dialogVisible = false">确 定</el-button> -->
        </span>
      </el-dialog>
  </div>
</template>
<script>
import orderitem from './orderitem'
import M from '../../../assets/js/common.js';
export default {
  data(){
    return{
      allmoney:0,
      orderlist: [],
      porderlist:[],
      dialogVisible: false,
      state:0,pickerOptions: {
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
        time:[],
        input:''
    }
  },
  props:{
  },
  components:{
    orderitem
  },
  mounted:function(){
    // alert(this.$route.query.state)
    this.state= this.$route.query.state;
    this.time=[];
    this.getorder('');
  },
  
watch: {
      $route(){
        // this.getorder('');
        this.state = this.$route.query.state;
      },
      state() {
        this.getorder('');
      },
},
  methods: {
    // 已知商店id
    //ajsx请求 
    //获取配送地址
    //获取配送food
    //获取用户信息
    getorder(time1){
        M.ajax({
          type: 'GET',
          url: '/yang/getordershop',
          headers: {
          },
          params: {
            shopid:this.$store.state.usershop.id,
            state: this.state,
            time:time1
          }
        }).then((value)=>{
          if (value.status === 200) {
            this.orderlist = value.data.data;
            console.log(value.data.data);
          }
        }).catch((error)=>{
          if (error.response && error.response.status == 400) {
            this.msg = `${error.response.data.error}!`;
          }
      })
    },
    searchordershop(a){
      if(a===3){
        let day1=new Date()
       
        let d1=day1.getFullYear()+"-" + (day1.getMonth()+1) + "-" + day1.getDate()+' 00:00:00';
        let d2=day1.getFullYear()+"-" + (day1.getMonth()+1) + "-" + day1.getDate()+' 23:59:59';
        this.time[0]=d1;
        this.time[1]=d2;

      }else{
        if(this.time.length<1){
          alert('请选择时间')
          return;
        }else{
          this.time[0]=this.time[0]||M.format(this.time[0],'-');
          this.time[1]=this.time[1]||M.format(this.time[1],'-');
        }
      }
     
        M.ajax({
          type: 'POST',
          url: '/yang/searchordershop',
          headers: {
          },
          data: {
            shopid:this.$store.state.usershop.id,
            state: this.state,
            searchtext:this.input,
            time:this.time
          }
        }).then((value)=>{
          if (value.status === 200) {
            this.orderlist = value.data.data;
            console.log(value.data.data);
          }
        }).catch((error)=>{
          if (error.response && error.response.status == 400) {
            this.msg = `${error.response.data.error}!`;
          }
      })
    },  
    showcheck(a){
      
      if(a==3){
        this.searchordershop(3);
      }
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
    },
    // showcheck(index){
    //   alert(index)
    // },
    handleEdit(index, row) {
        console.log(index, row);
    },
    handleRowHandle(row, column, event){
      this.porderlist.length=0;
      this.porderlist.push(row);
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

.orderdata{
  width: 95%;
  margin: 10px auto;
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


.ordertype{
  width: 100%;
  text-align: left;
  float: left;
  padding: 10px;
}
.ordertable{
  width: 100%;
  padding: 10px;
}
.orderitem{
  width: 100%;
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
  margin: 10px 0px;
  float: left;
  width: 100%;
  border: 1px solid #eee;
}

</style>

