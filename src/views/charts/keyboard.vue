<template>
  <div class="chart-container">
    <div class="title-container">
      <el-input
        placeholder="输入交易日期"
        v-model="currValue"
        type="number"
        tabindex="1"
        auto-complete="remove"
        style="width: 150px"
      />
      <el-button type="primary" style="border-width:0;background-color:#587482;width:100px;margin-top:20px;margin-bottom:20px;" @click.native="handleSearch">查询</el-button>
    </div>
    <chart height="100%" width="100%" :tradeDate="this.tradeDate">
    </chart>
  </div>
</template>

<script>
import Chart from '@/components/Charts/Keyboard'

export default {
  name: 'KeyboardChart',
  data() {
    return {
      currValue: '20181228',
      tradeDate: '20181228'
    }
  },
  methods: {
    handleSearch() {
      this.tradeDate = this.currValue
      // console.log('tradeDate:' + this.tradeDate)
    }
  },
  components: { Chart }
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

