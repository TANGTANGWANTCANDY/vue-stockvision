<template>
  <div class="chart-container">
    <div class="app-container">
      <el-row>
        <el-col :span="12">
          <DateStartToEnd @getDate="getValidDate"></DateStartToEnd>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" :loading="industryButtonState" style="border-width:0;background-color:#587482;width:100px" @click="indButton">{{industryButtonText}}</el-button>
        </el-col>
      </el-row>
    </div>
    <chart height="100%" width="100%" :dateList="this.dateList" :limitUpList="this.limitUpList" :limitDownList="this.limitDownList">
    </chart>
  </div>
</template>

<script>
import Chart from '@/components/Charts/limitUpDown'
import DateStartToEnd from '@/components/SelectBox/DateStartToEnd'

export default {
  name: 'LimitUpDown',
  data() {
    return {
      startDate: '',
      endDate: '',
      industryButtonState: false,
      industryButtonText: '确认',
      dateList: [],
      limitUpList: [],
      limitDownList: [],
      mark: false
    }
  },
  methods: {
    getValidDate(value2) {
      this.startDate = value2[0]
      this.endDate = value2[1]
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
      // this.dateList = ['20180101', '20180102', '20180103', '20180104', '20180105', '20180106', '20180107' ,'20180109']
      // this.indButtonOff()
      this.getLimitUpDown()
    },
    getLimitUpDown() {
      this.$axios.get('/market/limitUpDown', {
        params: {
          startDate: this.startDate,
          endDate: this.endDate
        }
      }).then((response) => {
        console.log(response.data)
        this.dateList = response.data.dateList
        this.limitUpList = response.data.limitUpList
        this.limitDownList = response.data.limitDownList
        this.indButtonOff()
      }).catch(err => { // 请求失败处理
        alert('当前日期范围没有交易数据,请重新选择日期范围!')
        console.log(err)
        this.indButtonOff()
      })
    }
  },
  components: { Chart, DateStartToEnd }
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

