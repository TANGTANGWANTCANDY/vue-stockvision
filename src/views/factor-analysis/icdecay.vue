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


        factor:"",
        startdate:"",
        enddate:"",

        option: {
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
            data: []
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [],
            type: 'bar'
          }]
        }
      }
    },
    components:{
      ThemeSwitch,
      TopBox
    },
    mounted(){
      this.$axios
        .get('/ic-decay')
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
      drawLine(){
        // 基于准备好的dom，初始化echarts实例
        this.myChart = this.$echarts.init(document.getElementById('myChart'),'default')
        // 绘制图表
        this.myChart.setOption(this.option,true);
      },
      newfactor(keywords){
        this.factor = keywords;
        //   this.reload()
      },
      newdate(value2){
        this.startdate = value2[0]
        this.enddate = value2[1];
      },
      ana(){

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
      }
    }
  }
</script>

<style>

</style>
