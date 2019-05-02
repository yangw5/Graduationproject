<template>
  <div class="orderdata">  
    <div class="ordertype">
      <el-button type="success" @click="showcheck(1)">交易成功</el-button>
      <el-button type="danger" @click="showcheck(2)">交易失败</el-button>
      <el-button type="primary" @click="showcheck(3)">只看今天</el-button>
    </div>
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
      dialogVisible: false,
      state:0,
    }
  },
  props:{
  },
  components:{
    orderitem
  },
  mounted:function(){
    // alert(this.$route.query.state)
    this.state= this.$route.query.state
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
    showcheck(a){
      alert(this.$route.query.state)
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

.orderdata{
  width: 100%;
}
.ordertype{
  width: 100%;
  text-align: left;
  padding: 10px;
}
.ordertable{
  width: 100%;
  padding: 10px;
}
.orderitem{
  width: 100%;
}

</style>

