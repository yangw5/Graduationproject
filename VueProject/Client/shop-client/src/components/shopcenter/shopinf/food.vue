<template>
  <div class="foodinf">  
    <div class="foodinf-type">
        <div class="serrch-food">
          <el-input
            placeholder="搜索商品"
            prefix-icon="el-icon-search"
            v-model="serchtext">
          </el-input>
        </div>
        <div class="type-items">
          <el-menu
            default-active="100"
            class="el-menu-vertical-demo"
            >
            <!-- background-color="#eee"
            text-color="#8c939d"
            active-text-color="#ffd04b" -->
            <el-menu-item :index="100"   @click="showfoodtype(100)">
              <span slot="title">全部商品分类</span>
            </el-menu-item>
            <el-menu-item  v-for="(item,index)  in getfooddata" :key="item.id" :index='index' @click="showfoodtype(item.foodtype)">
              <span slot="title">{{item.foodtype}}</span>
            </el-menu-item>
          </el-menu>
        </div>
    </div>
    <div class="foodinf-item">
      <div class="showtype">
        <div class="add-food">
          <el-switch
            v-model="showtype"
            active-text="表格"
            inactive-text="">
          </el-switch>
           <el-switch
            v-model="showtype1"
            active-text="下架商品"
            @change='foodstypeshow'
            inactive-text="">
          </el-switch>
        </div>
        <div class="showtype-text">
          <el-button type="primary" size="mini" @click="addfood">新增商品</el-button>
        </div>
      </div>
      <div class="allfoods"  v-if="showtype">
        <el-table
          :data="allfoods"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="图片"
            width="120">
            <template slot-scope="scope"> 
              <div class="food-img">
                <img  :src=" 'http://localhost:8888/getimg?himg='+ scope.row.foodimg " alt="">
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="商品名称"
            prop='foodname'
            width="120">
          </el-table-column>
          <el-table-column
            label="价格"
             prop='money'
            width="80">
          </el-table-column>
          <el-table-column
            label="分类"
             prop='foodtype'
            width="80">
          </el-table-column>
          <el-table-column
            label="原料"
             prop='material'
            width="120">
          </el-table-column>
          <el-table-column
            label="描述"
             prop='fooddescribe'
            width="180">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <i class="el-icon-edit" title="修改" @click="handleEdit(scope.$index, scope.row)" ></i>
              <i class="el-icon-delete" title="删除" @click="handleDelete(scope.$index, scope.row)"></i>
              <i class="el-icon-star-off"  v-if="!showtype1" title="下架" @click="handleDelete1(scope.$index, scope.row)"></i>
              <i class="el-icon-star-on"  v-if="showtype1" title="上架" @click="handleDelete2(scope.$index, scope.row)"></i>
             
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>


    <div class="foodlist"  v-if="!showtype">
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
    
     <el-dialog
      width="40%"
      title="修改商品"
      :visible.sync="innerVisible"
      append-to-body>
      <el-form :model="newfood">
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="newfood.foodname" auto-complete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" :label-width="formLabelWidth">
          <el-input v-model="newfood.money" auto-complete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="商品分类" :label-width="formLabelWidth">
        <el-select v-model="newfood.foodtype" placeholder="请选择商品分类" >
          <el-option v-for=" item in foodtype" :label="item.name" :value="item.name" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
        <el-form-item label="商品原料" :label-width="formLabelWidth">
          <el-input v-model="newfood.material" auto-complete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl " :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon avatar"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品描述" :label-width="formLabelWidth">
          <el-input v-model="newfood.fooddescribe" auto-complete="off" size="mini"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false" size="mini" >取 消</el-button>
        <el-button type="primary" @click="foodok" size="mini" >确 定</el-button>
      </div>
    </el-dialog>

    <!-- <el-form :model="form">
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
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="postfood" >确 定</el-button>
    </div> -->
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
       imageUrl:'',
       foodtype:[],
        form: {
          name: '',
          shopid:7,
          fooditem:[]
        },
        newfood:{//
            name:'',
            price:'',
            material:'',
            img:'',
            describe:''
            },
        formLabelWidth: '100px',//宽度
        getfooddata:[],
        serchtext:'',//商品搜索
        allfoods:[],//所以商品数组
        showtype:true,//显示类型
        showtype1:false,//显示类型
        showindex:100,//显示的类型
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
    this.getallfoods();

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
    //获取全部商品
    getallfoods(){
      M.ajax({
        type: 'GET',
        url: '/yang/getallfood',
        headers: {
        },
        params: {
          shopid:7,
          type:this.showtype1
        }
      }).then((value)=>{
        if (value.status === 200) {
          let data = value.data.data;
          console.log(data);
          this.allfoods=data;
        }
      }).catch((error)=>{
        if (error.response && error.response.status == 400) {
          this.msg = `${error.response.data.error}!`;
        }
      })
    },
    foodstypeshow(){
       if(this.showindex===100){
          this.getallfoods()
        }else{
          this.showfoodtype(this.showindex) 
        }
    },
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
    //获取分类下的商品
    showfoodtype(ftype){
      this.showindex=ftype;
      if(ftype == 100){
         this.getallfoods()
      }else{
       M.ajax({
        type: 'GET',
        url: '/getfood',
        headers: {
        },
        params: {
          shopid:7,
          type:ftype,
          state:this.showtype1
          
        }
      }).then((value)=>{
        if (value.status === 200) {
          let data = value.data.data;
           this.allfoods=data;
        }
      }).catch((error)=>{
        if (error.response && error.response.status == 400) {
          this.msg = `${error.response.data.error}!`;
        }
      })
    }

    },
    //新增food
    addfood(){
      this.innerVisible = true;
      this.addflog=true;
      this.newfood={}
    },
    //查看food详情
    handleEdit(index, row) {
      this.innerVisible = true;
      this.addflog=false;
      this.imageUrl='http://localhost:8888/getimg?himg='+row.foodimg;
      this.newfood=JSON.parse(JSON.stringify(row));
    },
    //删除 逻辑删除
    handleDelete(index, row) {
       this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           M.ajax({
              type: 'GET',
              url: '/yang/deletefood',
              headers: {
              },
              params: {
                id:row.id
              }
            }).then((value)=>{
              if (value.status === 200) {
                let data = value.data.data;
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              if(this.showindex===100){
                this.getallfoods()
              }else{
                this.showfoodtype(this.showindex) 
              }
            }

            }).catch((error)=>{
              if (error.response && error.response.status == 400) {
                this.msg = `${error.response.data.error}!`;
              }
          })
          
        }).catch(() => {
          
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
      //商品下架
      handleDelete1(index, row) {
       this.$confirm('此操作将该商品下架 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           M.ajax({
              type: 'POST',
              url: '/yang/downfood',
              headers: {
              },
              data: {
                foodstate:1,
                id:row.id
              }
            }).then((value)=>{
              if (value.status === 200) {
                let data = value.data.data;
                this.$message({
                  type: 'success',
                  message: '下架成功!'
                });
              }
                   console.log(111111111111)
              console.log(this.showindex)
              if(this.showindex === 100){
                this.getallfoods()
              }else{
                this.showfoodtype(this.showindex) 
              }

            }).catch((error)=>{
              if (error.response && error.response.status == 400) {
                this.msg = `${error.response.data.error}!`;
              }
          })
          
        }).catch(() => {
          
          this.$message({
            type: 'info',
            message: '已取消下架'
          });          
        });
    },
    //上架
     handleDelete2(index, row){
        this.$confirm('此操作将该商品上架 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           M.ajax({
              type: 'POST',
              url: '/yang/downfood',
              headers: {
              },
              data: {
                foodstate:0,
                id:row.id
              }
            }).then((value)=>{
              if (value.status === 200) {
                let data = value.data.data;
                this.$message({
                  type: 'success',
                  message: '上架成功!'
                });
              }
              if(this.showindex===100){
                this.getallfoods()
              }else{
                this.showfoodtype(this.showindex) 
              }

            }).catch((error)=>{
              if (error.response && error.response.status == 400) {
                this.msg = `${error.response.data.error}!`;
              }
          })
          
        }).catch(() => {
          
          this.$message({
            type: 'info',
            message: '已取消上架'
          });          
        });
     },

    //获取分类下的food
    getfooditem(ftype){
      this.$router.push({path:'/shopcenter/shop/fooditem', query: {type: ftype}});
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
        alert(file.size/1024/1024)
        // console.log(file);
        let _this=this;
        let base64=this.blobToDataURI(file,(url)=>{
          _this.newfood.foodimg=url;
          return url;
        } );   
      },
    //添加还是修改
     foodok:function(){
      let  url='';
      this.newfood.shopid=7;
      if(this.addflog){
        url='/yang/postfood1';//增加
      }else{
        url='/upadtafood';//修改
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

            const loading = this.$loading({
                lock: true,
                text: '操作中...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });
              setTimeout(() => {
                loading.close();
              }, 1000);             
            this.innerVisible = false;

            this.newfood={
              foodname:'',
              money:'',
              material:'',
              foodimg:'',
              fooddescribe:''
              };
              if(this.showindex===100){
                this.getallfoods()
              }else{
                this.showfoodtype(this.showindex) 
              }
             
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
.foodinf{
  width: 100%;
  margin: 0 auto;
  text-align: left;
  /* margin-top: 20px; */
  padding: 10px;
}
/* 左侧商品分类 */
.foodinf-type{
  width: 19%;
  float: left;
  height: 500px;
  border-right: 1px solid #eee;
}

.serrch-food{
  width: 80%;
  margin: 10px auto;
}
.type-items >>> .el-menu-item{
  border-bottom: 1px solid #eee;
}

/* .type-item{
  background: #eee;
  height: 50px;
  text-align: center;
  line-height: 50px;
  border-bottom: 1px solid white;
}
.type-item :hover{
  background-color: #8c939d;
}
.type-item-text{

} */

/* 右侧商品列表 */
.foodinf-item{
  width: 80%;
  float: left;
}

.allfoods{
  width: 98%;
  margin: 10px auto;
  border-bottom: 1px solid #eee;
}

.showtype{
  width: 90%;
  margin: 5px auto;
  height: 40px;
  border-bottom: 1px solid #eee;
}
.add-food{
  width: 30%;
  float: left;
}
.showtype-text{
  float: right;
  width: 30%;
  text-align: right;
}
 
.food-img img{
  height: 30px;
}

.el-icon-edit,.el-icon-delete{
  margin-right: 20px;
}




/* //////////// */
.foodtype{
  width: 200px;
  float: left;
  height:200px;
  border: 2px solid #eeeeee;
  display: flex;
  margin: 5px;
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
    width: 100px;
    height: 100px;
    display: block;
  }

</style>

