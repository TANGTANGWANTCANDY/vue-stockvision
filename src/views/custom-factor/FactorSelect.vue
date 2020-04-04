<template>
  <div>
    <div style="margin-top: 10px;margin-bottom: 20px">
      <!--span style="margin-left:5px">股票池选择</span-->
      <StockSelect style="margin-top: 10px" @stockSelectChange="getStockPool"></StockSelect>
    </div>
    <!--span style="margin-left:5px">因子选择</span-->
    <div id="select-Factors" v-cloak style="margin-top: 10px;margin-bottom: 20px">
      <el-tabs v-model="factorsTab">
        <el-tab-pane label="基础" name="1">
          日线行情：
          <el-select class="select" v-model="factors.dailyFactors" multiple placeholder="请选择" >
            <el-option
              v-for="item in allFactor.dailyFactorAll"
              :key="item.value"
              :label="item.name"
              :value="item.value"
              :title="item.description"
            >
            </el-option>
          </el-select>
          每日指标：
          <el-select class="select" v-model="factors.dailyBasicFactors" multiple placeholder="请选择" >
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
        <el-tab-pane label="财务报表" name="2">
          现金流量表：
          <el-select class="select" v-model="factors.cashflowFactors" multiple placeholder="请选择" >
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
        <el-tab-pane label="高级" name="3">
          情感因子：
          <el-select class="select" v-model="factors.emotionFactors" multiple placeholder="请选择">
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
          <el-select class="select" v-model="factors.fluctuateFactors" multiple placeholder="请选择">
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
          <el-select class="select" v-model="factors.motiveFactors" multiple placeholder="请选择">
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
          <el-select class="select" v-model="factors.profitFactors" multiple placeholder="请选择">
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

    <div id="ana-or-vali" v-cloak style="margin-top: 10px;margin-bottom: 20px">
      <el-tabs v-model="twoTab">
        <el-tab-pane label="因子分析" name="analysisTab">
          <TopBox @newModel="newModel"  @newDate="newDate" @buttonOn="onAnalyse" ref = "topbox"></TopBox>
          <div id="myChart" :style="{ width:'900px', height: '450px'}"></div>
        </el-tab-pane>
        <el-tab-pane label="因子有效性" name="validationTab">
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
  export default {
    name: "FactorSelect",
    components: {
      Pane,
      StockSelect,
      Tabs,
      TopBox
    },
    data() {
      return {
        model:"",
        date:{
          startdate:"",
          enddate:"",
        },
        option: {},
        option1: {},


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
          .get('/ic-analysis',{
            date:this.date,
            category: this.category,
            factors:this.factors
          })
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
        //turnover-analysis
        this.$axios
          .post('/multiFactorValidation',{
            date:this.date,
            category: this.category,
            factors:this.factors
          })
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

<style scoped>
  [v-cloak] {
    display: none;
  }
  .select{
    width: 15%;
    margin-left: 2px;
  }
</style>
