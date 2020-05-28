<template>
  <el-table :data="tableData" border>
    <!--total_commission_money-->
    <el-table-column prop="0" label="总交易费用"></el-table-column>
    <!--benchmark_cum_return-->
    <el-table-column prop="1" label="基准收益率"></el-table-column>
    <!--strategy_cum_return-->
    <el-table-column prop="2" label="收益率"></el-table-column>
    <!--benchmark_annual_return-->
    <el-table-column prop="3" label="基准年化收益率"></el-table-column>
    <!--strategy_annual_return-->
    <el-table-column prop="4" label="年化收益率"></el-table-column>
    <!--buy_trade_num-->
    <el-table-column prop="5" label="买入"></el-table-column>
    <!--sell_trade_num-->
    <el-table-column prop="6" label="卖出"></el-table-column>
    <!--win_rate-->
    <el-table-column prop="7" label="胜率"></el-table-column>
    <!--max_drawdown-->
    <el-table-column prop="8" label="最大回撤"></el-table-column>
    <!--sharp-->
    <el-table-column prop="9" label="夏普比率"></el-table-column>
  </el-table>
</template>

<script>
    export default {
      name: "BarTable",
      props:{
          tableData:{
            type: Array,
            required:true,
          },
      },
      data(){
        return{

        }
      },

    }

</script>

<style scoped>

</style>
