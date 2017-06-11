Page({
  data: {
    showtab:0,  //顶部选项卡索引
    showtabtype:'', //选中类型
    tabnav:{},  //顶部选项卡数据
    testdataall:[],  //所有数据
    testdata1:[], //数据列表
    testdata2:[], //数据列表
    testdata3:[], //数据列表
    testdata4:[], //数据列表
    testdata5:[], //数据列表
    startx:0,  //开始的位置x
    endx:0, //结束的位置x
    critical: 100, //触发切换标签的临界值
    marginleft:0,  //滑动距离
  },
  onLoad: function () {
    this.setData({
      tabnav:{
        tabnum:5,
        tabitem:[
          {
            "id":1,
            "type":"A",
            "text":"tab1"
          },
          {
            "id":2,
            "type":"B",
            "text":"tab2"
          },
          {
            "id":3,
            "type":"C",
            "text":"tab3"
          },
          {
            "id":4,
            "type":"D",
            "text":"tab4"
          },
          {
            "id":5,
            "type":"E",
            "text":"tab5"
          },
        ]
      },
    })
    this.fetchTabData(0);
  },
  fetchData:function(t){  //生成数据
    const newquestions = [];
    for (let i = 0; i < 20; i++) {
      newquestions.push({
        "id":i+1,
        "type": t,
        "text":"在组件上使用wx:for控制属性绑定一个数组，即可使用数组中各项的数据重复渲染该组件。"
      })
    }
    return newquestions
  },
  fetchTabData:function(i){
    console.log(Number(i));
    switch(Number(i)) {
      case 0:
        this.setData({
          testdata1: this.fetchData('A')
        })
        break;
      case 1:
        this.setData({
          testdata2: this.fetchData('B')
        })
        break;
      case 2:
        this.setData({
          testdata3: this.fetchData('C')
        })
        break;
      case 3:
        this.setData({
          testdata4: this.fetchData('D')
        })
        break;
      case 4:
        this.setData({
          testdata5: this.fetchData('E')
        })
        break;
      default:
        return;
    }
  },
  setTab:function(e){ //设置选项卡选中索引
    const edata = e.currentTarget.dataset;
    this.setData({
      showtab: Number(edata.tabindex),
      showtabtype: edata.type
    })
    this.fetchTabData(edata.tabindex);
  },
  scrollTouchstart:function(e){
    let px = e.touches[0].pageX;
    this.setData({
      startx: px
    })
  },
  scrollTouchmove:function(e){
    let px = e.touches[0].pageX;
    let d = this.data;
    this.setData({
      endx: px,
    })
    if(px-d.startx<d.critical && px-d.startx>-d.critical){
      this.setData({
        marginleft: px - d.startx
      })
    }
  },
  scrollTouchend:function(e){
    let d = this.data;
    if(d.endx-d.startx >d.critical && d.showtab>0){
      this.setData({
        showtab: d.showtab-1,
      })
      // this.fetchTabData(d.showtab-1);
    }else if(d.endx-d.startx <-d.critical && d.showtab<this.data.tabnav.tabnum-1){
      this.setData({
        showtab: d.showtab+1,
      })
    }
    this.fetchTabData(d.showtab);
    this.setData({
        startx:0,
        endx:0,
        marginleft:0
    })
  },
})
