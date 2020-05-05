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
      <el-row style="margin-top: 20px;margin-left: 20px">
        <el-button style="border-width:0;background-color:#587482;width:120px" :loading="loadingData" @click="backtest">模型回测</el-button>
      </el-row>
    </div>
    <div class="backtest-result" v-if="showResult">
      <el-row>
        <BarTable ref="barTable"></BarTable>
      </el-row>
      <el-row>
        <div id="testChart" :style="{ width:'900px', height: '450px',marginTop:'10px'}"></div>
      </el-row>
    </div>
  </div>
</template>

<script>
  import DateStartToEnd from "@/components/SelectBox/DateStartToEnd"
  import BarTable from "./BarTable"

    export default {
      name: "StackRegressor",
      components: {BarTable,DateStartToEnd},
      data(){
        return{
          showResult:false,
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
        }
      },
      mounted(){
        console.log(this.$route.query.factors)
        console.log(this.$route.query.basicFactors)
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
          this.myChart = this.$echarts.init(document.getElementById('testChart'),'default')
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
          this.$axios.post('/factor/modelTest',{
              trainDate:this.trainDate,
              targetDate:this.targetDate,
              pool:this.$route.query.pool,
              factors:this.$route.query.factors,
              basicFactors: this.$route.query.basicFactors
            })
            .then(res => {
              this.tree = res.data.chart_data; //把取item的数据赋给 tree
              this.showResult=true
              this.loadingData=false
              console.log(res.data)
              this.$refs.barTable.getTableData(res.data.table_data)
              this.option = this.setBacktestOption(res.data.chart_data)
              this.drawLine();
            })
            .catch(err => {
              alert('请求失败');
            })
        },
      }
    }
</script>

<style scoped>
  .select-date{
    text-align: left;
  }
</style>
