<template>
  <div>
    <div class="select-date">
      <el-tabs>
        <el-tab-pane label="训练数据日期范围选择">
          <DateStartToEnd @getDate="getTrainDate"></DateStartToEnd>
        </el-tab-pane>
      </el-tabs>
      <el-tabs>
        <el-tab-pane label="目标日期范围选择">
          <DateStartToEnd @getDate="getTargetDate"></DateStartToEnd>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="select-param" style="margin-top: 5%">
      <el-input v-model="seqLen" placeholder="请输入因子序列长度"></el-input>
      <el-input v-model="windowLen" placeholder="请输入窗口长度"></el-input>
    </div>
    <el-row style="margin-top: 20px;margin-left: 20px">
      <el-button style="border-width:0;background-color:#587482;width:120px" :loading="loadingData" @click="backtest">模型回测</el-button>
    </el-row>
    <div class="backtest-result" v-if="showResult">
      <el-row>
        <BarTable :table-data="barTableData"></BarTable>
      </el-row>
      <el-row>
        <div id="Chart1" :style="{ width:'900px', height: '450px',marginTop:'10px'}"></div>
      </el-row>
    </div>
  </div>
</template>

<script>
  import DateStartToEnd from "@/components/SelectBox/DateStartToEnd"
  import BarTable from "../BarTable"

  export default {
    name: "GCForest",
    components: {BarTable,DateStartToEnd},
    data(){
      return{
        showResult:false,
        seqLen:'',
        windowLen:'',
        loadingData:false,
        trainDate:{
          startdate:'',
          enddate:''
        },
        targetDate:{
          startdate:'',
          enddate:''
        },
        basicFactors:{
          daily_basic: [],
          daily: [],
          cashflow: [],
        },
        factors:[],
        option:{},
        barTableData:[],
      }
    },
    methods:{
      getTrainDate(dates){
        this.trainDate.startdate=dates[0]
        this.trainDate.enddate=dates[1]
      },
      getTargetDate(dates){
        this.targetDate.startdate=dates[0]
        this.targetDate.enddate=dates[1]
      },
      drawLine(){
        // 基于准备好的dom，初始化echarts实例
        this.myChart = this.$echarts.init(document.getElementById('Chart1'),'default')
        // 绘制图表
        this.myChart.setOption(this.option,true);
      },
      setBacktestOption(data){
        return{
          title: {
            text: '回测',
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
      backtest(){
        this.loadingData=true
        this.$axios.post('/factor/model/GCForest',{
          trainDate:this.trainDate,
          targetDate:this.targetDate,
          pool:this.$route.query.pool,
          factors:this.$route.query.factors,
          basicFactors: this.$route.query.basicFactors,
          params:{
            seqLen: this.seqLen,
            windowLen: this.windowLen
          }
        }).then(res => {
          this.showResult=true
          this.loadingData=false
          console.log(res.data)
          console.log(res.data.table_data)
          this.barTableData=res.data.table_data
          this.option = this.setBacktestOption(res.data.chart_data)
          console.log(this.option)
          this.drawLine()
        }).catch(err => {
          this.loadingData=false
          alert('未知错误！请求失败！')
        })
      },
    }
  }
</script>

<style scoped>

</style>
