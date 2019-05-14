<template>
  <div class="item">  
    <div class="dosomething">
        <el-button  size="mini" @click="flog=!flog">{{flog? '修改':"取消"}}</el-button>
    </div>
    <el-form ref="form" :rules="rules" :model="form" label-width="200px" class="demo-ruleForm" size='mini '>
        <div>
          <el-form-item label="门店名称 : " prop="shopname">
            <el-input size="mini" v-model="form.shopname"  placeholder="请与门店照片上的名字一致" required="true" :disabled='this.flog'></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="外卖电话 : " prop="shopphone">
            <el-input   size="mini" v-model="form.shopphone" required="true" :disabled='this.flog'></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="联系人姓名 : " prop="uname">
            <el-input  size="mini" v-model="form.uname" required="true" :disabled='this.flog'></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="联系人电话 : " prop="uphone">
            <el-input  size="mini" v-model="form.uphone" required="true" :disabled='this.flog'></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="门店分类:">
            <el-select v-model="shoptype[form.shoptype]" placeholder="请选择活门店分类" :disabled='this.flog'>
              <el-option  size="mini" v-for="(value,index) in shoptype"  :key="index" :value="value"></el-option>
            </el-select>
          </el-form-item>
        </div>  
        <!-- <div>
          <el-form-item label="城市 : " prop="address" >
            <el-input v-model="form.address" required="true"></el-input>
            <el-cascader
              :disabled='this.flog'
              :options="options2"
              @active-item-change="handleItemChange"
              :props="props"
            ></el-cascader>
          </el-form-item>
        </div> -->
        <div>
          <el-form-item label="门店地址: " prop="address">
            <el-input v-model="form.address"  size="mini" required="true" :disabled='this.flog' @blur="this.mapshow"></el-input>
            <div id="allmap" ref="allmap">

            </div>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="门店照片 : " prop="shopimage">
          <el-upload
           :disabled='this.flog'
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          </el-form-item>
        </div>
        <!-- <div>
          <el-form-item label="门店logo : " prop="shoplogo">
            <el-upload
              :disabled='this.flog'
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess1"
              :before-upload="beforeAvatarUpload1">
              <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </div> -->
        <div class="resave">            
            <el-button type="primary" v-if='!this.flog' @click="resave">提交</el-button>
        </div>
      </el-form>
  </div>
</template>
<script>
import M from '../../../assets/js/common.js';
export default {
  data(){
    return{
      flog:true,
      imageUrl:'',
      imageUrl1:'',
      shoptype:[
        '美食','水果','饮品甜品','午餐','速食简餐',
        '汉堡披萨','米线面馆','鸭脖卤味','炸鸡炸串','包子粥店'
      ],
      form: {
        // shopname: '叫了只鸡',
        // shopphone:'15208192473',
        // uname: '杨文伍',
        // uphone: '15208192473',
        // shopimage: '',
        address:'成都市',
        // // shoplogo:'',
        // shoptype: '外卖'
        },
        //表单规则
         rules: {
         shopname: [
            { required: true, message: '请输入门店名称', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
         },
        props: {
          value: 'label',
          children: 'cities'
        }
         
    }
  },
  props:{
    switchcp: {
      type: Function,
      default: null
    }
  },
  mounted(){
    this.shopinit()
     
  },
  methods: {
    shopinit(){
      //获取商店信息
    M.ajax({
      type: 'GET',
      url: '/yang/getshop',
      headers: {
      },
      params: {
        shopid:this.$store.state.usershop.id
      }
    }).then((value)=>{
      if (value.status === 200) {
        let data = value.data.data;
        console.log(data)
        this.form=data;
        this.mapshow();
        this.imageUrl='http://localhost:8888/getimg?himg='+this.form.shopimage
        // console.log(2222222222)
        // console.log(this.form);
      }
    }).catch((error)=>{
      if (error.response && error.response.status == 400) {
        this.msg = `${error.response.data.error}!`;
      }
    })
    },
     //提交表单
      onSubmit() {
        this.switchcp(this.form);

      },
      //地址选择
       handleItemChange(val) {
        console.log('active item:', val);
        setTimeout(_ => {
          if (val.indexOf('江苏') > -1 && !this.options2[0].cities.length) {
            this.options2[0].cities = [{
              label: '南京'
            }];
          } else if (val.indexOf('浙江') > -1 && !this.options2[1].cities.length) {
            this.options2[1].cities = [{
              label: '杭州'
            }];
          }
        }, 300);
      },

      //图片上传获取地址和上传规则
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        // this.form.shopimage=this.imageUrl;
      },
      beforeAvatarUpload(file) {
      //   const isJPG = file.type === 'image/jpeg';
      //   const isLt2M = file.size / 1024 / 1024 < 2;
      //   if (!isJPG) {
      //     this.$message.error('上传头像图片只能是 JPG 格式!');
      //   }
      //   if (!isLt2M) {
      //     this.$message.error('上传头像图片大小不能超过 2MB!');
      //   }
      //   return isJPG && isLt2M;
      // }
         let _this=this;
        let base64=this.blobToDataURI(file,(url)=>{
          _this.form.shopimage=url;
          return url;
        } );   
      
      },
      blobToDataURI(blob, callback) {
          var reader = new FileReader();
          reader.onload = function (e) {
              callback(e.target.result);
          }
          reader.readAsDataURL(blob);
      },
      
      handleAvatarSuccess1(res, file) {
        this.imageUrl1 = URL.createObjectURL(file.raw);
        this.form.shoplogo=this.imageUrl1;
      },
      beforeAvatarUpload1(file) {
      },
      mapshow(){
          // 百度地图API功能
        // alert(this.form.address)
        var map = new BMap.Map(this.$refs.allmap);
        var point = new BMap.Point(103.9615785164,30.78);
        map.centerAndZoom(point,12);
        // 创建地址解析器实例
        var myGeo = new BMap.Geocoder();
        let _this=this;
        // 将地址解析结果显示在地图上,并调整地图视野
        myGeo.getPoint(_this.form.address, function(point){
          if (point) {
            map.centerAndZoom(point, 16);
            map.addOverlay(new BMap.Marker(point));
          }else{
            console.log("您选择地址没有解析到结果!");
          }
        }, "成都市");
      },
      resave(){
        console.log(this.form)
        this.form.id=this.$store.state.usershop.id;
        //修改商店信息
        M.ajax({
          type: 'POST',
          url: '/yang/uploadshop',
          headers: {
          },
          data: {
            data:this.form
          }
        }).then((value)=>{
          if (value.status === 200) {
            let data = value.data.data;
            const loading = this.$loading({
                lock: true,
                text: '修改中...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });
              setTimeout(() => {
                loading.close();
              }, 1000);
            this.shopinit()
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
.item{
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  text-align: left;
  margin-top: 20px;
  box-shadow: #8c939d 1px 1px  5px;
  /* min-height: 1200px; */
}


/* .item >>> .el-input__inner{
  margin-top: 10px;
  height: 50px;
  width: 50%;
  float: left;
  margin-left: 50px;
}
.item >>> .el-form-item__label{
  margin-top: 10px;
  height: 50px;
  line-height: 50px;
  font-size: 24px;

}

.register-step{
  overflow: hidden;

} */


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
    font-size: 20px;
    color: #8c939d;
    width:80px;
    height: 80px;
    line-height:80px;
    text-align: center;
  }
  .avatar {
    width: 80px;
    height:80px;
    display: block;
  }
.dosomething{
  text-align: right;
  margin-bottom: 10px;
}
#allmap{
  height:200px;
  margin-top: 20px;
  overflow: hidden;
}
.resave{
  text-align: right;
}
</style>

