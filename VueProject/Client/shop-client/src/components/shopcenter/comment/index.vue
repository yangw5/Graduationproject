<template>
  <div class="Navigation">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item  v-for="(value,index) in datalist" :title="index+':   '+value.ev_inf +'--------------------------'+ value.ev_time.split('.')[0].split('T')[0]+' '+value.ev_time.split('.')[0].split('T')[1]" :key="index" :name="index">
        <div class='card'>
          <el-card :body-style="{ padding: '0px' }">
            <img  :src=" 'http://localhost:8888/getimg?himg='+value.ev_img" class="image">
            <div style="padding: 14px;">
              <span>{{value.ev_inf}}</span>
              <div class="bottom clearfix">
                <time class="time">{{value.ev_time}}</time>
                <el-dropdown  @command="handleCommand">
									<span class="el-dropdown-link">
										更多操作<i class="el-icon-arrow-down el-icon--right"></i>
									</span>
									<el-dropdown-menu slot="dropdown">
										<el-dropdown-item :command="{type:1,index:value.ev_id,text:value.ev_reply}">回复修改</el-dropdown-item>
										<el-dropdown-item :command="{type:2,index:value.ev_id,orid:value.ev_Ordersnumber}">查看订单</el-dropdown-item>
									</el-dropdown-menu>
								</el-dropdown>
              </div>
            </div>
          </el-card>
        </div>
				<div class='card1'>
					 <el-card>
						回复： {{value.ev_reply}}
						</el-card>
					</div>
      </el-collapse-item>
    </el-collapse>
						<el-dialog
							title="提示"
							:visible.sync="dialogVisible"
							width="30%"
							:before-close="handleClose">
							<div  class='card'>
								<el-card :body-style="{ padding: '0px' }">
									<el-input
										type="textarea"
										:rows="5"
										placeholder="请输入回复内容"
										v-model="textarea">
									</el-input>
								</el-card>
							</div>
							<span slot="footer" class="dialog-footer">
								<el-button @click="dialogVisible = false">取 消</el-button>
								<el-button type="primary" @click="postcomment()">确 定</el-button>
							</span>
				</el-dialog>
						<el-dialog
							title="订单详情"
							:visible.sync="dialogVisible2"
							width="50%"
							:before-close="handleClose">
							<div  class='card2'>
								<el-card :body-style="{ padding: '0px' }">
									<orderitem :porderlist='porderlist'></orderitem>
								</el-card>
							</div>
				</el-dialog>
		
  </div>
</template>
<script>
import M from '../../../assets/js/common.js';
import orderitem from '../order/orderitem'
export default {
  data(){
    return{
      activeNames: ['1'],
      datalist:[],
			rcall:false,
			textarea:'',
			evid:0,
      dialogVisible: false,
      dialogVisible2:false,
      porderlist:[]
    
    }
  },
  props:{

  },
  components:{
     orderitem
  },
  mounted(){
    this. init();
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleChange(val) {
        console.log(val);
    },
		handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //获取评论
    init(){
      console.log(this.$store.state.usershop)
        M.ajax({
          type: 'GET',
          url: '/yang/getevaluate2',
          headers: {
          },
          params: {
           shopid:7
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
    //更多操作
		handleCommand(command) {
      if(command.type==1){//回复
        this.evid=command.index
        this.dialogVisible = true;
        this.textarea=command.text
      }else{//订单详情
        // alert(command.orid)
        this.searchordershop(command.orid);
        this.dialogVisible2 = true;
      }
			
      },
    showorder(evid){
      alert(evid);
    },
    //回复信息
		postcomment(){
			  M.ajax({
			   type: 'POST',
			   url: '/yang/shopcomment',
			   headers: {
			   },
			   data: {
			    id:this.evid,
					reply:this.textarea
			   }
			 }).then((value)=>{
			   if (value.status === 200) {
			     let data = value.data.data;
					 this.init();
					 this.dialogVisible = false;
			     console.log(data);
						}
			 }).catch((error)=>{
			   if (error.response && error.response.status == 400) {
			     this.msg = `${error.response.data.error}!`;
			   }
			})
    },
    //订单查询
    searchordershop(ev_Ordersnumber ){//通过评论获取订单号ev_Ordersnumber 
        let time=[]
        let day1=new Date()
        let d1=day1.getFullYear()+"-" + '01' + "-" + '01'+' 00:00:00';
        let d2=day1.getFullYear()+"-" + (day1.getMonth()+1) + "-" + day1.getDate()+' 23:59:59';
        time[0]=d1;
        time[1]=d2;
      M.ajax({
          type: 'POST',
          url: '/yang/searchordershop',
          headers: {
          },
          data: {
            shopid:this.$store.state.usershop.id,
            state:3,
            searchtext:ev_Ordersnumber,
            time:time
          }
        }).then((value)=>{
          if (value.status === 200) {
            this.porderlist.length=0;
            this.porderlist.push(value.data.data[0]);
            console.log(this.porderlist);
          }
        }).catch((error)=>{
          if (error.response && error.response.status == 400) {
            this.msg = `${error.response.data.error}!`;
          }
      })
    },
},
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
.card2{
  /* width: 300px; */
   width: 100%;
}
.card{
  width: 300px;
}
.card1{
	width: 300px;
	text-align: left;
}
  .image {
    width:20%;
    padding: 10px;
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
	  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .el-dropdown{
    margin-top: 10px;
  }

</style>

