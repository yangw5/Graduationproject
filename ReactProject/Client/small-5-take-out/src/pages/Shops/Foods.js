import React,{Component} from  'react';
import Rxports from '../../assets/common.js'
import M from '../../assets/common'
import './css/foods.css'
import propTypes from 'prop-types'
import add from './images/add.png'
import reduce from './images/reduce.png'


class   Foods extends Component{
  constructor(props){
    super(props);
    this.state={
      index:0,
      foodstype:[
      ],//食物类型
      fooditem:[
      ],//食物数组
      allmoney:'',
      foodcar:this.props.pcarfood,
    }
  }

componentDidMount(){
  // console.log(33333)
  // console.log(this.props.pcarfood)
  this.initfoodtype();
}
componentWillReceiveProps(nextProps) {

  //父组件向下 props 子组件更新
  
  let cpfooditem=JSON.parse(JSON.stringify(this.state.fooditem))
  for(let i=0;i<cpfooditem.length;i++){
    for(let j=0;j<cpfooditem[i].data.length;j++){
      for(let z=0;z<nextProps.pcarfood.length;z++){
        if(nextProps.pcarfood[z].value.id===cpfooditem[i].data[j].id){
          cpfooditem[i].data[j].sl=nextProps.pcarfood[z].number;
        }
      }
    }
  }
  this.setState({
    fooditem:cpfooditem,
    foodcar:nextProps.pcarfood
  })

}
//获取存在的food分类
initfoodtype(){
  let _this=this;
  M.ajax({
    type: 'GET',
    url: '/shopfoodtype',
    headers: {
    },
    params: {
      shopid:this.props.postshopid
    }
  }).then((value)=>{
    if (value.status === 200) {
      let data = value.data.data;
     console.log(data);
     _this.setState({
      foodstype:data
     })
     _this.initfood();
    }
  }).catch((error)=>{
    if (error.response && error.response.status == 400) {
      this.msg = `${error.response.data.error}!`;
    }
})
}
//获取存在的food
initfood(){
  M.ajax({
    type: 'GET',
    url: '/getallfood',
    headers: {
    },
    params: {
      shopid:this.props.postshopid
    }
  }).then((value)=>{
    if (value.status === 200) {
      //获取数据
      let data = value.data.data;
      console.log(data);
     
     //将数据进行筛选
     //{title: '',data:[{}]}
     let fooddata=[];
     let aaa = this.datado(data,this.state.foodstype,fooddata);
     console.log('yang5');
     console.log(aaa);
 
     this.setState({
      fooditem:aaa
     })

    }
  }).catch((error)=>{
    if (error.response && error.response.status == 400) {
      this.msg = `${error.response.data.error}!`;
    }
})
}
//food数据筛选重组
datado(data,type,ret) {
  for( let i of type){
    let obj={
      title:'',
      data:[]
    };
    obj.title=i.foodtype;
   data.forEach(function(value){
     if(i.foodtype === value.foodtype){
          value.sl=0;
      　　obj.data.push(value);
     }
    })
    ret.push(obj);
  }
  return ret;

}
gotofood(e,a){//选中跳转
  //e.target/currentTarget
  // alert(e.target.id);
  //alert(this.refs.foodsItem.scrollTop);
  // this.refs.item1.style.background = 'white';
  //alert(a);
  // for(let i=0;i<4;i++){
  //   let item="item"+i;
  //   if(i === a){
  //     Rxports.addClass(this.refs[item],'type-item-active');//增加选中样式
  //   }else{
  //     Rxports.removeClass(this.refs[item],'type-item-active');//去除所有选择的元素的选择样式
  //   }
  //  }
  let count=0;
  if(a ===0){
    count=0;
  }else{
    for(let i=0;i<a;i++){
      let leng=0;
      leng=this.state.fooditem[i].data.length;
      console.log(leng)
      count=count+150* leng+ 10;
    }
  }
  this.refs.foodsItem.scrollTop=count;
  this.setState({
    index:a
  } ,() => {
    console.log(this.state.fooditem)
  })
}
scrollTopChange(count){
  // let count=Math.abs(count);
}
scrollchange(){
  for(let i=0;i<4;i++){
   let item="item"+i;
     Rxports.removeClass(this.refs[item],'type-item-active');//去除所有选择的元素的选择样式
  }
  //Rxports.removeClass(this.refs.item1,'type-item-active');
  // Rxports.addClass(this.refs.item1,'type-item-active');//增加选中样式
  // if(){

  // }
}
//循环数组
forarray(item ,type){
  let cpdata=this.state.fooditem;//获取购物车
  for(let i of cpdata){
    for(let j of i.data){
      if(j === item){
        if(type){
          j.sl++
        }else{
          j.sl--
        }
       
        this.setState({
          fooditem:cpdata
        })
        return;
      }
    }
  }
}

//添加到购物车
addShoppingCart(item){
  this.forarray(item,true)
  let fooditem={
    value:{},
    number:0
  };
  fooditem.value=item;
  fooditem.number=1;
  let cpdata=this.state.foodcar;//获取购物车
  let flog = false ;
  //判断购物车是否有该商品
  for(let i of cpdata){
    if( i.value.id === item.id){
      i.number++;
      flog = true;
      break;
    }
  }
  if(!flog){
    cpdata.push(fooditem);
  }
  // cpdata.forEach(function(value,index){
  //   if(value.value.id === item.id){
  //     value.number++;//有数量加1
  //   }
  // })//你不能使用break语句中断循环，也不能使用return语句返回到外层函数。
  this.setState({
    foodcar:cpdata
  })
  //数据上传到父组件
  this.props.getdata(this.state.foodcar);
  console.log(this.state.foodcar);
}
//从购物车移除
deleteShoppingCart(item){
  this.forarray(item,false)
  let cpdata=this.state.foodcar;//获取购物车
  let flog = false ;
  //判断购物车是否有该商品
  let arryindx='';//商品下标
  for(let i of cpdata){
    if( i.value.id === item.id){
      i.number--;
      //当数量为0 数组
      if(i.number === 0){
        arryindx=cpdata.indexOf(i);
        console.log(arryindx);
        flog = true;
        break;
      }
    }
  }
  if(flog){
    cpdata.splice(arryindx,1);
  }
  this.setState({
    foodcar:cpdata
  })
  this.props.getdata(this.state.foodcar);
  console.log(this.state.foodcar);
}
//父组件数据
static propTypes = {
  getdata: propTypes.func.isRequired,
}
  render(){
    // console.log(33333)
    // console.log(this.props.pcarfood)
   
    // console.log(this.state.foodcar);
    // console.log(this.state.fooditem)
    let _this=this;
    let shopitem=[];
    this.state.fooditem.map(function(value,index){
      return shopitem.push(
        <li  key={index}>
        <div className='foods-title' >
              {value.title}
        </div>
        {
          value.data.map(function(item,i){
            return(
              <div className='item-food' key={i} >
                <div className='food-img'>
                  <img src={'http://localhost:8888/getimg?himg='+item.foodimg} alt=''   />
                </div>
                <div className='food-inf'>
                  <p className='food-name'>{item.foodname}</p>
                  <span className='food-material'>{item.material}</span>
                  <span className='food-evaluate'>月售174，好评率90%</span>
                  <span className='food-discount'>9折 每单限1份优惠</span>
                  <div className='AA'>
                    <span className='food-price'>{item.money}</span>
                    
                    <img className='add' src={add} alt='' onClick={()=>{_this.addShoppingCart(item)}}/>
                   {
                     item.sl === 0 ? '' :  <div className='BB'>
                     <span className='sl'> {item.sl} </span> 
                     <img className='delete' src={reduce} alt='' onClick={()=>{_this.deleteShoppingCart(item)}}/>
                     </div>
                   }
                   
                  </div>
                </div>
              </div>
            )
          },this)
        }

      </li>
      )
    })

    return (
    <div className='foods'>
     <div className='foods-type'>
     <ul ref='item'>
       {
          this.state.foodstype.map(function(value,index){
            return (
              <li key={index} className={ index !== this.state.index ? 'type-item' : 'type-item type-item-active'} >
              <div ref={"item"+index}   onClick={(e)=>{this.gotofood(e,index)}}>{value.foodtype}
              </div>
           </li>
            )
          },this)
       }
    </ul>
     </div>
     <div className='foods-item' ref='foodsItem' onScroll={()=>{
       this.scrollchange()
     }}>
     <div className='foods-contain'>
      <ul>
      {shopitem}
      </ul>
       </div>
     </div>
    </div>
    )
  }
}
export default Foods;