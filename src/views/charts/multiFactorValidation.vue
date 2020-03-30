<template>
  <div class="chart-container">
    <div class="title">
      选择因子：
      <el-select v-model="value"  placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
    </div>
    <div class="title">
      开始日期：
      <el-input
        placeholder=""
        v-model="startDate"
        type="number"
        tabindex="1"
        auto-complete="remove"
        style="width: 150px"
      />
    </div>
    <div class="title">
      结束日期：
      <el-input
        placeholder=""
        v-model="endDate"
        type="number"
        tabindex="1"
        auto-complete="remove"
        style="width: 150px"
      />
    </div>
    <el-button type="primary" style="border-width:0;background-color:#587482;width:100px;margin-top:10px;margin-bottom:10px;" @click.native="handleSearch">验证</el-button>
    <chart height="100%" width="100%" :factorList="this.factorList" :result="this.result" :addMark="this.addMark"></chart>  </div>
</template>

<script>
import Chart from '@/components/Charts/multiFactorValidation'
import axios from 'axios'

export default {
  name: 'KeyboardChart',
  data() {
    return {
      options: [],
      value: '',
      values: [],
      startDate: '20171001',
      endDate: '20171227',
      factorList: [],
      result: [],
      addMark: false
    }
  },
  mounted() {
    this.getFactors()
  },
  watch: {
    value(val, oldVal) {
      this.addFactor(val)
    }
  },
  methods: {
    getFactors() {
      axios.get('/getAllFactors').then((response) => {
        this.options = response.data
        console.log(this.options)
      }).catch(function(error) { // 请求失败处理
        console.log(error)
      })
    },
    handleSearch() {
      this.factorList = this.values
      console.log(this.factorList)
      this.values = []
      axios.get('/multiFactorValidation', {
        params: {
          startDate: this.startDate,
          endDate: this.endDate,
          factorList: this.factorList
        }
      }).then((response) => {
        this.result = response.data
        this.addMark = !this.addMark
        console.log(this.result)
      }).catch(function(error) { // 请求失败处理
        console.log(error)
      })
    },
    addFactor(val) {
      this.values.push(val)
      // console.log(this.values)
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
    font-size: 18px;
    /*color: ;*/
    margin: 20px auto 20px auto;
    text-align: left;
    font-weight:bold;
    height: 30px;
  }
</style>
