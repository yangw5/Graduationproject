import React,{Component} from 'react';
import { NavBar, Icon,Button, WhiteSpace, ImagePicker,TextareaItem } from 'antd-mobile';
import './css/Evaluate.css';
import M from '../../assets/common';
import store from '../../redux/Redux';

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
      }
    }
  }
  componentDidMount(){
    alert(store.getState().userid)
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