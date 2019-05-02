<template>
  <div class="order">  
    <div class="order-title">
      <div class="title-title">
        <h1>
          订单管理
        </h1>
      </div>
      <div class="title-inf">
        <span>配送数量：</span><span class="rinf"> 1</span>
      </div>
    </div>
    <div class="fg"></div>
    <div class="ordertable">
      <div class="ordertype">
        <div class="block">
           <el-button type="success" icon="el-icon-check" circle title="刷新" size="mini"></el-button>
        </div>
        <div class="block" style="float:right">
            <el-button type="primary" size="mini">搜索</el-button>
            <el-button type="success" size="mini">导出</el-button>
        </div>
        <div class="block"  style="float:right">
          <el-input v-model="input" placeholder="请输入内容" size="mini"></el-input>
        </div>
      </div>
      <div class="tablecen">
        <el-table
          :data="orderlist"
          highlight-current-row
          border
          stripe
          @row-click='handleRowHandle'
          style="width: 100%">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <div>
                    <ordermap :value="props"></ordermap>
                  </div>
                </template>
              </el-table-column>
          <el-table-column
            prop="orderid"
            label="订单号"
            width="120">
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
            width="120">
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
                @click="handleEdit(scope.$index, scope.row)">配送中</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    <div>

      <!-- <el-dialog
        title=""
        :visible.sync="dialogVisible"
        width="60%"
        :before-close="handleClose">
        <div class="orderitem">
          <orderitem></orderitem>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog> -->
      </div>
    </div>
  </div>
</template>
<script>
import M from '../../../assets/js/common.js';
import orderitem from './orderitem'
import ordermap from './ordertype22'
export default {
  data(){
    return{
      allmoney:0,
      orderlist:[],
      dialogVisible: false,
        time: '',
        input:''
    }
  },
  props:{
  },
  components:{
     orderitem,
     ordermap
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
    handleRowHandle(row,index,e){
      this.dialogVisible = true
      console.log(row)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
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
  padding-top: 10px;
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
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.orderitem{
  width: 100%;
}
</style>

