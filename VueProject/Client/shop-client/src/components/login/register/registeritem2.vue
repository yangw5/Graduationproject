<template>
  <div class="item">  
    <el-form label-width="300px" class="demo-ruleForm" size='medium '>
        <div>            
          <el-form-item>
             <el-button type="primary" @click="goback">返回上一步</el-button>
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
    }
  },
   methods: {
     //提交表单
      onSubmit() {
        this.$emit('switchcpB',true)
      },
      //返回上一步
      goback(){
         this.$emit('switchcpB',false)
      },

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

