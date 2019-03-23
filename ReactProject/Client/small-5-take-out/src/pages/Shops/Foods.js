import React,{Component} from  'react';
import './css/foods.css'
import food from './images/food.jpg'
import add from './images/add.png'

class   Foods extends Component{
  constructor(props){
    super(props);
    this.state={

    }

  }
  render(){
    return (
    <div className='foods'>
     <div className='foods-type'>
       <div  className='type-item'>分类1</div>
       <div  className='type-item'>分类2</div>
       <div  className='type-item type-item-active'>分类3</div>
       <div  className='type-item'>分类4</div>
       <div  className='type-item'>分类5</div>
       <div  className='type-item'>分类6</div>
     </div>
     <div className='foods-item'>
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
     </div>
    </div>
    )
  }
}
export default Foods;