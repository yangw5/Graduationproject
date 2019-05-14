<template>
  <div class="hello">
      <div class="order">
        <div class="orderdata" style="background:rgb(148,166,170)" >
          <div class="title" style="background:rgb(165,184,186)">
            <div>今日</div>
            <div>共{{timedata[0].count}}笔</div>
          </div>
          <div class="dataitem" >
            <div>交易金额（元）</div>
            <div class="dataitem-money">{{timedata[0].allmoney  ?  timedata[0].allmoney : 0}}</div>
          </div>
          <div class="dataitem" >
            <div>店铺应收（元）</div>
            <div class="dataitem-money">{{timedata[0].allmoney  ?  timedata[0].allmoney : 0}}</div>
          </div>
        </div>
        <div  class="orderdata" style="background:rgb(0,195,139)">
          <div class="title"  style="background:rgb(0,206,153)">
            <div>昨日</div>
            <div>共{{timedata[1].count}}笔</div>
          </div>
          <div class="dataitem" >
            <div>交易金额（元）</div>
            <div class="dataitem-money">{{timedata[1].allmoney ?  timedata[1].allmoney : 0}}</div>
          </div>
          <div class="dataitem" >
            <div>店铺应收（元）</div>
            <div class="dataitem-money">{{timedata[1].allmoney  ?  timedata[1].allmoney : 0}}</div>
          </div>
        </div>
        <div  class="orderdata" style="background:rgb(56,149,210)">
          <div class="title" style="background:rgb(97,167,207)">
            <div>本周</div>
            <div>共{{timedata[2].count}}笔</div>
          </div>
          <div class="dataitem" >
            <div>交易金额（元）</div>
            <div class="dataitem-money">{{timedata[2].allmoney  ?  timedata[2].allmoney : 0}}</div>
          </div>
          <div class="dataitem" >
            <div>店铺应收（元）</div>
            <div class="dataitem-money">{{timedata[2].allmoney  ?  timedata[2].allmoney : 0}}</div>
          </div>
        </div>
      </div>
      <div class="shopdata">
         <div class="shopdata-item">
           <div class="shopdata-title">门店</div>
           <div class="shopdata-inf">叫了只鸡</div>
         </div>
         <div class="shopdata-item">
           <div class="shopdata-title">交易时间</div>
           <div class="shopdata-inf">
               <el-radio-group v-model="radio1" size="mini">
                <el-radio label="1" border>今天</el-radio>
                <el-radio label="2" border >昨天</el-radio>
                <el-radio label="3" border >最近一周</el-radio>
                <el-radio label="4" border >最近一月</el-radio>
              </el-radio-group>
           </div>
         </div>
         <div class="shopdata-item">
           <div class="shopdata-title">统计类型</div>
           <div class="shopdata-inf">
               <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled">
                </el-option>
              </el-select>
           </div>
         </div>
         <div class='charsdata'>
           <div class="chars" ref="chart_example" :style="{width: '300px', height: '300px'}"></div>
           <div  class="chars" ref="chart_example1" :style="{width: '300px', height: '300px'}"></div>
         </div>
      </div>
  </div>
</template>
<script>
  import echarts from 'echarts'
	import M from '../../../assets/js/common.js';
  export default {
    data() {
      return {
				timedata:[{ allmoney: 0, count: 0 },
									{ allmoney: 0, count: 0 },
									{ allmoney: 0, count: 0 } ],
          radio1: '1',options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶',
          disabled: true
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '饼状图'
      }
    },
		beforeMount(){
			
		},
    mounted() {
			this.getshopdata()
			this.echarinit()
			
    },
    methods: {
			getshopdata(){
				 M.ajax({
				    type: 'POST',
				    url: '/yang/shopdata',
				    headers: {
				    },
				    data: {
							shopid:7
				    }
				  }).then((value)=>{
				    if (value.status === 200) {
				      let data = value.data.data;
				      this.timedata=data;
							console.log(this.timedata)
				    }
				  }).catch((error)=>{
				    if (error.response && error.response.status == 400) {
				      this.msg = `${error.response.data.error}!`;
				    }
				  })
			},
      echarinit(){

      let this_ = this;
      let myChart = echarts.init(this.$refs.chart_example);
       let myChart1 = echarts.init(this.$refs.chart_example1);
      let option1= {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                smooth: true
            }]
        };
      let option = {
            title : {
                text: '销售比例',
                subtext: '',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['外面配送','店面自取']
            },
            series : [
                {
                    name: '外面配送',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                        {value:335, name:'外面配送'},
                        {value:310, name:'店面自取'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        myChart.setOption(option);
        myChart1.setOption(option1);
 
      //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
      window.addEventListener('resize',function() {myChart.resize()});
      },
    },
    watch: {},
    created() {
 
    }
  }
</script>


<style scoped>
.hello{
  width: 80%;
  margin: 10px auto;
}
.order{
  zoom: 1;
  overflow: hidden;
  display: flex;
  flex-direction: row;
}
.order :after{
  clear: both;
  visibility: hidden;
  
}
.orderdata{
  height: 150px;
  width: 33%;
  margin: 5px;
}
.title{
  height: 50px;
}
.title div{
  width: 50%;
  float: left;
  line-height: 50px;
  color: white;
  text-align: center;
}
.dataitem{
  height: 50px;
}
.dataitem div{
  font-size: 16px;
}
.dataitem-money{
  font-size: 30px;
  font-weight: 800;
}

.dataitem div{
  height: 50px;
  width: 50%;
  font-size: 20px;
  float: left;
  line-height: 50px;
  color: white;
  text-align: center;
} 
.shopdata{
  margin-top: 20px;
  width:80%;
  border-top: 1px solid #eee;
}

.shopdata-item{
  float: left;
  text-align: left;
  width: 100%;
}
.shopdata-title{
  width: 10%;
  float: left;
  text-align: left;
  padding: 10px;
}
.shopdata-inf{
  float: left;
  padding: 10px;
}
.charsdata{
  /* width: 100%; */
	margin-top: 20px;
}
.chars{
  float: left;
  margin-right: 200px;
}

</style>
