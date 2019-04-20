import React,{Component} from 'react'
import { NavBar, Icon ,InputItem,ImagePicker, WingBlank, SegmentedControl , WhiteSpace, Button, Toast,List} from 'antd-mobile';
import M from '../../../assets/common'
import store from '../../../redux/Redux'
const Item = List.Item;
const Brief = Item.Brief;


class ItemImage extends Component{
  constructor(props){
    super(props)
    this.state={
      files: [],
      hasError:true,
      multiple: false,
      image:null
    }
  }
  onChange = (files, type, index) => {
    let flag=!this.state.hasError;
    console.log(files, type, index);
    if(type ==='add'){
      this.setState({
        hasError:flag,
        image:files[0].url,
        files,
      });
    }else{
      this.setState({
        hasError:flag,
        files,
      });
    }


  }
  saveimg=()=>{
    console.log(this.state.image);
    let img=this.state.image;
    let that=this;
    M.ajax({
        type: 'POST',
        url: '/upload',
        headers: {
        },
        data: {
          data:img,
          userid:store.getState().userid
        }
      }).then((value)=>{
        that.props.history.go(-1);
        if (value.status === 200) {
          this.data = value.data;
        }
      }).catch((error)=>{
        if (error.response && error.response.status === 400) {
          this.msg = `${error.response.data.error}!`;
        }
      }); 
  }
  // onSegChange = (e) => {
  //   const index = e.nativeEvent.selectedSegmentIndex;
  //   this.setState({
  //     multiple: index === 1,
  //   });
  // }

  render(){
    const { files,} = this.state;
    return(
      <div>
          <NavBar
            mode="light"
            icon={<Icon type="left" />}
            onLeftClick={() => {
              this.props.history.go(-1);
            }}
          >修改头像</NavBar>
         <div>
         <WingBlank>
        {/* <SegmentedControl
          values={['切换到单选', '切换到多选']}
          selectedIndex={this.state.multiple ? 1 : 0}
          onChange={this.onSegChange}
        /> */}
        <ImagePicker
          files={files}
          onChange={this.onChange}
          onImageClick={(index, fs) => console.log(index, fs)}
          selectable={files.length < 1}
          multiple={this.state.multiple}
        />
      </WingBlank><Button type="primary" onClick={this.saveimg}  disabled={this.state.hasError} >确认修改</Button><WhiteSpace />
         </div>
      </div>
    )
  }
}
export default ItemImage;