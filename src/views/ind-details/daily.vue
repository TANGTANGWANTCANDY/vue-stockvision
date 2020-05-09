<template>
  <div id="dailytable" style="text-align: center;margin-left: 10px;margin-right: 10px">
    <el-row>
      <el-col :span="12">
        <el-input
          style=" margin-bottom: 10px"
          size="medium"
          placeholder="TS代码/股票代码/简称"
          prefix-icon="el-icon-search"
          v-model="tsCode">
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" :loading="buttonstate" style="border-width:0;background-color:#587482;width:100px" @click="dailyButtonOn">{{buttontext}}</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="dailyList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      height=430
      border
      style="width: 100%"
      :default-sort = "{ prop: 'trade_date', order: 'descending' }"
    >
      <el-table-column
        prop="trade_date"
        label="交易日期"
        sortable
        width="110"
        align="center">
      </el-table-column>
      <el-table-column
        prop="open"
        label="开盘价"
        sortable
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="high"
        label="最高价"
        sortable
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="low"
        label="最低价"
        sortable
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="close"
        label="收盘价"
        sortable
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="pre_close"
        label="昨收价"
        sortable
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="change"
        label="涨跌额"
        sortable
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="pct_chg"
        label="涨跌幅(%未复权)"
        sortable
        width="160"
        align="center">
      </el-table-column>
      <el-table-column
        prop="vol"
        label="成交量(手)"
        sortable
        width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="amount"
        label="成交额"
        sortable
        width="100"
        align="center">
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="dailySizeChange"
      @current-change="dailyCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="dailyList.length">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'DailyTable',
    data() {
      return {
        tsCode:"",
        buttonstate: false,
        buttontext: "查询",
        dailyList: [],
        // 当前页
        currentPage: 1,
        //  每页多少条
        pageSize: 10,
      }
    },
    activated() {
      this.tsCode = this.$route.query.tsCode
      // console.log('active: ' + this.tsCode);
      if (this.tsCode) {
        this.getDailyData();
      }else{
        console.log('tsCode无数据');
      }
    },
    methods: {
      // 每页多少条
      dailySizeChange(val) {
        this.pageSize = val
      },
      // 当前页
      dailyCurrentChange(val) {
        this.currentPage = val
      },
      getDailyData() {
        this.$emit('changeCard', this.tsCode);
        this.$axios
          .post('/ind-details-daily',{
            tsCode:this.tsCode
          })
          .then(res => {
            this.dailyList = res.data
            this.buttonOff()
          })
          .catch(err => {
            if (err.message !== 'interrupt') {
              alert('请求失败')
            }
            console.log(err);
            this.buttonOff()
          })
      },
      changeTsCode(tsCode) {
        this.tsCode = tsCode
        this.getDailyData()
      },
      dailyButtonOn() {
        this.buttonstate = true;
        this.buttontext = "正在加载"
        this.$emit('changeDailyOther', this.tsCode);
        this.getDailyData()
      },
      buttonOff() {
        this.buttonstate = false;
        this.buttontext = "查询"
      }
    }
  }
</script>

<style scoped>

</style>
