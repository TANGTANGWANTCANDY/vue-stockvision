<template>
  <div class="app-container">

    <div id="toolbar">

      <div id="theme">
        <span>Theme:</span>
        <p :title="item.text" :class="item.text" v-for="(item,index) in list" :key="index" @click="choice(index)" ><span></span></p>
      </div>
    </div>

    <div id="myChart" :style="{ width:'900px', height: '500px'}"></div>
  </div>
</template>

<script>
export default {
  name: 'testview',
  data () {
    return {
      msg:['一','二','三'],
      theme:['default','light','dark'],
      status: 0,
      list: [
        { text: "default" },
        { text: "light" },
        { text: "dark" }
      ],
      option: {
        title: {
          text: '折线图堆叠'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一','周二','周三','周四','周五','周六','周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name:'邮件营销',
            type:'line',
            stack: '总量',
            data:[120, 132, 101, 134, 90, 230, 210]
          },
          {
            name:'联盟广告',
            type:'line',
            stack: '总量',
            data:[220, 182, 191, 234, 290, 330, 310]
          },
          {
            name:'视频广告',
            type:'line',
            stack: '总量',
            data:[150, 232, 201, 154, 190, 330, 410]
          },
          {
            name:'直接访问',
            type:'line',
            stack: '总量',
            data:[320, 332, 301, 334, 390, 330, 320]
          },
          {
            name:'搜索引擎',
            type:'line',
            stack: '总量',
            data:[820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }
    }
  },
  mounted(){
    this.drawLine();
  },
  methods: {
    choice(index) {
      this.status = index;
      this.myChart.dispose();//TODO: 释放图表，销毁对象并设置为null(多次操作可能会导致内存溢出)
      this.myChart = this.$echarts.init(document.getElementById('myChart'),this.theme[this.status])
      //this.myChart.setTheme(this.theme[this.status])//不生效
      this.myChart.setOption(this.option,true);
    },
    drawLine(){
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(document.getElementById('myChart'),this.theme[0])
      // 绘制图表
      this.myChart.setOption(this.option,true);
    }
  }
}
</script>

<style>

  #toolbar {
    height: 30px;
    position: fixed;
    margin-top: 20px;
    width: 500px;
    right: 0;
    z-index: 200
  }

  #theme {
    float: right;
    margin-right: 30px
  }

  #theme>span {
    vertical-align: middle;
    display: inline-block;
    margin-right: 10px;
    font-size: 16px;
    font-weight: bold
  }

  #theme p {
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
    display: inline-block;
    width: 30px;
    height: 30px;
    margin: 0 5px;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    background: #fff
  }

  #theme p span {
    display: inline-block;
    width: 26px;
    height: 26px;
    margin-left: 2px;
    margin-top: 2px
  }

  #theme p:hover {
    -webkit-box-shadow: 0 0 8px rgba(0,0,0,0.1);
    box-shadow: 0 0 8px rgba(0,0,0,0.1)
  }

  #theme p.selected {
    border: 1px solid #e43c59
  }

  #theme p.default span {
    background: #c23531;
    background: linear-gradient(135deg, #de7e7b 0%, #c23531 50%, #2f4554 51%, #547b95 100%);
  }

  #theme p.light span {
    background: #37A2DA;
    background: linear-gradient(135deg, #8dcaea 0%, #37A2DA 50%, #ffd85c 51%, #fff0c2 100%)
  }

  #theme p.dark {
    background: #333
  }

  #theme p.dark span {
    background: #dd6b66;
    background: linear-gradient(135deg, #f0bcb9 0%, #dd6b66 50%, #759aa0 51%, #b1c6ca 100%)
  }

  #toolbar #theme {
    padding: 4px 10px;
    background: #fff;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -webkit-box-shadow: 0 0 15px rgba(0,0,0,0.1);
    box-shadow: 0 0 15px rgba(0,0,0,0.1);
    border: 1px solid #aaa
  }

  #toolbar #theme.dark {
    background: #222;
    color: #fff
  }

  .popover-title {
    color: #000
  }

  .theme-palette {
    color: #000;
    font-size: 18px
  }

  .theme-palette span {
    width: 20px;
    height: 20px;
    margin-left: 3px;
    display: inline-block
  }

</style>
