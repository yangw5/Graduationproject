// 引入 AlipayFormData 并实例化

const fs = require("fs");
const AlipayFormData=require('alipay-sdk/lib/form').default;
//sdk
const AlipaySdk = require('alipay-sdk').default;
// 实例化sdk
function ant(response, postData,params){
  let pdata=JSON.parse(postData);//json转化为对象
  const alipaySdk = new AlipaySdk({
    appId: '2016092600597690',
    gateway:'https://openapi.alipaydev.com/gateway.do',
    privateKey: fs.readFileSync('./private-key.txt', 'ascii'),
    alipayPublicKey: fs.readFileSync('./public-key.txt', 'ascii'),
    sign_type:'RSA2',
    charset:'utf-8'
  });
  const formData = new AlipayFormData();
  //req.session.pay_inf=inf;
  //支付成功后返回地址方法
  formData.setMethod('get')
  // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
  formData.addField('returnUrl', 'http://localhost:3000/#/v1/myinf');
  //返回数据
  let time=Date.now();
  let oid='out_trade_no'+time;
  console.log(oid)
  formData.addField('bizContent', {
    outTradeNo: oid,
    productCode: 'FAST_INSTANT_TRADE_PAY',
    totalAmount: pdata.data.allmoney,
    subject: '商品',
    body: '商品详情',
  });


  alipaySdk.exec( 'alipay.trade.wap.pay',
  {},
  { formData: formData }).then(result => {
     console.log(result);
    var data={
      status:200,
      data:{
        data: result
      }
    }
    response.writeHead(200, {"Content-Type": "application/json"});
    var json = JSON.stringify(data);//对象转化为字符串
    response.write(json);
    response.end();
  }).catch(err=>{
    console.log(err);
  })

}

module.exports=ant