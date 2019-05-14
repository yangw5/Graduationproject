
import axios from 'axios';
import { Message } from 'element-ui';

let oproto = Object.prototype;
let serialize = oproto.toString;

/**
  * 处理请求返回错误
  */
const filtError = (errorInfo, isLogin) => {
  let err = {
    message: '',
    info: ''
  }
  if (errorInfo.status) {
    switch (errorInfo.status) {
    case 400:
      if (isLogin) {
        err.message = ''
      } else {
        err.message = '请求错误'
      }
      break
    case 401:
      err.message = '未授权，请登录'
      break
    case 403:
      err.message = '拒绝访问'
      break
    case 404:
      break
    case 408:
      err.message = '请求超时'
      break
    case 500:
      err.message = errorInfo.data.message
      break
    case 501:
      err.message = '服务未实现'
      break
    case 502:
      err.message = '网关错误'
      break
    case 503:
      err.message = '服务不可用'
      break
    case 504:
      err.message = '网关超时'
      break
    case 505:
      err.message = 'HTTP版本不受支持'
      break
    default:
    }
  }
  if (err.message) {
    Message({
      showClose: true,
      message: err.message,
      type: 'error'
    });
  }
}

const Rxports = {
  body: document.body,
  /**
	  * 封装axios，减少学习成本，参数基本跟jq ajax一致
	  * @param {String} type			请求的类型，默认post
	  * @param {String} url				请求地址
	  * @param {String} time			超时时间
	  * @param {Object} data			请求参数
	  * @param {String} dataType		预期服务器返回的数据类型，xml html json ...
	  * @param {Object} headers			自定义请求headers
	  * @param {Function} success		请求成功后，这里会有两个参数,服务器返回数据，返回状态，[data, res]
	  * @param {Function} error		发送请求前
	  * @param return
    */
  ajax: (opt) => {
    // 请求配置
    let opts = opt || {};
    if (!opts.url) {
      return false
    }
    /**
      * 基础axios实例
      */

    let axios_template = (resolve, reject) => {
      return axios({
        method: opts.type || 'post',
        url: opts.url,
        data: opts.data || {}, // 参数配置，如果是post提交方式，参数关键字使用data
        params: opts.params || {}, // 如果是get提交方式，参数关键字则用params
        headers: opts.headers || {}, // 是即将被发送的自定义请求头
        baseURL: '', // 在webpakc文件统一配置baseURL
        timeout: opts.time || 20*1000,
        responseType: opts.dataType || 'json'
      }).then((res) => {
        resolve(res.data);
      }).catch((error) => {
        if (error.response) {
          // 请求已发出，但服务器响应的状态码不在 2xx 范围内
          // 按http状态码进行处理，第二参数是对是登录接口单独处理
          if (error.response.status==402){
            window.location.href = `${Lib.data.frontLocation}/ekp/login.jsp?tokenSkip=getTokenSkip&appId=dcp&redirectto=${Lib.data.frontLocation}/views/login/index.html`;
          }
          if (error.response.config.url.indexOf('login') == 1) {
            filtError(error.response, true);
          } else {
            filtError(error.response, false);
          }
          if (error.response) {
            reject(error);
          }
        } else if (error.toString().search('timeout') !== -1) {
          Message({
            showClose: true,
            message: '网络繁忙,请稍等再试!',
            type: 'error'
          });
          reject(error);
        }
      });
    }
    return new Promise(axios_template) // 函数
  },
  /**
    * 判定是否类数组，如节点集合，纯数组，arguments与拥有非负整数的length属性的纯JS对象
    */
  isArrayLike: (obj) => {
    if (!obj){
      return false
    }
    let n = obj.length;
    if (n === n >>> 0) { //检测length属性是否为非负整数
    	let type = serialize.call(obj).slice(8, -1)
    	if (/(?:regexp|string|function|window|global)$/i.test(type)){
        return false
      }
    	if (type === 'Array'){
        return true
      }
    	try {
        if ({}.propertyIsEnumerable.call(obj, 'length') === false) { //如果是原生对象
        	return /^\s?function/.test(obj.item || obj.callee)
        }
        return true
      }catch (e) { //IE的NodeList直接抛错
        return !obj.window //IE6-8 window
      }
    }
    return false
  },
  /**
    * 遍历数组与对象,回调的第一个参数为索引或键名,第二个或元素或键值
    */
  each: function (obj, fn) {
    let That = this;
    if (obj) { //排除null, undefined
    	let i = 0
    	if (That.isArrayLike(obj)) {
    		for (let n = obj.length; i < n; i++) {
    			if (fn(i, obj[i]) === false){
            break
          }
    		}
    	} else {
    		for (i in obj) {
    			if (obj.hasOwnProperty(i) && fn(i, obj[i]) === false) {
    				break
    			}
    		}
    	}
    }
  },
  /**
    * 判断是否为数组
    */
  isInArray: function(arr,value){
    for(let i = 0; i < arr.length; i++){
      if(value === arr[i]){
        return true;
      }
    }
    return false;
  },
  /**
    * 删除数组指定元素
    */
  removeByValue: function(arr, val) {
    for(let i = 0; i<arr.length; i++) {
      if(arr[i] == val) {
        arr.splice(i, 1);
        break;
      }
    }
  },
  /**
	  * 获取url传过来的参数
	  * @param name 	获取的参数
	  * @param Url 		自定义获取参数的链接
	  * @param return
	  */
  getUrlQuery: function (name,Url){
    //URL GET 获取值
    let reg = new RegExp('(^|\\?|&)'+ name +'=([^&]*)(\\s|&|$)', 'i'),
      url = Url || location.href;
    if (reg.test(url)){
      return unescape(RegExp.$2.replace(/\+/g, ' '));
    }
    return '';
  },
  /**
	  * 去掉data的vue代理
	  * @param data 	vue代理数据
	  * @param return
	  */
  switchData (data) {
  	return JSON.parse(JSON.stringify(data));
  },
  /**
    * 判断是否存在某个Class
    */
  hasClass (el, cls) {
  	if (!el || !cls) {
      return false;
    }
  	if (cls.indexOf(' ') !== -1) {
      throw new Error('className should not contain space.');
    }
  	if (el.classList) {
  		return el.classList.contains(cls);
  	}
  	return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
  },
  /**
    * 给元素添加Class属性
    */
  addClass (el, cls) {
  	if (!el) {
      return;
    }
  	let curClass = el.className;
  	let classes = (cls || '').split(' ');

  	for (let i = 0, j = classes.length; i < j; i++) {
  		let clsName = classes[i];
  		if (!clsName) {
        continue;
      }
  		if (el.classList) {
  			el.classList.add(clsName);
  		} else {
  			if (!this.hasClass(el, clsName)) {
  				curClass += ' ' + clsName;
  			}
  		}
  	}
  	if (!el.classList) {
  		el.className = curClass;
  	}
  },
  /**
    * 移除某元素的Class属性
    */
  removeClass (el, cls) {
  	if (!el || !cls) {
      return;
    }
  	let classes = cls.split(' ');
  	let curClass = ' ' + el.className + ' ';

  	for (let i = 0, j = classes.length; i < j; i++) {
  		let clsName = classes[i];
  		if (!clsName) {
        continue;
      }
  		if (el.classList) {
  			el.classList.remove(clsName);
  		} else {
  			if (this.hasClass(el, clsName)) {
  				curClass = curClass.replace(' ' + clsName + ' ', ' ');
  			}
  		}
  	}
  	if (!el.classList) {
  		el.className = trim(curClass);
  	}
  },
  /**
    * 日期格式化
    */
  formatDate (date, fmt) {
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    }
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + ''
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : this.padLeftZero(str))
      }
    }
    return fmt
  },
  // 第一个参数为日期，第二个参数为年月日分割格式 '/'或'-'
format(Date,str){
  let supplement=this.supplement;
  var obj = {
      Y: Date.getFullYear(),
      M: Date.getMonth() + 1,
      D: Date.getDate(),
      H: Date.getHours(),
      Mi: Date.getMinutes(),
      S: Date.getSeconds()
  }
  // 拼接时间 hh:mm:ss
  var time = ' ' +supplement(obj.H) + ':' + supplement(obj.Mi) + ':' + supplement(obj.S);
  // yyyy-mm-dd
  if(str.indexOf('-') > -1){
      return obj.Y + '-' + supplement(obj.M) + '-' + supplement(obj.D) + time;
  }
  // yyyy/mm/dd
  if(str.indexOf('/') > -1){
      return obj.Y + '/' + supplement(obj.M) + '/' + supplement(obj.D) + time;
  }
},
      
// 位数不足两位补全0
supplement(nn){
    return nn = nn < 10 ? '0' + nn : nn;
},
  padLeftZero (str) {
    return ('00' + str).substr(str.length)
  },
  pySort (arr,empty) {
    var $this = this;
    if (!String.prototype.localeCompare) {
      return null;
    }
    var letters = 'ABCDEFGHJKLMNOPQRSTWXYZ'.split('');
    var zh = '阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀'.split('');
    var arrList = [];
    for(var m =0;m<arr.length;m++){
      arrList.push(arr[m].name);
    }
    var result = [];
    var curr;
    for(var i=0;i<letters.length;i++){
      curr = {letter: letters[i], data: []};
      if(i!=26){
        for(var j =0;j<arrList.length;j++){
          var initial = arrList[j].charAt(0);//截取第一个字符
          if(arrList[j].charAt(0)==letters[i]||arrList[j].charAt(0)==letters[i].toLowerCase()){
            //首字符是英文的
            curr.data.push(arrList[j]);
          }else if(zh[i]!='*'&&$this.isChinese(initial)){
            //判断是否是无汉字,是否是中文
            if(initial.localeCompare(zh[i]) >= 0 &&(!zh[i+1]||initial.localeCompare(zh[i+1]) <0)) {
              //判断中文字符在哪一个类别
              curr.data.push(arrList[j]);
            }
          }
        }
      }else{
        for(var k =0;k<arrList.length;k++){
          var ini = arrList[k].charAt(0);
          //截取第一个字符
          if(!$this.isChar(ini)&&!$this.isChinese(ini)){
            curr.data.push(arrList[k]);
          }
        }
      }
      if(empty || curr.data.length) {
        result.push(curr);
        //curr.data.sort(function(a,b){
        //    return b.localeCompare(a);       //排序,英文排序,汉字排在英文后面
        //});
      }
    }
    return result;
  },
  isChinese (temp) {
    var re=/[^\u4E00-\u9FA5]/;
    if (re.test(temp)){return false;}
    return true ;
  },
  isChar (char) {
    var reg = /[A-Za-z]/;
    if (!reg.test(char)){return false ;}
    return true ;
  },
  resizeimg(){
    
  }

}
export default Rxports;


































