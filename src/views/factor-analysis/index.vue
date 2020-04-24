<template>
  <div class="app-container">
    <ThemeSwitch  @themeChange = "themeChange"></ThemeSwitch>

    <TopBox @newModel="newModel" @newFactor="newFactor" @newDate="newDate" @buttonOn="onAnalyse" ref = "topbox"></TopBox>

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

        model:"",
        factor:"",
        startdate:"",
        enddate:"",

        option: {},
        option1: {},
      }
    },
    components:{
      ThemeSwitch,
      TopBox
    },
    /*
    mounted(){
      this.$axios
        .get('/ic-analysis')
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
    */
    methods: {
      themeChange(theme) {
        this.myChart.dispose();//TODO: 释放图表，销毁对象并设置为null(多次操作可能会导致内存溢出)
        this.myChart = this.$echarts.init(document.getElementById('myChart'),theme)
        this.myChart.setOption(this.option,true);
      },

      setIcOption(data){
        return{
          title: {
            text: 'IC序列分析',
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
          series: [{
            label: {
              show: true
            },
            data: data[1],
            type: 'line'
          }]
        }
      },
      setIcDecayOption(data){
        return{
          title: {
            text: 'IC衰减',
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
          series: [{
            data: data[1],
            type: 'bar'
          }]
        }
      },
      setRetOption(data){
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
      setTurnoverOption(data){
        return{
          title: {
            text: '换手率分析',
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
      setBuyDecayOption(data){
        return{
          title: {
            text: '买入信号衰减与反转',
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['DECAY', 'TURNOVER']
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
              name: 'DECAY',
              data: data[1],
              type: 'bar'
            },
            {
              name: 'TURNOVER',
              data: data[2],
              type: 'bar'
            }
          ]
        }
      },
      setIndustryOption0(data){
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
      setIndustryOption1(data){
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
        this.myChart = this.$echarts.init(document.getElementById('myChart'),'default')
        // 绘制图表
        this.myChart.setOption(this.option,true);
      },
      newModel(model){
        this.model = model;
      },
      newFactor(keywords){
        this.factor = keywords;
      },
      newDate(value2){
        this.startdate = value2[0]
        this.enddate = value2[1];
      },
      onAnalyse() {
        if (this.model === 'ic') {
          this.icAnalyse();
        }
        else if (this.model === 'icdecay') {
          this.icDecay();
        }
        else if (this.model === 'ret') {
          this.retAnalyse();
        }
        else if (this.model === 'turnover') {
          this.turnoverAnalyse();
        }
        else if (this.model === 'buydecay') {
          this.buyDecay();
        }
        else if (this.model === 'industryana') {
          this.industryAnalyse();
        }
        else{
          alert('请选择分析模块');
          this.$refs.topbox.buttonOff();
        }
      },
      icAnalyse(){
        this.$axios
          .get('/ic-analysis/'+this.startdate+"/"+this.enddate+"?factors="+this.factor)
          .then(res => {
            this.tree = res.data; //把取item的数据赋给 tree
            console.log(res.data);
            this.option = this.setIcOption(res.data)
            this.drawLine();
            this.$refs.topbox.buttonOff()
          })
          .catch(err => {
            alert('请求失败');
            this.$refs.topbox.buttonOff()
          })
      },
      icDecay(){
        this.$axios
          .get('/ic-decay/'+this.factor+"/"+this.startdate+"/"+this.enddate)
          .then(res => {
            this.tree = res.data; //把取item的数据赋给 tree
            console.log(res.data);
            this.option = this.setIcDecayOption(res.data)
            this.drawLine();
            this.$refs.topbox.buttonOff()
          })
          .catch(err => {
            alert('请求失败');
            this.$refs.topbox.buttonOff()
          })
      },
      retAnalyse(){
        this.$axios
          .get('/ret-analysis/'+this.factor+"/"+this.startdate+"/"+this.enddate)
          .then(res => {
            this.tree = res.data; //把取item的数据赋给 tree
            console.log(res.data);
            this.option = this.setRetOption(res.data)
            this.drawLine();
            this.$refs.topbox.buttonOff()
          })
          .catch(err => {
            alert('请求失败');
            this.$refs.topbox.buttonOff()
          })
      },
      turnoverAnalyse(){
        this.$axios
          .get('/turnover-analysis/'+this.factor+"/"+this.startdate+"/"+this.enddate)
          .then(res => {
            this.tree = res.data; //把取item的数据赋给 tree
            console.log(res.data);
            this.option = this.setTurnoverOption(res.data)
            this.drawLine();
            this.$refs.topbox.buttonOff()
          })
          .catch(err => {
            alert('请求失败');
            this.$refs.topbox.buttonOff()
          })
      },
      buyDecay(){
        this.$axios
          .get('/buy-decay/'+this.factor+"/"+this.startdate+"/"+this.enddate)
          .then(res => {
            this.tree = res.data; //把取item的数据赋给 tree
            console.log(res.data);
            this.option = this.setBuyDecayOption(res.data)
            this.drawLine();
            this.$refs.topbox.buttonOff()
          })
          .catch(err => {
            alert('请求失败');
            this.$refs.topbox.buttonOff()
          })
      },
      industryAnalyse(){
        this.$axios
          .get('/industry-analysis/'+this.factor+"/"+this.startdate+"/"+this.enddate)
          .then(res => {
            this.tree = res.data; //把取item的数据赋给 tree
            console.log(res.data);
            this.option = this.setIndustryOption0(res.data)
            this.drawLine();
            this.$refs.topbox.buttonOff()
          })
          .catch(err => {
            alert('请求失败');
            this.$refs.topbox.buttonOff()
          })
      },

    }
  }
</script>

<style>

</style>
