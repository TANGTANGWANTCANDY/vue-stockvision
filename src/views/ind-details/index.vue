<template>
  <div id="detail">
    <Card ref="basicCard"></Card>
    <el-tabs tab-position="top" style="height: 100%;">
      <el-tab-pane label="日线行情">
        <DailyTable @changeCard="changeCard" @changeDailyOther="changeDailyOther" ref="dailytable"></DailyTable>
      </el-tab-pane>
      <el-tab-pane label="每日指标">
        <DailyBasicTable @changeCard="changeCard" @changeDailyBasicOther="changeDailyBasicOther" ref="dailybasictable"></DailyBasicTable>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import DailyTable from "./daily";
  import DailyBasicTable from "./daily-basic";
  import Card from "./card";

  export default {
    name: 'IndDetails',
    components: {
      DailyTable,
      DailyBasicTable,
      Card,
    },
    data() {
      return {
      }
    },
    methods: {
      changeCard(tsCode) {
        // console.log('运行changeCard');
        this.$refs.basicCard.newCard(tsCode)
      },
      changeDailyOther(tsCode) {
        // console.log('changeDailyOther');
        this.$refs.dailybasictable.changeTsCode(tsCode)
      },
      changeDailyBasicOther(tsCode) {
        // console.log('changeDailyBasicOther');
        this.$refs.dailytable.changeTsCode(tsCode)
      }
    }
  }
</script>

<style scoped>

</style>
