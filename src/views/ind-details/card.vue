<template>
  <el-card id="stock-basic">
    <div id="text item">
      <el-row>
        <el-col :span="4">
          <el-row>
            <span style="font-size: 26px;">{{stockName}}</span>
          </el-row>
          <el-row>
            <span style="color:#999; font-size: 12px;">({{area}}:{{symbol}})</span>
          </el-row>
        </el-col>
        <!--<el-divider direction="vertical"></el-divider>-->
        <el-col :span="4">
          <el-row>
            <span style="font-size: 14px;">行业：{{industry}}</span>
          </el-row>
          <el-row>
            <span style="font-size: 14px;">市场：{{market}}</span>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
  export default {
    name: 'StockBasicCard',
    data() {
      return {
        stockName: "",
        area: "",
        tsCode: "",
        symbol: "",
        industry: "",
        market: "",
      }
    },
    methods: {
      newCard(tsCode){
        this.$axios
          .post('/ind-details-stockbasic',{
            tsCode:tsCode
          })
          .then(res => {
            console.log('res.data: ' + res.data);
            this.stockName = res.data[0]
            this.area = res.data[1]
            this.tsCode = res.data[2]
            this.symbol = res.data[3]
            this.industry = res.data[4]
            this.market = res.data[5]
          })
          .catch(err => {
            if (err.message !== 'interrupt') {
              alert('请求失败')
            }
            console.log(err);
          })
      }
    }
  }
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .stock-basic {
    width: 480px;
  }
</style>
