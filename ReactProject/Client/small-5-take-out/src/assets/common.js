import axios from 'axios';




let oproto = Object.prototype;
// let serialize = oproto.toString;

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
    // Message({
    //   showClose: true,
    //   message: err.message,
    //   type: 'error'
    // });
  }
}

const Rxports ={


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

//请求配置
  ajax:(opt)=>{// 请求配置
    let opts = opt || {};
    if (!opts.url) {
      return false
    }
    /**
      * 基础axios实例
      */
    // const host = process.env.NODE_ENV === 'development' ? 'dev api host' : 'prod api host';

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
            //window.location.href = `${Lib.data.frontLocation}/ekp/login.jsp?tokenSkip=getTokenSkip&appId=dcp&redirectto=${Lib.data.frontLocation}/views/login/index.html`;
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
          // Message({
          //   showClose: true,
          //   message: '网络繁忙,请稍等再试!',
          //   type: 'error'
          // });
          reject(error);
        }
      });
    }
    return new Promise(axios_template) // 函数
  },

//深拷贝
  cloneState:function (state) {
    return JSON.parse(JSON.stringify(state));
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
  		 el.className = curClass.replace(/^\s+|\s+$/gm,'');
  	}
  },
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
  }
  

}
export default Rxports;


//调用方式
// ajax({
//   type: 'GET',
//   url: '/document/sys/dcs/documentType',
//   headers: {
//   },
//   params: {}
// }).then((value)=>{
//   if (value.status == 0) {
//     this.data = value.data;
//   }
// }).catch((error)=>{
//   if (error.response && error.response.status == 400) {
//     this.msg = `${error.response.data.error}!`;
//   }
// });
// },