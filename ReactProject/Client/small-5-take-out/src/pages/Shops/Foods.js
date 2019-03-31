import React,{Component} from  'react';
import Rxports from '../../assets/common.js'
import './css/foods.css'
import food from './images/food.jpg'
import add from './images/add.png'


class   Foods extends Component{
  constructor(props){
    super(props);
    this.state={
      foodstype:[
        "分类1",
        "分类2",
        "分类3",
        "分类4"
      ],
      fooditem:[
        {
          type:'分类1',
          data:[
            {
              img:"url",
              name:'招牌灌汤包',
              material:'主要原料：猪肉，鸡蛋',
              evaluate:'月售174，好评率90%',
              discount:'9折 每单限1份优惠',
              price:'￥10.8'

            }
          ]
        }
      ]
    }
  }
gotofood(e,a){//选中跳转
  //e.target/currentTarget
  // alert(e.target.id);
  //alert(this.refs.foodsItem.scrollTop);
  // this.refs.item1.style.background = 'white';
  //alert(a);
  for(let i=0;i<4;i++){
    let item="item"+i;
    if(i===a){
      Rxports.addClass(this.refs[item],'type-item-active');//增加选中样式
    }else{
      Rxports.removeClass(this.refs[item],'type-item-active');//去除所有选择的元素的选择样式
    }
   }
  let count=760*a;
  this.refs.foodsItem.scrollTop=count;
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
  render(){
    return (
    <div className='foods'>
     <div className='foods-type'>
     <ul ref='item'>
       {
          this.state.foodstype.map(function(value,index){
            return (
              <li key={index}>
              <div className='type-item type-item-active' ref={"item"+index}  key={index} onClick={(e)=>{this.gotofood(e,index)}}>{value}</div>
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
        <li>
          <div className='foods-title' >
            分类1
          </div>
        <div className='item-food'>
        <div className='food-img'>
          <img src={food} alt='' />
        </div>
        <div className='food-inf'>
          <p className='food-name'>招牌灌汤包</p>
          <span className='food-material'>主要原料：猪肉，鸡蛋</span>
          <span className='food-evaluate'>月售174，好评率90%</span>
          <span className='food-discount'>9折 每单限1份优惠</span>
          <div>
          <span className='food-price'>￥10.8</span><img className='add' src={add} alt=''/>
          </div>
        </div>
       </div>
       <div className='item-food '>
       <div className='food-img'>
          <img src={food} alt='' />
        </div>
        <div className='food-inf '>
          <p className='food-name'>招牌灌汤包</p>
          <span className='food-material'>主要原料：猪肉，鸡蛋</span>
          <span className='food-evaluate'>月售174，好评率90%</span>
          <span className='food-discount'>9折 每单限1份优惠</span>
          <div>
          <span className='food-price'>￥10.8</span><img className='add' src={add} alt=''/>
          </div>
        </div>
       </div>
       <div className='item-food'>
       <div className='food-img'>
          <img src={food} alt='' />
        </div>
        <div className='food-inf '>
          <p className='food-name'>招牌灌汤包</p>
          <span className='food-material'>主要原料：猪肉，鸡蛋</span>
          <span className='food-evaluate'>月售174，好评率90%</span>
          <span className='food-discount'>9折 每单限1份优惠</span>
          <div>
          <span className='food-price'>￥10.8</span><img className='add' src={add} alt=''/>
          </div>
        </div>
       </div>
       <div className='item-food'>
       <div className='food-img'>
          <img src={food} alt='' />
        </div>
        <div className='food-inf '>
          <p className='food-name'>招牌灌汤包4</p>
          <span className='food-material'>主要原料：猪肉，鸡蛋</span>
          <span className='food-evaluate'>月售174，好评率90%</span>
          <span className='food-discount'>9折 每单限1份优惠</span>
          <div>
          <span className='food-price'>￥10.8</span><img className='add' src={add} alt=''/>
          </div>
        </div>
       </div>
       <div className='item-food'>
       <div className='food-img'>
          <img src={food} alt='' />
        </div>
        <div className='food-inf '>
          <p className='food-name'>招牌灌汤包5</p>
          <span className='food-material'>主要原料：猪肉，鸡蛋</span>
          <span className='food-evaluate'>月售174，好评率90%</span>
          <span className='food-discount'>9折 每单限1份优惠</span>
          <div>
          <span className='food-price'>￥10.8</span><img className='add' src={add} alt=''/>
          </div>
        </div>
       </div>
        </li>
        <li>
          <div className='foods-title'>
            分类2
          </div>
        <div className='item-food'>
        <div className='food-img'>
          <img src={food} alt='' />
        </div>
        <div className='food-inf'>
          <p className='food-name'>招牌灌汤包</p>
          <span className='food-material'>主要原料：猪肉，鸡蛋</span>
          <span className='food-evaluate'>月售174，好评率90%</span>
          <span className='food-discount'>9折 每单限1份优惠</span>
          <div>
          <span className='food-price'>￥10.8</span><img className='add' src={add} alt=''/>
          </div>
        </div>
       </div>
       <div className='item-food '>
       <div className='food-img'>
          <img src={food} alt='' />
        </div>
        <div className='food-inf '>
          <p className='food-name'>招牌灌汤包</p>
          <span className='food-material'>主要原料：猪肉，鸡蛋</span>
          <span className='food-evaluate'>月售174，好评率90%</span>
          <span className='food-discount'>9折 每单限1份优惠</span>
          <div>
          <span className='food-price'>￥10.8</span><img className='add' src={add} alt=''/>
          </div>
        </div>
       </div>
       <div className='item-food'>
       <div className='food-img'>
          <img src={food} alt='' />
        </div>
        <div className='food-inf '>
          <p className='food-name'>招牌灌汤包</p>
          <span className='food-material'>主要原料：猪肉，鸡蛋</span>
          <span className='food-evaluate'>月售174，好评率90%</span>
          <span className='food-discount'>9折 每单限1份优惠</span>
          <div>
          <span className='food-price'>￥10.8</span><img className='add' src={add} alt=''/>
          </div>
        </div>
       </div>
       <div className='item-food'>
       <div className='food-img'>
          <img src={food} alt='' />
        </div>
        <div className='food-inf '>
          <p className='food-name'>招牌灌汤包4</p>
          <span className='food-material'>主要原料：猪肉，鸡蛋</span>
          <span className='food-evaluate'>月售174，好评率90%</span>
          <span className='food-discount'>9折 每单限1份优惠</span>
          <div>
          <span className='food-price'>￥10.8</span><img className='add' src={add} alt=''/>
          </div>
        </div>
       </div>
       <div className='item-food'>
       <div className='food-img'>
          <img src={food} alt='' />
        </div>
        <div className='food-inf '>
          <p className='food-name'>招牌灌汤包5</p>
          <span className='food-material'>主要原料：猪肉，鸡蛋</span>
          <span className='food-evaluate'>月售174，好评率90%</span>
          <span className='food-discount'>9折 每单限1份优惠</span>
          <div>
          <span className='food-price'>￥10.8</span><img className='add' src={add} alt=''/>
          </div>
        </div>
       </div>
        </li>
        <li>
          <div className='foods-title'>
            分类3
          </div>
        <div className='item-food'>
        <div className='food-img'>
          <img src={food} alt='' />
        </div>
        <div className='food-inf'>
          <p className='food-name'>招牌灌汤包</p>
          <span className='food-material'>主要原料：猪肉，鸡蛋</span>
          <span className='food-evaluate'>月售174，好评率90%</span>
          <span className='food-discount'>9折 每单限1份优惠</span>
          <div>
          <span className='food-price'>￥10.8</span><img className='add' src={add} alt=''/>
          </div>
        </div>
       </div>
       <div className='item-food '>
       <div className='food-img'>
          <img src={food} alt='' />
        </div>
        <div className='food-inf '>
          <p className='food-name'>招牌灌汤包</p>
          <span className='food-material'>主要原料：猪肉，鸡蛋</span>
          <span className='food-evaluate'>月售174，好评率90%</span>
          <span className='food-discount'>9折 每单限1份优惠</span>
          <div>
          <span className='food-price'>￥10.8</span><img className='add' src={add} alt=''/>
          </div>
        </div>
       </div>
       <div className='item-food'>
       <div className='food-img'>
          <img src={food} alt='' />
        </div>
        <div className='food-inf '>
          <p className='food-name'>招牌灌汤包</p>
          <span className='food-material'>主要原料：猪肉，鸡蛋</span>
          <span className='food-evaluate'>月售174，好评率90%</span>
          <span className='food-discount'>9折 每单限1份优惠</span>
          <div>
          <span className='food-price'>￥10.8</span><img className='add' src={add} alt=''/>
          </div>
        </div>
       </div>
       <div className='item-food'>
       <div className='food-img'>
          <img src={food} alt='' />
        </div>
        <div className='food-inf '>
          <p className='food-name'>招牌灌汤包4</p>
          <span className='food-material'>主要原料：猪肉，鸡蛋</span>
          <span className='food-evaluate'>月售174，好评率90%</span>
          <span className='food-discount'>9折 每单限1份优惠</span>
          <div>
          <span className='food-price'>￥10.8</span><img className='add' src={add} alt=''/>
          </div>
        </div>
       </div>
       <div className='item-food'>
       <div className='food-img'>
          <img src={food} alt='' />
        </div>
        <div className='food-inf '>
          <p className='food-name'>招牌灌汤包5</p>
          <span className='food-material'>主要原料：猪肉，鸡蛋</span>
          <span className='food-evaluate'>月售174，好评率90%</span>
          <span className='food-discount'>9折 每单限1份优惠</span>
          <div>
          <span className='food-price'>￥10.8</span><img className='add' src={add} alt=''/>
          </div>
        </div>
       </div>
        </li>
        <li>
          <div className='foods-title'>
            分类4
          </div>
        <div className='item-food'>
        <div className='food-img'>
          <img src={food} alt='' />
        </div>
        <div className='food-inf'>
          <p className='food-name'>招牌灌汤包</p>
          <span className='food-material'>主要原料：猪肉，鸡蛋</span>
          <span className='food-evaluate'>月售174，好评率90%</span>
          <span className='food-discount'>9折 每单限1份优惠</span>
          <div>
          <span className='food-price'>￥10.8</span><img className='add' src={add} alt=''/>
          </div>
        </div>
       </div>
       <div className='item-food '>
       <div className='food-img'>
          <img src={food} alt='' />
        </div>
        <div className='food-inf '>
          <p className='food-name'>招牌灌汤包</p>
          <span className='food-material'>主要原料：猪肉，鸡蛋</span>
          <span className='food-evaluate'>月售174，好评率90%</span>
          <span className='food-discount'>9折 每单限1份优惠</span>
          <div>
          <span className='food-price'>￥10.8</span><img className='add' src={add} alt=''/>
          </div>
        </div>
       </div>
       <div className='item-food'>
       <div className='food-img'>
          <img src={food} alt='' />
        </div>
        <div className='food-inf '>
          <p className='food-name'>招牌灌汤包</p>
          <span className='food-material'>主要原料：猪肉，鸡蛋</span>
          <span className='food-evaluate'>月售174，好评率90%</span>
          <span className='food-discount'>9折 每单限1份优惠</span>
          <div>
          <span className='food-price'>￥10.8</span><img className='add' src={add} alt=''/>
          </div>
        </div>
       </div>
       <div className='item-food'>
       <div className='food-img'>
          <img src={food} alt='' />
        </div>
        <div className='food-inf '>
          <p className='food-name'>招牌灌汤包4</p>
          <span className='food-material'>主要原料：猪肉，鸡蛋</span>
          <span className='food-evaluate'>月售174，好评率90%</span>
          <span className='food-discount'>9折 每单限1份优惠</span>
          <div>
          <span className='food-price'>￥10.8</span><img className='add' src={add} alt=''/>
          </div>
        </div>
       </div>
       <div className='item-food'>
       <div className='food-img'>
          <img src={food} alt='' />
        </div>
        <div className='food-inf '>
          <p className='food-name'>招牌灌汤包5</p>
          <span className='food-material'>主要原料：猪肉，鸡蛋</span>
          <span className='food-evaluate'>月售174，好评率90%</span>
          <span className='food-discount'>9折 每单限1份优惠</span>
          <div>
          <span className='food-price'>￥10.8</span><img className='add' src={add} alt=''/>
          </div>
        </div>
       </div>
        </li>
        <li>
          <div className='foods-title'>
            分类5
          </div>
        <div className='item-food'>
        <div className='food-img'>
          <img src={food} alt='' />
        </div>
        <div className='food-inf'>
          <p className='food-name'>招牌灌汤包</p>
          <span className='food-material'>主要原料：猪肉，鸡蛋</span>
          <span className='food-evaluate'>月售174，好评率90%</span>
          <span className='food-discount'>9折 每单限1份优惠</span>
          <div>
          <span className='food-price'>￥10.8</span><img className='add' src={add} alt=''/>
          </div>
        </div>
       </div>
       <div className='item-food '>
       <div className='food-img'>
          <img src={food} alt='' />
        </div>
        <div className='food-inf '>
          <p className='food-name'>招牌灌汤包</p>
          <span className='food-material'>主要原料：猪肉，鸡蛋</span>
          <span className='food-evaluate'>月售174，好评率90%</span>
          <span className='food-discount'>9折 每单限1份优惠</span>
          <div>
          <span className='food-price'>￥10.8</span><img className='add' src={add} alt=''/>
          </div>
        </div>
       </div>
       <div className='item-food'>
       <div className='food-img'>
          <img src={food} alt='' />
        </div>
        <div className='food-inf '>
          <p className='food-name'>招牌灌汤包</p>
          <span className='food-material'>主要原料：猪肉，鸡蛋</span>
          <span className='food-evaluate'>月售174，好评率90%</span>
          <span className='food-discount'>9折 每单限1份优惠</span>
          <div>
          <span className='food-price'>￥10.8</span><img className='add' src={add} alt=''/>
          </div>
        </div>
       </div>
       <div className='item-food'>
       <div className='food-img'>
          <img src={food} alt='' />
        </div>
        <div className='food-inf '>
          <p className='food-name'>招牌灌汤包4</p>
          <span className='food-material'>主要原料：猪肉，鸡蛋</span>
          <span className='food-evaluate'>月售174，好评率90%</span>
          <span className='food-discount'>9折 每单限1份优惠</span>
          <div>
          <span className='food-price'>￥10.8</span><img className='add' src={add} alt=''/>
          </div>
        </div>
       </div>
       <div className='item-food'>
       <div className='food-img'>
          <img src={food} alt='' />
        </div>
        <div className='food-inf '>
          <p className='food-name'>招牌灌汤包5</p>
          <span className='food-material'>主要原料：猪肉，鸡蛋</span>
          <span className='food-evaluate'>月售174，好评率90%</span>
          <span className='food-discount'>9折 每单限1份优惠</span>
          <div>
          <span className='food-price'>￥10.8</span><img className='add' src={add} alt=''/>
          </div>
        </div>
       </div>
        </li>
      </ul>
       
       </div>
     </div>
    </div>
    )
  }
}
export default Foods;