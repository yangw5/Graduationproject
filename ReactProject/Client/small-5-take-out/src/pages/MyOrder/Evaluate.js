import React,{Component} from 'react';
import { NavBar, Icon,Button, WhiteSpace, ImagePicker,TextareaItem } from 'antd-mobile';
import './css/Evaluate.css';
import M from '../../assets/common';
import store from '../../redux/Redux';
import xx from './img/xx.png'
import xx1 from './img/xx1.png'

class Evaluate extends  Component {
  constructor(props){
    super(props);
    this.state={
      files:[],
      postdata:{
        files:[],
        text:'',
        time:'',
        orderid:''
      },
      ports:2,
      portsitems:[]
    }
  }
  componentDidMount(){
    // alert(this.state.ports)
    // alert(store.getState().userid)
    let items=[];
    for (var i = 0; i < 5; i++) {
      let src='';
      if(i<this.state.ports){
          src=xx;
      }else{
          src=xx1;
      }
      let index=i;
      items.push(
        <span >
          <img src={src} alt='' className='xx' onClick={()=>{
             this.changepoart(index)
          }} />
        </span>);            //这里父组件Examines，嵌套了子组件<OnTask/>
    }
    this.setState({
      portsitems:items
    });
  } 
  onChange = (files, type, index) => {
    console.log(files, type, index);
    if(type ==='add'){
      this.setState({
        files,
      });
    }else{
      this.setState({
        files,
      });
    }
  }
  textchange(value){
    let postdata =this.state.postdata;
    postdata.text=value;
    this.setState({
      postdata: postdata
    })
  }

  psotevaluate(){
    // 评价订单号 内容 图片 时间 商家id

    let time =new Date();
    let postdata =this.state.postdata;
    postdata.time=M.format(time,"-");
    postdata.orderid=this.props.location.state.orderid;
    postdata.files=this.state.files;
    postdata.userid=store.getState().userid;
    postdata.prot=this.state.ports;
    alert(store.getState().userid)
    postdata.shopid=this.props.location.state.shopid;
    this.setState({
      postdata: postdata
    })
    console.log(this.state.postdata);
    M.ajax({
      type: 'POST',
      url: '/addevaluate',
      headers: {
      },
      data: {
        data:this.state.postdata
      }
    }).then((value)=>{  
      if (value.status === 200) {
       let data = value.data.data;
       this.props.history.go(-1);
      }
    }).catch((error)=>{
      if (error.response && error.response.status === 400) {
        this.msg = `${error.response.data.error}!`;
      }
    });

  }
  changepoart(pindex){
    // alert(this.state.ports);
    let port=1;
    this.setState({
      ports: port,
      portsitems:[]
    },()=>{
          // alert(this.state.ports);
      let _this=this;
      let items=[];
      for (var i = 0; i < 5; i++) {
        let src='';
        if(i<= pindex ){
            src=xx;
        }else{
            src=xx1;
        }
        let index=i;
        items.push(
          <span >
            <img src={src} alt='' className='xx' key={i} onClick={()=>{
              _this.changepoart(index)
            }} />
          </span>);            //这里父组件Examines，嵌套了子组件<OnTask/>
      }
      this.setState({
        portsitems:items
      });
    });

  }
  render(){
    return(
      <div>
          <NavBar
            mode="light"
            icon={<Icon type="left" />}
            onLeftClick={() => {
              this.props.history.go(-1);
            }}
            rightContent={[
              <Icon key="1" type="ellipsis" />,
            ]}
          >评价</NavBar>
           <div >
              <div className='pf'>
                <Button type="ghost" inline size="small" style={{ marginRight: '4px' }}>满意</Button>
                <Button type="ghost" inline size="small" style={{ marginRight: '4px' }}>不满意</Button>
                <div className='protxx'>
                亲，打个分呗：{ this.state.portsitems }
                </div>
              </div>
              <div className='text'>
                <TextareaItem
                  placeholder="亲，菜品口味如何，对包装服务等还满意吗？"
                  data-seed="logId"
                  autoHeight
                  value={this.state.postdata.text}
                  onChange={(value)=>{
                    this.textchange(value)
                  }}
                  ref={el => this.customFocusInst = el}
                />
              </div>
              <div className='elimg'>
                  <ImagePicker
                    length="6"
                    files={this.state.files}
                    onChange={this.onChange}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={this.state.files.length < 5}
                    
                  />
                  <div className='elimg-item'> 
                    <span className='elimg-item-title'>上传图片</span>
                    <span className='elimg-item-inf'>上传图片，有机会成为优质评价哦</span>
                  </div>
              </div>
              <div className='postevaluate'>
                  <Button onClick={()=>{
                    this.psotevaluate()
                  }}>提交</Button><WhiteSpace />
              </div>
           </div>
      </div>
    )
  }
}
export default Evaluate;