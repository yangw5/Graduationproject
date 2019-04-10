<template>
  <div class="foodinf">
    <div class="foodtype" @click="dialogFormVisible = true">
      <div class="foodtypeadd">
        <span>{{this.$route.query.type}}</span>
      </div>
    </div>
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
     <el-dialog
      width="40%"
      :title="title"
      :visible.sync="innerVisible"
      append-to-body>
      <el-form :model="newfood">
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="newfood.foodname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" :label-width="formLabelWidth">
          <el-input v-model="newfood.money" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品原料" :label-width="formLabelWidth">
          <el-input v-model="newfood.material" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品描述" :label-width="formLabelWidth">
          <el-input v-model="newfood.fooddescribe" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">取 消</el-button>
        <el-button type="primary" @click="foodok" >确 定</el-button>
      </div>
    </el-dialog>

    <el-form :model="form">
      <el-form-item label="商品分类名称" :label-width="formLabelWidth">
        <el-select v-model="form.name" placeholder="请选择商品分类" >
          <el-option v-for=" item in foodtype" :label="item.name" :value="item.name" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <div  v-if='form.name' class="creactfood">
        <el-button type="primary"  @click="addfood">新增食物</el-button>
      </div>
      <div>
        <el-table :data="fooditem" v-if="form.name" class="foodtable">
          <el-table-column property="foodname" label="食物名称" width="150"></el-table-column>
          <el-table-column property="money" label="食物价格" width="200"></el-table-column>
          <el-table-column property="material" label="食物原料" width="200"></el-table-column>
          <el-table-column property="fooddescribe" label="食物描述" width="200"></el-table-column>
          <el-table-column property="foodimg" label="食物图片" show-overflow-tooltip='true' width="200"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <i class="el-icon-edit"  @click="rfood(scope.row)" ></i>
              <i class="el-icon-delete" @click="deletefood(scope.row)"></i>
            </template>
          </el-table-column>
        </el-table>
      </div>
  
      <!-- <el-form-item label="活动区域" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item> -->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="upadtafood" >确 定</el-button>
    </div>
  </el-dialog>
  </div>
</template>
<script>
import M from '../../../assets/js/common.js';
export default {
  data(){
    return{
       title:this.$route.query.type+'信息',
       dialogFormVisible: false,
       innerVisible: false,
       addflog:false,
       imageUrl:'',
       foodtype:[],
       fooditem:[],
        form: {
          name: '',
          shopid:7,
          fooditem:[]
        },
        newfood:{
            foodname:'',
            money:'',
            material:'',
            foodimg:'',
            fooddescribe:''
            },
        formLabelWidth: '200px',
    }
  },
  props:{

  },
  watch:{

  },
  mounted:function(){
     this.getfooditem(this.$route.query.type);
     this.form.name=this.$route.query.type;
     this.gettype();
  },
  methods:{
    //获取food分类
    gettype(){
    M.ajax({
        type: 'GET',
        url: '/foodtype',
        headers: {
        },
        params: {
        }
      }).then((value)=>{
        if (value.status === 200) {
          let data = value.data.data;
          this.foodtype=data;
        }
      }).catch((error)=>{
        if (error.response && error.response.status == 400) {
          this.msg = `${error.response.data.error}!`;
        }
      })
    },
    
    //获取分类下的food
    getfooditem(ftype){
      M.ajax({
        type: 'GET',
        url: '/getfood',
        headers: {
        },
        params: {
          shopid:7,
          type:ftype
        }
      }).then((value)=>{
        if (value.status === 200) {
          let data = value.data.data;
          this.fooditem = data;
        }
      }).catch((error)=>{
        if (error.response && error.response.status == 400) {
          this.msg = `${error.response.data.error}!`;
        }
      })
    },
    //图片处理
         /**
     * 
     * blob二进制 to base64
     **/
      blobToDataURI(blob, callback) {
          var reader = new FileReader();
          reader.onload = function (e) {
              callback(e.target.result);
          }
          reader.readAsDataURL(blob);
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        
      },
      beforeAvatarUpload(file) {
        let _this=this;
        let base64=this.blobToDataURI(file,(url)=>{
          _this.newfood.foodimg=url;
          return url;
        } );   
      },
    //添加food
     foodok:function(){
      let  url='';
      if(this.addflog){
        url='/postfood';
        
      }else{
        url='/upadtafood';
      }
      M.ajax({
          type: 'POST',
          url: url,
          headers: {
          },
         data: {
           data:this.newfood
          }
        }).then((value)=>{
          if (value.status === 200) {
            let data = value.data.data;
              if(this.addflog){
                this.fooditem.push(this.newfood);
            }
            this.innerVisible = false;
            //this.foodtype=data;
            this.newfood={
              foodname:'',
              money:'',
              material:'',
              foodimg:'',
              fooddescribe:''
              };
          }
        }).catch((error)=>{
          if (error.response && error.response.status == 400) {
            this.msg = `${error.response.data.error}!`;
          }
       })

     },
     addfood(){
       this.innerVisible = true;
       this.addflog=true;

     },
     //查看food信息
     rfood(row){
       this.innerVisible = true;
       this.addflog=false;
       this.newfood=JSON.parse(JSON.stringify(row));
     },
     //删除单项food
     deletefood(row){
        console.log(row);
        this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this. deletefooddo(row.id);
        }).catch(() => {
          
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
     },
     //删除单项food
     deletefooddo(sid){
       M.ajax({
          type: 'GET',
          url: '/deletefood',
          headers: {
          },
         data: {
           id:sid
          }
        }).then((value)=>{
          if (value.status === 200) {
            let data = value.data.data;
            this.$message({
              type: 'success',
              message: '删除成功!'
            });

          let  index= this.fooditem.findIndex(function(item){
              return item.foodname == row.name; 
          })
          this.fooditem.splice(index,1);

          }
        }).catch((error)=>{
          if (error.response && error.response.status == 400) {
            this.msg = `${error.response.data.error}!`;
          }
       })
     },
     //修改food信息
     upadtafood(){
       alert('修改')
       this.dialogFormVisible = false;
       
    },
    //yang
    close(){
      this.$emit('chidledo');
    }
  }
  
  
}
</script>
<style scoped>

.foodinf{
  width: 80%;
  margin: 0 auto;
  text-align: left;
  margin-top: 20px;
  padding: 20px;
 
}
.foodtype{
  width: 400px;
  float: left;
  height:200px;
  border: 2px solid #eeeeee;
  display: flex;
  margin: 10px;
  justify-content: center;
  align-items: center;
}
.foodtype:hover{
  border-color: #1e89e0;
  color: #1e89e0;
}
.creactfood{
  text-align: right;
  padding: 20px;
}
.foodtable{
  padding: 5px;
  text-align: center;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }


</style>

