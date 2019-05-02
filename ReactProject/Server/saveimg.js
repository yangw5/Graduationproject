var fs = require("fs");  // 引入fs模块
var formidable = require('formidable');
// var sd = require("silly-datetime");
var path = require("path");

//base64 用户图片存储到本地
function savebase64(url){

        let path= './imgs/'+ "yang5/"
        // fs.mkdir(path ,function(err){

        //     if (err) {  
        //         return console.error(err);  
        //     }
        //     console.log("目录创建成功。");
        //  });
         let time=Date.now();
         let newpath= './imgs/'+ "yang5/"+time+'.png';
            fs.writeFileSync(newpath,"");
        //  let ppath=__dirname+'/imgs/'+ "yang5/"+time+'.png'
        //     console.log(__dirname);
        //     console.log(newpath);
        //     ppath=ppath.replace(/\\/g,"/");
        //     console.log(ppath);
    
         let base64 = url.replace(/^data:image\/\w+;base64,/, ""); //去掉图片base64码前面部分data:image/png;base64
         let dataBuffer = new Buffer(base64, 'base64'); //把base64码转成buffer对象，
            console.log('dataBuffer是否是Buffer对象：'+Buffer.isBuffer(dataBuffer)); // 输出是否是buffer对象
            fs.writeFile(newpath,dataBuffer,"binary",function(err){//用fs写入文件
            if(err){
                console.log(err);
                //reject(err);
            }else{
                console.log('写入成功！');
            }
      
    })
    return newpath;
}

//base64 商家图片存储到本地
function saveimag(url){

   let path= './imgs/'+ "shops/"
   let time=Date.now();
   let newpath= './imgs/'+ "shops/"+time+'.png';
      fs.writeFileSync(newpath,"");
   let base64 = url.replace(/^data:image\/\w+;base64,/, ""); //去掉图片base64码前面部分data:image/png;base64
   let dataBuffer = new Buffer(base64, 'base64'); //把base64码转成buffer对象，
      console.log('dataBuffer是否是Buffer对象：'+Buffer.isBuffer(dataBuffer)); // 输出是否是buffer对象
      fs.writeFile(newpath,dataBuffer,"binary",function(err){//用fs写入文件
      if(err){
          console.log(err);
      }else{
          console.log('写入成功！');
      }

})
return newpath;
 
}
//获取图片
function getimg(path,res){
    fs.readFile(path,'binary',function(err,data){
      if(err){
        console.log(err);
        return;
      }
      else{
        res.writeHead(200, {"Content-Type":"image/jpeg"});
        res.write(data,'binary');
        res.end();
      }
    })
  }

module.exports={
    SAVEBASE64:savebase64,
    GETIMG:getimg,
    SAVEIMAGE:saveimag
}  