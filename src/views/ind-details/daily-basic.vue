<template>
  <div id="dailybasictable" style="text-align: center;margin-left: 10px;margin-right: 10px">
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
        <el-button type="primary" :loading="buttonstate" style="border-width:0;background-color:#587482;width:100px" @click="buttonOn">{{buttontext}}</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="dailybasicList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
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
        prop="close"
        label="当日收盘价"
        sortable
        width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="turnover_rate"
        label="换手率(%)"
        sortable
        width="110"
        align="center">
      </el-table-column>
      <el-table-column
        prop="turnover_rate_f"
        label="换手率(自由流通股)"
        sortable
        width="170"
        align="center">
      </el-table-column>
      <el-table-column
        prop="volume_ratio"
        label="量比"
        sortable
        width="80"
        align="center">
      </el-table-column>
      <el-table-column
        prop="pe"
        label="市盈率"
        sortable
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="pe_ttm"
        label="市盈率(TTM)"
        sortable
        width="130"
        align="center">
      </el-table-column>
      <el-table-column
        prop="pb"
        label="市净率"
        sortable
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="ps"
        label="市销率"
        sortable
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="ps_ttm"
        label="市销率(TTM)"
        sortable
        width="130"
        align="center">
      </el-table-column>
      <el-table-column
        prop="dv_ratio"
        label="股息率(%)"
        sortable
        width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="dv_ttm"
        label="股息率(%,TTM)"
        sortable
        width="150"
        align="center">
      </el-table-column>
      <el-table-column
        prop="total_share"
        label="总股本(万股)"
        sortable
        width="140"
        align="center">
      </el-table-column>
      <el-table-column
        prop="float_share"
        label="流通股本(万股)"
        sortable
        width="140"
        align="center">
      </el-table-column>
      <el-table-column
        prop="free_share"
        label="自由流通股本(万)"
        sortable
        width="155"
        align="center">
      </el-table-column>
      <el-table-column
        prop="total_mv"
        label="总市值(万元)"
        sortable
        width="125"
        align="center">
      </el-table-column>
      <el-table-column
        prop="circ_mv"
        label="流通市值(万元)"
        sortable
        width="140"
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
      :total="dailybasicList.length">
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
        dailybasicList: [],
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
          .post('/ind-details-dailybasic',{
            tsCode:this.tsCode
          })
          .then(res => {
            this.dailybasicList = res.data
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
      buttonOn() {
        this.buttonstate = true;
        this.buttontext = "正在加载"
        this.$emit('changeDailyBasicOther', this.tsCode);
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
