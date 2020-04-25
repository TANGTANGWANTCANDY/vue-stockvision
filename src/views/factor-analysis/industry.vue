<template>
  <div class="app-container">
    <ThemeSwitch  @themeChange = "themeChange"></ThemeSwitch>


    <div id="myChart0" :style="{ width:'900px', height: '300px'}"></div>
    <div id="myChart" :style="{ width:'900px', height: '600px'}"></div>

  </div>
</template>

<script>
  import ThemeSwitch from "@/components/ThemeSwitch/ThemeSwitch"
  import TopBox from "@/components/SelectBox/TopBox"
  export default {
    name: 'testview',
    data () {
      return {
        tree:[],

        factor:"",
        startdate:"",
        enddate:"",

        option0:{},
        option: {
          title: {
            text: '版块分析',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['DECAY', 'TURNOVER']
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          series: []
        }
      }
    },
    components:{
      ThemeSwitch,
      TopBox
    },
    mounted(){
      this.$axios
        .get('/industry-analysis')
        .then(res => {
          this.tree = res.data; //把取item的数据赋给 tree
          console.log(res.data);
          this.option0 = this.setOption0(res.data)
          this.option = this.setOption(res.data)
          this.drawLine();
        })
        .catch(err => {
          alert('请求失败');
        })
    },
    methods: {
      themeChange(theme) {
        this.myChart0.dispose();//TODO: 释放图表，销毁对象并设置为null(多次操作可能会导致内存溢出)
        this.myChart0 = this.$echarts.init(document.getElementById('myChart'),theme)
        this.myChart0.setOption(this.option,true);

        this.myChart.dispose();//TODO: 释放图表，销毁对象并设置为null(多次操作可能会导致内存溢出)
        this.myChart = this.$echarts.init(document.getElementById('myChart'),theme)
        this.myChart.setOption(this.option,true);
      },

      setOption0(data){
        return{
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
      //    legend: {
        //    data: data[1]
          //},
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value'
          },
          yAxis: {
            type: 'category',
            data: data[2]
          },
          series: data[3]
        }
      },
      setOption(data){
        return{
          title: {
            text: '版块分析',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
  //        legend: {
    //        orient: 'vertical',
      //      left: 'right',
        //    data: data[1]
          //},
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          series: [
            {
              name: 'G01',
              type: 'pie',
         //     radius: '50%',
           //   center: ['25%', '60%'],
              data: data[0][0],
            }
          ]
        }
      },
      drawLine(){
        // 基于准备好的dom，初始化echarts实例
        this.myChart0 = this.$echarts.init(document.getElementById('myChart0'),'default')
        // 绘制图表
        this.myChart0.setOption(this.option0,true);

        // 基于准备好的dom，初始化echarts实例
        this.myChart = this.$echarts.init(document.getElementById('myChart'),'default')
        // 绘制图表
        this.myChart.setOption(this.option,true);
      }
    }
  }
</script>

<style>

</style>


