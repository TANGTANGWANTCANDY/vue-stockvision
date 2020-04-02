<template>
  <div>
    <span>股票池选择</span>
    <div style="margin-top: 20px;margin-bottom: 20px">
      <StockSelect></StockSelect>
    </div>
    <span>因子选择</span>
    <div id="select-Factors" v-cloak style="margin-top: 10px;margin-bottom: 20px">
      <tabs v-model="tab">
        <pane label="基础" name="1">
          日线行情：
          <el-select v-model="factors.dailyFactors" multiple placeholder="请选择">
            <el-option
              v-for="item in allFactor.dailyFactorAll"
              :key="item.value"
              :label="item.name"
              :value="item.value"
              :title="item.description"
            >
            </el-option>
          </el-select>
          每日指标：
          <el-select v-model="factors.dailyBasicFactors" multiple placeholder="请选择">
            <el-option
              v-for="item in allFactor.dailyBasicFactorAll"
              :key="item.value"
              :label="item.name"
              :value="item.value"
              :title="item.description"
            >
            </el-option>
          </el-select>
        </pane>
        <pane label="财务报表" name="2">
          现金流量表：
          <el-select v-model="factors.cashflowFactors" multiple placeholder="请选择">
            <el-option
              v-for="item in allFactor.cashflowFactorAll"
              :key="item.value"
              :label="item.name"
              :value="item.value"
              :title="item.description"
            >
            </el-option>
          </el-select>
        </pane>
        <pane label="高级" name="3">
          情感因子：
          <el-select v-model="factors.emotionFactors" multiple placeholder="请选择">
            <el-option
              v-for="item in allFactor.emotionFactorAll"
              :key="item.value"
              :label="item.name"
              :value="item.value"
              :title="item.description"
            >
            </el-option>
          </el-select>
          波动因子：
          <el-select v-model="factors.fluctuateFactors" multiple placeholder="请选择">
            <el-option
              v-for="item in allFactor.fluctuateFactorAll"
              :key="item.value"
              :label="item.name"
              :value="item.value"
              :title="item.description"
            >
            </el-option>
          </el-select>
          动量因子：
          <el-select v-model="factors.motiveFactors" multiple placeholder="请选择">
            <el-option
              v-for="item in allFactor.emotionFactorAll"
              :key="item.value"
              :label="item.name"
              :value="item.value"
              :title="item.description"
            >
            </el-option>
          </el-select>
          收益因子：
          <el-select v-model="factors.profitFactors" multiple placeholder="请选择">
            <el-option
              v-for="item in allFactor.profitFactorAll"
              :key="item.value"
              :label="item.name"
              :value="item.value"
              :title="item.description"
            >
            </el-option>
          </el-select>
        </pane>
      </tabs>

    </div>
    <div id="jump-btns">
      <el-button id="do-to-factor-validation" @click="factorValidation">因子有效性</el-button>
      <el-button id="go-to-factor-analysis" @click="factorAnalysis">因子分析</el-button>
    </div>
  </div>
</template>

<script>
  import Tabs from "./tabs";
  import StockSelect from "./StockSelect";
  import Pane from "./pane";
  import FactorInfo from "./FactorInfo";
  export default {
    name: "FactorSelect",
    components: {Pane, StockSelect, Tabs},
    data() {
      return {
        tab: "3",
        factors: {
          dailyBasicFactors: [],
          dailyFactors: [],
          cashflowFactors: [],
          valueFactors: [],
          analystFactors: [],
          developFactors: [],
          emotionFactors: [],
          fluctuateFactors: [],
          motiveFactors: [],
          profitFactors: [],
        },
        allFactor: {
          dailyBasicFactorAll: FactorInfo.dailyBasicFactorInfo,
          dailyFactorAll: FactorInfo.dailyFactorInfo,
          cashflowFactorAll: FactorInfo.cashflowFactorInfo,
          valueFactorAll: [],
          analystFactorAll: [],
          developFactorAll: [],
          emotionFactorAll: FactorInfo.emotionFactorInfo,
          fluctuateFactorAll: FactorInfo.fluctuateFactorInfo,
          motiveFactorAll: FactorInfo.motiveFactorInfo,
          profitFactorAll: FactorInfo.profitFactorInfo,
        },
      }
    },
    methods: {
      factorAnalysis(){
        let num=this.factors.analystFactors.length + this.factors.cashflowFactors.length+this.factors.dailyBasicFactors.length
          + this.factors.dailyFactors.length+ this.factors.developFactors.length+this.factors.emotionFactors.length+
          this.factors.fluctuateFactors.length + this.factors.motiveFactors.length + this.factors.profitFactors.length+ this.factors.valueFactors;
        //因子数为1，单因子分析
        let factors=this.factors
        if (num === 1){
          this.$router.push({path: '',params: {factors}})
        }else if(num>1){//多因子分析
          this.$router.push({path: '',params: {factors}})
        }
      },
      factorValidation(){
        let num=this.factors.analystFactors.length + this.factors.cashflowFactors.length+this.factors.dailyBasicFactors.length
          + this.factors.dailyFactors.length+ this.factors.developFactors.length+this.factors.emotionFactors.length+
          this.factors.fluctuateFactors.length + this.factors.motiveFactors.length + this.factors.profitFactors.length+ this.factors.valueFactors;
        let factors=this.factors
        //单因子有效性验证
        if (num === 1){
          this.$router.push({path: '',params: {factors}})
        }else if(num>1){//多因子有效性验证
          this.$router.push({path: '',params: {factors}})
        }
      }
    }
  }
</script>

<style scoped>
  [v-cloak] {
    display: none;
  }
</style>
