<template>
  <el-table
    :data="tables"
    border
    style="width: 100%"
    height="450"
  >
    <el-table-column label="序号" width="50px" type="index">
    </el-table-column>
    <template v-for='(col) in table'>
      <el-table-column
        sortable
        :show-overflow-tooltip="true"
        :prop="col.dataItem"
        :label="col.dataName"
        :key="col.dataItem"
        width="105px">
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
export default {
  props: {
    tables: {
      type: Array
    }
  },
  data() {
    return {
      table: [{
        dataItem: 'tsCode',
        dataName: '股票代码'
      }, {
        dataItem: 'tradeDate',
        dataName: '交易日期'
      }, {
        dataItem: 'open',
        dataName: '开盘价'
      }, {
        dataItem: 'high',
        dataName: '最高价'
      }, {
        dataItem: 'low',
        dataName: '最低价'
      }, {
        dataItem: 'close',
        dataName: '收盘价'
      }, {
        dataItem: 'preClose',
        dataName: '昨收价'
      }, {
        dataItem: 'change',
        dataName: '涨跌额'
      }, {
        dataItem: 'pctChg',
        dataName: '涨跌幅'
      }, {
        dataItem: 'vol',
        dataName: '成交量'
      }, {
        dataItem: 'amount',
        dataName: '成交额'
      }]
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>

