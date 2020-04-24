<template>
  <div>
    <div style="margin-top: 10px;margin-bottom: 20px">
      <!--span style="margin-left:5px">股票池选择</span-->
      <StockSelect style="margin-top: 10px" @stockSelectChange="getFactorSelect"></StockSelect>
    </div>
    <!--span style="margin-left:5px">因子选择</span-->
    <div id="select-Factors" v-if="showFactorSelect" style="margin-top: 10px;margin-bottom: 20px">
      <el-tabs v-model="factorsTab">
        <el-tab-pane label="基础" name="1">
          日线行情：
          <el-select class="select" v-model="factors.daily" multiple placeholder="请选择" >
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
          <el-select class="select" v-model="factors.daily_basic" multiple placeholder="请选择" >
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
          <el-select class="select" v-model="factors.cashflow" multiple placeholder="请选择" >
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
          <div class="advanced-factor-select">
            <li v-for="category in categories">
              {{category.name}}:
              <el-select v-model="categories[categories.indexOf(category)].selected" @change="selectFactorChange($event,category)" multiple placeholder="请选择">
                <el-option
                  v-for="item in category.value"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                  :title="item.description"
                >
                </el-option>
              </el-select>
            </li>
          </div>

        </el-tab-pane>
      </el-tabs>
    </div>

    <div id="ana-or-vali" v-cloak style="margin-top: 10px;margin-bottom: 20px">
      <el-tabs v-model="twoTab">
        <el-tab-pane label="因子分析" name="analysisTab">
          <TopBox @newModel="newModel"  @newDate="newDate" @buttonOn="onAnalyse" ref = "topbox"></TopBox>
          <div id="myChart" :style="{ width:'900px', height: '450px'}"></div>
          <el-button @click="backtest">回测测试</el-button>
        </el-tab-pane>
        <el-tab-pane label="因子有效性" name="validationTab">
          <el-row>
            <el-col :span="12">
              <DateStartToEnd @getDate="getDate"></DateStartToEnd>
            </el-col>
            <el-col :span="12">
              <el-button type="primary" style="border-width:0;background-color:#587482;width:100px" @click="handleSearch">验证</el-button>
            </el-col>
          </el-row>
          <chart height="100%" width="100%" :result="this.result" :addMark="this.addMark"></chart>
        </el-tab-pane>
        <el-tab-pane label="堆叠模型测试" name="ModelBacktest">
          <el-row>
            <el-col :span="12">
              <DateStartToEnd @getDate="getDate"></DateStartToEnd>
            </el-col>
            <el-col :span="12">
              <el-button style="border-width:0;background-color:#587482;width:120px" @click="modelBacktest">堆叠模型回测</el-button>
            </el-col>
          </el-row>
          <el-row>
            <BarTable ref="barTable"></BarTable>
          </el-row>
          <div id="testChart" :style="{ width:'900px', height: '450px',marginTop:'10px'}"></div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import Tabs from "./tabs";
  import StockSelect from "./StockSelect";
  import Pane from "./pane";
  import BasicFactorInfo from "./BasicFactorInfo";
  import TopBox from "@/components/SelectBox/TopBox"
  import DateStartToEnd from "@/components/SelectBox/DateStartToEnd"
  import Chart from '@/components/Charts/multiFactorValidation'
  import BarTable from "./BarTable";

  export default {
    name: "FactorSelect",
    components: {
      BarTable,
      Pane,
      StockSelect,
      Tabs,
      TopBox,
      DateStartToEnd,
      Chart,
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

        options: [],
        value: '',
        values: [],
        result: [],
        addMark: false,

        factorsTab: "1",
        twoTab: "analysisTab",
        stockPool:[],
        showFactorSelect:false,
        categories:[],
        factors:{
          daily_basic: [],
          daily: [],
          cashflow: [],
        },
        allFactor: {
          dailyBasicFactorAll: BasicFactorInfo.dailyBasicFactorInfo,
          dailyFactorAll: BasicFactorInfo.dailyFactorInfo,
          cashflowFactorAll: BasicFactorInfo.cashflowFactorInfo,
        },
      }
    },
    methods: {
      getFactorSelect(stockPool){
        this.stockPool=stockPool
        this.$axios.get('/factor/advanced/list').then(ret=>{
          this.showFactorSelect=true
          let data=ret.data
          for(let key in data){
            let category={name:key,value:data[key],oldValue:[[]],selected:[]}
            console.log(category)
            this.categories.push(category)
          }
        })
          .catch(err=>{
            console.log(err)
          })
      },
      selectFactorChange(val, old) {
        console.log(val)
        console.log(old)
        //获取旧选择记录信息
        //let data= this.categories.filter(function(item){return item.name == old.name;})
        let index = this.categories.indexOf(old)
        let oldOptions = old.oldValue

        let allValues = []
        //保留所有值
        for (let item of old.value) {
          allValues.push(item.value)
        }
        let ret = []
        // 用来储存上一次的值，可以进行对比
        const oldVal = oldOptions.length === 1 ? [] : oldOptions[1]
        //console.log(typeof(oldVal))
        // 若是全部选择
        if (val.includes('all')) ret = allValues
        // 取消全部选中  上次有 当前没有 表示取消全选
        if (oldVal.includes('all') && !val.includes('all')) {
          ret = []
        }
        // 点击非全部选中  需要排除全部选中 以及 当前点击的选项
        // 新老数据都有全部选中
        if (oldVal.includes('all') && val.includes('all')) {
          const index = val.indexOf('all')
          val.splice(index, 1) // 排除全选选项
          ret = val
        }
        //全选未选 但是其他选项全部选上 则全选选上 上次和当前 都没有全选
        if (!oldVal.includes('all') && !val.includes('all')) {
          if (val.length === allValues.length - 1) ret = allValues
          else ret = val
        }

        this.categories[index].selected = ret

        //记录选择
        this.categories[index].oldValue[1] = ret
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
          series:data[2]
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
      testDrawLine(){
        this.testChart=this.$echarts.init(document.getElementById('testChart'),'default')
        this.testChart.setOption(this.option,true);
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
      getDate(value2) {
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
        this.$axios
          .post('/turnover-analysis',{
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
      handleSearch() {
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
          })
          .catch(err => {
            alert('请求失败');
          })
      },
      backtest(){
        console.log(this.stockPool)
        this.$axios
          .post('/factor/backtest',{
            date:this.date,
            pool: this.stockPool,
            factors:this.categories,
            basicFactors:this.factors,
          })
          .then(res => {
            this.tree = res.data; //把取item的数据赋给 tree
            console.log(res.data);
            this.$refs.barTable.tableData=res.data
            this.option = this.setBacktestOption(res.data)
            this.drawLine();
            this.$refs.topbox.buttonOff()
          })
          .catch(err => {
            alert('请求失败');
            this.$refs.topbox.buttonOff()
          })
      },
      modelBacktest(){
        this.$axios
          .post('/factor/modelTest',{
            date:this.date,
            category: this.category,
            factors:this.factors
          })
          .then(res => {
            //console.log(res.data);
            this.tree = res.data.chart_data; //把取item的数据赋给 tree
            //console.log(res.data.table_data)
            this.$refs.barTable.getTableData(res.data.table_data)
            this.option = this.setBacktestOption(res.data.chart_data)
            this.testDrawLine();
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
