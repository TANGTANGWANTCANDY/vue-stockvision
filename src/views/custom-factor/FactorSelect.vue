<template>
  <div>
    <ThemeSwitch  @themeChange = "themeChange"></ThemeSwitch>
    <div id="select-Stock" style="margin-bottom: 10px">
      <!--span style="margin-left:5px">股票池选择</span-->
      <el-tabs v-model="stockTab">
        <el-tab-pane label="股票池选择" name="stock1">
          <StockSelect style="margin-bottom: 10px" @stockSelectChange="getStockPool"></StockSelect>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!--span style="margin-left:5px">因子选择</span-->
    <div id="select-Factors" v-cloak style="margin-bottom: 10px">
      <el-tabs v-model="factorsTab">
        <el-tab-pane label="基础因子" name="1">
          日线行情：
          <el-select class="select" v-model="factors.dailyFactors" multiple collapse-tags placeholder="请选择" >
            <el-option
              v-for="item in allFactor.dailyFactorAll"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          每日指标：
          <el-select class="select" v-model="factors.dailyBasicFactors" multiple collapse-tags placeholder="请选择" >
            <el-option
              v-for="item in allFactor.dailyBasicFactorAll"
              :key="item.value"
              :label="item.name"
              :value="item.value"
              :title="item.description"
            >
            </el-option>
          </el-select>
        </el-tab-pane>
        <el-tab-pane label="财务报表因子" name="2">
          现金流量表：
          <el-select class="select" v-model="factors.cashflowFactors" multiple collapse-tags placeholder="请选择" >
            <el-option
              v-for="item in allFactor.cashflowFactorAll"
              :key="item.value"
              :label="item.name"
              :value="item.value"
              :title="item.description"
            >
            </el-option>
          </el-select>
        </el-tab-pane>
        <el-tab-pane label="高级因子" name="3">
          情感因子：
          <el-select class="select" v-model="factors.emotionFactors" multiple collapse-tags placeholder="请选择">
            <el-option
              v-for="item in allFactor.emotionFactorAll"
              :key="item.value"
              :label="item.name"
              :value="item.value"
              :title="item.description"
            >
            </el-option>
          </el-select>
          波动因子：
          <el-select class="select" v-model="factors.fluctuateFactors" multiple collapse-tags placeholder="请选择">
            <el-option
              v-for="item in allFactor.fluctuateFactorAll"
              :key="item.value"
              :label="item.name"
              :value="item.value"
              :title="item.description"
            >
            </el-option>
          </el-select>
          动量因子：
          <el-select class="select" v-model="factors.motiveFactors" multiple collapse-tags placeholder="请选择">
            <el-option
              v-for="item in allFactor.emotionFactorAll"
              :key="item.value"
              :label="item.name"
              :value="item.value"
              :title="item.description"
            >
            </el-option>
          </el-select>
          收益因子：
          <el-select class="select" v-model="factors.profitFactors" multiple collapse-tags placeholder="请选择">
            <el-option
              v-for="item in allFactor.profitFactorAll"
              :key="item.value"
              :label="item.name"
              :value="item.value"
              :title="item.description"
            >
            </el-option>
          </el-select>
        </el-tab-pane>
      </el-tabs>
    </div>

    <div id="ana-or-vali" v-cloak style="margin-bottom: 10px">
      <el-tabs v-model="twoTab">
        <el-tab-pane label="因子分析" name="analysisTab">
          <TopBox @newModel="newModel"  @newDate="newDate" @newChangeBin="newChangeBin" @buttonOn="onAnalyse" ref = "topbox"></TopBox>
          <div id="myChart" :style="{ width:'900px', height: '450px'}"></div>
        </el-tab-pane>
        <el-tab-pane label="因子有效性" name="validationTab">
          <el-row>
            <el-col :span="12">
              <DateStartToEnd @getDate="getValidDate"></DateStartToEnd>
            </el-col>
            <el-col :span="12">
              <el-button type="primary" :loading="vailbuttonstate" style="border-width:0;background-color:#587482;width:100px" @click="handleSearch">{{vailbuttontext}}</el-button>
            </el-col>
          </el-row>
          <chart height="100%" width="100%" :result="this.result" :addMark="this.addMark"></chart>
        </el-tab-pane>
      </el-tabs>


    </div>
  </div>
</template>

<script>
  import Tabs from "./tabs";
  import StockSelect from "./StockSelect";
  import Pane from "./pane";
  import FactorInfo from "./FactorInfo";
  import TopBox from "@/components/SelectBox/TopBox"
  import DateStartToEnd from "@/components/SelectBox/DateStartToEnd"
  import Chart from '@/components/Charts/multiFactorValidation'
  import ThemeSwitch from "@/components/ThemeSwitch/ThemeSwitch"

  export default {
    name: "FactorSelect",
    components: {
      Pane,
      StockSelect,
      Tabs,
      TopBox,
      DateStartToEnd,
      Chart,
      ThemeSwitch,
    },
    data() {
      return {
        model:"",
        changeBin:"",
        date:{
          startdate: "",
          enddate: "",
        },
        option: {},
        option1: {},

        options: [],
        value: '',
        values: [],
        result: [],
        addMark: false,
        vailbuttonstate: false,
        vailbuttontext: "验证",

        stockTab: "stock1",
        factorsTab: "1",
        twoTab: "analysisTab",
        category:{
          exchange:[],
          industry:[],
          market:[],
          index:[]
        },
        factors: {
          dailyBasicFactors: [],
          dailyFactors: [],
          cashflowFactors: [],
          valueFactors: [],
          analystFactors: [],
          developFactors: [],
          emotionFactors: [],
          fluctuateFactors: [],
          motiveFactors: [],
          profitFactors: [],
        },
        allFactor: {
          dailyBasicFactorAll: FactorInfo.dailyBasicFactorInfo,
          dailyFactorAll: FactorInfo.dailyFactorInfo,
          cashflowFactorAll: FactorInfo.cashflowFactorInfo,
          valueFactorAll: [],
          analystFactorAll: [],
          developFactorAll: [],
          emotionFactorAll: FactorInfo.emotionFactorInfo,
          fluctuateFactorAll: FactorInfo.fluctuateFactorInfo,
          motiveFactorAll: FactorInfo.motiveFactorInfo,
          profitFactorAll: FactorInfo.profitFactorInfo,
        },
      }
    },
    methods: {
      getStockPool(obj){
        this.category.exchange=obj.exchange
        this.category.industry=obj.industry
        this.category.market=obj.market
        this.category.index=obj.index
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
      newChangeBin(changeBin){
        this.changeBin = changeBin;
      },
      newDate(value2){
        this.date.startdate = value2[0]
        this.date.enddate = value2[1];
      },
      getValidDate(value2) {
        this.date.startdate = value2[0]
        this.date.enddate = value2[1];
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
          .post('/ic-analysis',{
            date:this.date,
            category: this.category,
            factors:this.factors,
            changeBin:this.changeBin
          })
          .then(res => {
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
          .post('/ic-decay',{
            date:this.date,
            category: this.category,
            factors:this.factors,
            changeBin:this.changeBin
          })
          .then(res => {
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
          .post('/ret-analysis',{
            date:this.date,
            category: this.category,
            factors:this.factors,
            changeBin:this.changeBin
          })
          .then(res => {
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
          .post('/turnover-analysis',{
            date:this.date,
            category: this.category,
            factors:this.factors,
            changeBin:this.changeBin
          })
          .then(res => {
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
          .post('/buy-decay',{
            date:this.date,
            category: this.category,
            factors:this.factors,
            changeBin:this.changeBin
          })
          .then(res => {
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
          .post('/industry-analysis',{
            date:this.date,
            category: this.category,
            factors:this.factors,
            changeBin:this.changeBin
          })
          .then(res => {
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
      handleSearch() {
        this.vailbuttonstate = true;
        this.vailbuttontext = "正在加载"
        this.$axios
          .post('/multiFactorValidation',{
            date:this.date,
            category: this.category,
            factors:this.factors
          })
          .then(res => {
            this.result = res.data
            this.addMark = !this.addMark
            console.log(this.result)
            this.vailbuttonstate = false;
            this.vailbuttontext = "验证"
          })
          .catch(err => {
            alert('请求失败');
            this.vailbuttonstate = false;
            this.vailbuttontext = "验证"
          })
      },
      themeChange(theme) {
        this.myChart.dispose();//TODO: 释放图表，销毁对象并设置为null(多次操作可能会导致内存溢出)
        this.myChart = this.$echarts.init(document.getElementById('myChart'),theme)
        this.myChart.setOption(this.option,true);
      },
    }
  }
</script>

<style scoped>
  [v-cloak] {
    display: none;
  }
  .select{
    width: 15%;
    margin-left: 2px;
  }
  .chart-container{
    position: relative;
    width: 100%;
    height: calc(100vh - 84px);
  }
  .title {
    font-size: 18px;
    /*color: ;*/
    margin: 20px auto 20px auto;
    text-align: left;
    font-weight:bold;
    height: 30px;
  }
</style>
