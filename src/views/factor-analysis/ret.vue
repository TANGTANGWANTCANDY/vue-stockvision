<template>
  <div class="app-container">
    <ThemeSwitch  @themeChange = "themeChange"></ThemeSwitch>



    <div id="myChart" :style="{ width:'900px', height: '450px'}"></div>

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

        factor:"初始",
        startdate:"",
        enddate:"",

        option: {
          title: {
            text: '收益率分析',
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['G01-G05', 'BENCH_RET']
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
            data: []
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
            name: 'G01-G05',
            data: [],
            type: 'line'
            },
            {
              name: 'BENCH_RET',
              data: [],
              type: 'line'
            }
          ]
        }
      }
    },
    components:{
      ThemeSwitch,
      TopBox
    },
    mounted(){
      this.$axios
        .get('/ret-analysis')
        .then(res => {
          this.tree = res.data; //把取item的数据赋给 tree
          console.log(res.data);
          this.option = this.setOption(res.data)
          this.drawLine();
        })
        .catch(err => {
          alert('请求失败');
        })
    },
    methods: {
      themeChange(theme) {
        this.myChart.dispose();//TODO: 释放图表，销毁对象并设置为null(多次操作可能会导致内存溢出)
        this.myChart = this.$echarts.init(document.getElementById('myChart'),theme)
        this.myChart.setOption(this.option,true);
      },

      setOption(data){
        return{
          title: {
            text: '收益率分析',
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['G01-G05', 'BENCH_RET']
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
            data: data[0]
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: 'G01-G05',
              data: data[1],
              type: 'line'
            },
            {
              name: 'BENCH_RET',
              data: data[2],
              type: 'line'
            }
          ]
        }
      },
      drawLine(){
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


