<template>
  <div class="item">  
    <el-form ref="form" :rules="rules" :model="form" label-width="300px" class="demo-ruleForm" size='medium '>
        <div>
          <el-form-item label="门店名称 : " prop="shopname">
            <el-input v-model="form.shopname"  placeholder="请与门店照片上的名字一致" required="true"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="外卖电话 : " prop="shopphone">
            <el-input v-model="form.shopphone" required="true"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="联系人姓名 : " prop="uname">
            <el-input v-model="form.uname" required="true"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="联系人电话 : " prop="uphone">
            <el-input v-model="form.uphone" required="true"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="门店分类:">
            <el-select v-model="form.shoptype" placeholder="请选择活门店分类">
              <el-option label="快餐" value="快餐"></el-option>
              <el-option label="外卖" value="外卖"></el-option>
            </el-select>
          </el-form-item>
        </div>  
        <div>
          <el-form-item label="城市 : " prop="address">
            <!-- <el-input v-model="form.address" required="true"></el-input> -->
            <el-cascader
              :options="options2"
              @active-item-change="handleItemChange"
              :props="props"
            ></el-cascader>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="门店地址: " prop="address">
            <el-input v-model="form.address" required="true"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="门店照片 : " prop="shopimage">
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
        </div>
        <div>
          <el-form-item label="门店logo : " prop="shoplogo">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess1"
              :before-upload="beforeAvatarUpload1">
              <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </div>
        <div>            
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交进入下一步</el-button>
          </el-form-item>
        </div>
      </el-form>
  </div>
</template>
<script>
export default {
  data(){
    return{
      imageUrl:'',
      imageUrl1:'',
      form: {
        shopname: '叫了只鸡',
        shopphone:'15208192473',
        uname: '杨文伍',
        uphone: '15208192473',
        shopimage: '',
        address:'成都西华',
        shoplogo:'',
        shoptype: '外卖'
        },
        //表单规则
         rules: {
         shopname: [
            { required: true, message: '请输入门店名称', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
         },
          options2: [{
          label: '江苏',
          cities: []
        }, {
          label: '浙江',
          cities: []
        }],
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
  methods: {
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
        this.form.shopimage=this.imageUrl;
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
      },
       handleAvatarSuccess1(res, file) {
        this.imageUrl1 = URL.createObjectURL(file.raw);
        this.form.shoplogo=this.imageUrl1;
      },
      beforeAvatarUpload1(file) {
      }

    }
}
</script>
<style  scoped>
.item{
  width: 80%;
  margin: 0 auto;
  text-align: left;
  margin-top: 20px;
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

