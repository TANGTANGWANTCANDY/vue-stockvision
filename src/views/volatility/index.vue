<template>
  <div class="app-container">
    <ThemeSwitch  @themeChange = "themeChange"></ThemeSwitch>
    <VolTopBox @newIndex="newIndex"  @newDate="newDate" @newStdLen="newStdLen" @volButtonOn="volAnalyse" ref = "voltopbox"></VolTopBox>
    <div id="myChart" :style="{ width:'900px', height: '450px'}"></div>

  </div>
</template>

<script>
  import ThemeSwitch from "@/components/ThemeSwitch/ThemeSwitch"
  import VolTopBox from "@/components/SelectBox/VolTopBox"
  import DateStartToEnd from "@/components/SelectBox/DateStartToEnd"

  export default {
    name: 'testview',
    data () {
      return {
        stdLen:0,
        codes: {
          indexCodes: []
        },
        date:{
          startdate:"",
          enddate:"",
        },

        option: {}
      }
    },
    components:{
      ThemeSwitch,
      VolTopBox,
      DateStartToEnd
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
            text: '波动率',
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: data[1]
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
          series: data[2]
        }
      },
      drawLine(){
        // 基于准备好的dom，初始化echarts实例
        this.myChart = this.$echarts.init(document.getElementById('myChart'),'default')
        // 绘制图表
        this.myChart.setOption(this.option,true);
      },
      newIndex(indexValue){
        this.codes.indexCodes = indexValue;
      },
      newDate(value2){
        this.date.startdate = value2[0]
        this.date.enddate = value2[1];
      },
      newStdLen(stdLen){
        this.stdLen = stdLen;
      },
      volAnalyse(){
        this.$axios
          .post('/volatility-analysis',{
            date:this.date,
            codes: this.codes,
            stdLen:this.stdLen
          })
          .then(res => {
            console.log(res.data);
            this.option = this.setOption(res.data)
            this.drawLine();
            this.$refs.voltopbox.buttonOff()
          })
          .catch(err => {
            alert('请求失败');
            this.$refs.voltopbox.buttonOff()
          })
      }

    }
  }
</script>

<style>

</style>
