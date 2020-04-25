<template>
  <div class="app-container">
    <ThemeSwitch  @themeChange = "themeChange"></ThemeSwitch>

    <p>日期：{{returntext}}</p>
    <p>数据传递：{{returntext1}}</p>
    <FactorSelect @getFactor="getFactor"></FactorSelect>
    <DateStartToEnd @getDate="getDate"></DateStartToEnd>

    <div id="myChart" :style="{ width:'900px', height: '500px'}" ></div>

  </div>
</template>

<script>
  import ThemeSwitch from "@/components/ThemeSwitch/ThemeSwitch"
  import FactorSelect from "@/components/SelectBox/FactorSelect"
  import DateStartToEnd from "@/components/SelectBox/DateStartToEnd"
export default {
  name: 'testview',
  data () {
    return {
      returntext:"初始状态",
      returntext1:"未传递",
      factorname: 'change',

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
  components:{
    ThemeSwitch,
    FactorSelect,
    DateStartToEnd
  },
  mounted(){
    this.$axios
      .get('/test-box/'+'默认'+'/chosefactor')
      .then(resp => {
        this.returntext1 = resp.data
        console.log('您选择了：',resp.data)
        this.drawLine();
      })
      .catch(err => {
        alert('请求失败');
      })

  },
  inject: ['reload'], // 注入reload方法

  methods: {
    themeChange(theme) {
      this.myChart.dispose();//TODO: 释放图表，销毁对象并设置为null(多次操作可能会导致内存溢出)
      this.myChart = this.$echarts.init(document.getElementById('myChart'),theme)
      this.myChart.setOption(this.option,true);
    },
    drawLine(){
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(document.getElementById('myChart'),'default')
      // 绘制图表
      this.myChart.setOption(this.option,true);
    },

    getFactor(keywords){
      this.returntext = keywords;
      this.postFactor(keywords)
    },

    postFactor (keywords) {
      this.$axios
        .get('/test-box/'+keywords)
        .then(resp => {
            this.returntext1 = resp.data
            console.log('您选择了：',resp.data)
      })
        .catch(err => {
          alert('请求失败');
        })
   //   this.reload()
    },
    getDate(value2){
      this.returntext = value2[0]+"+"+value2[1];
    }
  }
}

</script>

<style>

</style>
