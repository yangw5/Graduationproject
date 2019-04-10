<template>
  <div class="foodinf">  
    <div class="">
      <div class="foodtype" v-for="item in getfooddata" :key="item.id" @click="getfooditem(item.foodtype)">
        <div class="foodtypeadd">
          <span>{{item.foodtype}}</span>
        </div>
      </div>
      <div class="foodtype" @click="dialogFormVisible = true">
        <div class="foodtypeadd" >
          <span>+</span>
          <span>添加新分类</span>
        </div>
      </div>
    </div>
    
  <el-dialog title="新增商品分类" :visible.sync="dialogFormVisible">
     <el-dialog
      width="40%"
      title="新增商品"
      :visible.sync="innerVisible"
      append-to-body>
      <el-form :model="newfood">
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="newfood.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" :label-width="formLabelWidth">
          <el-input v-model="newfood.price" auto-complete="off"></el-input>
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
          <el-input v-model="newfood.describe" auto-complete="off"></el-input>
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
        <el-table :data="form.fooditem" v-if="form.name" class="foodtable">
          <el-table-column property="name" label="食物名称" width="150"></el-table-column>
          <el-table-column property="price" label="食物价格" width="200"></el-table-column>
          <el-table-column property="material" label="食物原料" width="200"></el-table-column>
          <el-table-column property="describe" label="食物描述" width="200"></el-table-column>
          <el-table-column property="img" label="食物图片" show-overflow-tooltip='true' width="200"></el-table-column>
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
      <el-button type="primary" @click="postfood" >确 定</el-button>
    </div>
  </el-dialog>
  </div>
</template>
<script>
import M from '../../../assets/js/common.js';
import fooditem from "./fooditem";
export default {
  data(){
    return{
       dialogFormVisible: false,
       innerVisible: false,
       addflog:false,
       index:null,
       imageUrl:'',
       foodtype:[],
        form: {
          name: '',
          shopid:7,
          fooditem:[]
        },
        newfood:{
            name:'',
            price:'',
            material:'',
            img:'',
            describe:''
            },
        formLabelWidth: '200px',
        getfooddata:[],
    }
  },
  props:{
    switchcp: {
      type: Function,
      default: null
    }
  },
  components:{
    fooditem
  },
  mounted:function(){
    this.getfoodtype();
    //获取food分类
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
  methods: {
    //获取已有foodtype信息
    getfoodtype(){
        M.ajax({
          type: 'GET',
          url: '/shopfoodtype',
          headers: {
          },
          params: {
            shopid:7,
          }
        }).then((value)=>{
          if (value.status === 200) {
            let data = value.data.data;
            console.log(data);
            this.getfooddata=data;
          }
        }).catch((error)=>{
          if (error.response && error.response.status == 400) {
            this.msg = `${error.response.data.error}!`;
          }
    })
    },
    //获取分类下的food
    getfooditem(ftype){
      this.$router.push({path:'/shopcenter/fooditem', query: {type: ftype}});
    },
    //图片处理
    /**
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
          _this.newfood.img=url;
          return url;
        } );   
      },
    //添加food
     foodok:function(){
       if(this.addflog){
        this.form.fooditem.push(this.newfood);//添加新food
       }else{
         this.form.fooditem.splice(this.index,1,this.newfood)//修改food
       }
       this.innerVisible = false;
       this.newfood={//清空
            name:'',
            price:'',
            material:'',
            img:'',
            describe:''
            };
     },
     //查看food信息
     rfood(row){
        this.index= this.form.fooditem.findIndex(function(item){
          return item.name == row.name; 
       })//记录food的index
       this.innerVisible = false;
       this.addflog=false;//判断修改还是新增
       this.innerVisible = true;
       this.newfood=JSON.parse(JSON.stringify(row));//copy row
     },
     //删除单项food
     deletefood(row){
      let  index= this.form.fooditem.findIndex(function(item){
          return item.name == row.name; 
      })
      this.form.fooditem.splice(index,1);
     },
     //上传food信息
     postfood(){
       M.ajax({
          type: 'POST',
          url: '/postfood',
          headers: {
          },
         data: {
           data:this.form
          }
        }).then((value)=>{
          if (value.status === 200) {
            alert(10);
            let data = value.data.data;
            this.getfoodtype();
            this.dialogFormVisible = false;
          }
        }).catch((error)=>{
          if (error.response && error.response.status == 400) {
            this.msg = `${error.response.data.error}!`;
          }
       })
    },
    //增加
    addfood(){
      this.innerVisible = true;
      this.addflog=true;
    }
     
    }
}
</script>
<style  scoped>
.foodinf{
  width: 90%;
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

