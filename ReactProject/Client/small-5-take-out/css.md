# css

## 弹性布局 flex
    
  给予容器控制内部元素高度和宽度的能力，flex的容器有两条隐形轴，水平的主轴（main axis），和竖直的交叉轴

  注：flex item的float，clear、vertical-align属性将失效。

  * flex的属性：

    1. flex-direction:　决定主轴的方向
    1. flex-wrap: 决定当排列不下时是否换行以及换行的方式
    1. flex-flow: 是flex-direction和flex-wrap的简写形式
    1. justify-content: 决定item在主轴上的对齐方式
    1. align-items: 决定了item在交叉轴上的对齐方式
    1. align-content: 该属性定义了当有多根主轴时，即item不止一行时，多行在交叉轴轴上的对齐方式。


    * inline-block设置margin无效，而且有边距 在要转换为inline-block的元素之间加入注释符 将结束标签与下一个开始标签写在一起，这样，他们之间的空格也会被清除掉
