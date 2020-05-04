<template>
  <div class="chart-container">
    <div class="app-container">
      <!--<el-input-->
        <!--placeholder="输入交易日期"-->
        <!--v-model="currValue"-->
        <!--type="number"-->
        <!--tabindex="1"-->
        <!--auto-complete="remove"-->
        <!--style="width: 150px"-->
      <!--/>-->
      <el-row>
        <el-col :span="12">
          <DateSelect @getIndustryDate="getIndustryDate"></DateSelect>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" :loading="industryButtonState" style="border-width:0;background-color:#587482;width:100px" @click="indButton">{{industryButtonText}}</el-button>
        </el-col>
      </el-row>
      <!--<el-button type="primary" style="border-width:0;background-color:#587482;width:100px;margin-top:20px;margin-bottom:20px;" @click.native="handleSearch">查询</el-button>-->
    </div>
    <chart height="100%" width="100%" :seriesData="this.seriesData">
    </chart>
  </div>
</template>

<script>
import Chart from '@/components/Charts/Keyboard'
import DateSelect from '@/components/SelectBox/DateSelect'

export default {
  name: 'Market',
  data() {
    return {
      // currValue: '20181228',
      // tradeDate: '20181228',
      industryDate: '',
      industryButtonState: false,
      industryButtonText: '确认',
      seriesData: []
    }
  },
  methods: {
    getIndustryDate(value1) {
      this.industryDate = value1
    },
    indButtonOn() {
      this.industryButtonState = true
      this.industryButtonText = '正在加载'
    },
    indButtonOff() {
      this.industryButtonState = false
      this.industryButtonText = '确认'
    },
    indButton() {
      this.indButtonOn()
      this.getChangeDistribution()
    },
    getChangeDistribution() {
      this.$axios.get('/market/pctChgDistribution', {
        params: {
          tradeDate: this.industryDate
        }
      }).then((response) => {
        console.log(response.data)
        this.seriesData = response.data
        this.indButtonOff()
      }).catch(err => { // 请求失败处理
        alert('当前日期没有交易数据,请重新选择日期!')
        console.log(err)
        this.indButtonOff()
      })
    }
    // handleSearch() {
    //   this.tradeDate = this.currValue
    //   // console.log('tradeDate:' + this.tradeDate)
    // }
  },
  components: { Chart, DateSelect }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
.title {
  font-size: 26px;
  /*color: ;*/
  margin: 20px auto 20px auto;
  text-align: left;
  font-weight:bold;
}
</style>

