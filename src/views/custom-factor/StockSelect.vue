<template>
  <div id="main_div">
    <div id="select-stock-pool">
      <span style="margin-left:5px">交易所：</span>
      <el-select v-model="exchange" multiple collapse-tags @change="selectExchangeAll" placeholder="请选择" style="width:17%">
        <el-option
          v-for="item in exchanges"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :title="item.detail"
        >
        </el-option>
      </el-select>

      <span style="margin-left:5px">市场类型：</span>
      <el-select v-model="market" multiple collapse-tags @change="selectMarketAll" placeholder="请选择" style="width:17%">
        <el-option
          v-for="item in markets"
          :key="item.value"
          :value="item.value"
          :label="item.label"
        >
        </el-option>
      </el-select>

      <span style="margin-left:5px">行业：</span>
      <el-select v-model="industry" multiple collapse-tags @change="selectIndustryAll" placeholder="请选择" style="width:17%">
        <el-option
          v-for="item in industries"
          :key="item.value"
          :value="item.value"
          :label="item.label"
        >
        </el-option>
      </el-select>

      <span style="margin-left:5px">指数成分：</span>
      <el-select v-model="selectedIndex" multiple collapse-tags @change="selectIndexAll" placeholder="请选择" style="width:17%">
        <el-option
          v-for="item in indexes"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <el-button @click="submit" :loading="LoadingStock">确认股票池</el-button>
  </div>
</template>

<script>
  export default {
    name: "StockSelect",
    props: {},
    data() {
      return {
        exchanges: [{value:"all",label:"全A股"},{value: "SSE", label: "上交所"}, {value: "SZSE", label: "深交所"}],
        industries: [{value:"all",label:"所有行业"},{value:"银行",label:"银行"}, {value:"全国地产",label:"全国地产"},
          {value:"生物制药",label:"生物制药"}, {value:"房产服务",label:"房产服务"}, {value:"区域地产",label:"区域地产"},
          {value:"酒店餐饮",label:"酒店餐饮"}, {value:"运输设备",label:"运输设备"}, {value:"综合类",label:"综合类"}],
        markets: [{value:"all",label:"所有市场"},{value:"主板",label:"主板"}, {value:"中小板",label:"中小板"},
          {value:"创业板",label:"创业板"} , {value:"科创板",label:"科创板"}],
        indexes: [{value:"all",label:"所有指数"},{value: "000001.SH", label: "上证综指"}, {value: "399001.SZ", label: "深证成指"}, {
          value: "000016.SH",
          label: "上证50"
        },
          {value: "000905.SH", label: "中证500"}, {value: "399005.SZ", label: "中小板指"}],
        exchange: [],
        industry: [],
        market: [],
        selectedIndex: [],
        oldExchangeOptions:[[]],
        oldIndustryOptions:[[]],
        oldMarketOptions:[[]],
        oldIndexOptions:[[]],
        LoadingStock:false
      }
    },
    created() {
    },
    methods: {
      selectExchangeAll(val){
        console.log(val)
        //console.log(old)
        this.exchange = this.selectAll(val,this.exchanges,this.oldExchangeOptions)
        this.oldExchangeOptions[1]=this.exchange
      },
      selectIndexAll(val){
        this.selectedIndex=this.selectAll(val,this.indexes,this.oldIndexOptions)
        this.oldIndexOptions[1]=this.selectedIndex
      },
      selectMarketAll(val){
        this.market=this.selectAll(val,this.markets,this.oldMarketOptions)
        this.oldMarketOptions[1]=this.market
      },
      selectIndustryAll(val){
        this.industry=this.selectAll(val,this.industries,this.oldIndustryOptions)
        this.oldIndustryOptions[1]=this.industry
      },
      selectAll(val,target,oldOptions){
        let allValues = []
        //保留所有值
        for(let item of target){
          allValues.push(item.value)
        }
        let ret=[]
        // 用来储存上一次的值，可以进行对比
        const oldVal = oldOptions.length === 1 ? [] : oldOptions[1]
        //console.log(typeof(oldVal))
        // 若是全部选择
        if (val.includes('all')) ret = allValues
        // 取消全部选中  上次有 当前没有 表示取消全选
        if (oldVal.includes('all') && !val.includes('all')) ret = []
        // 点击非全部选中  需要排除全部选中 以及 当前点击的选项
        // 新老数据都有全部选中
        if (oldVal.includes('all') && val.includes('all')) {
          const index = val.indexOf('all')
          val.splice(index, 1) // 排除全选选项
          ret = val
        }
        //全选未选 但是其他选项全部选上 则全选选上 上次和当前 都没有全选
        if (!oldVal.includes('all') && !val.includes('all')) {
          if (val.length === allValues.length - 1) ret = allValues
          else ret=val
        }

        return ret
      },
      submit() {
        console.log(this.exchange)
        console.log(this.industry)
        console.log(this.market)
        console.log(this.selectedIndex)
        this.LoadingStock=true
        this.$axios.post('/factor/stock-select', {
            params:{
              exchange:this.exchange,
              industry:this.industry,
              market:this.market,
              index:this.selectedIndex,
            }
          }
        ).then(ret => {
          console.log(ret);
          if(ret.data.length>0){
            this.LoadingStock=false
            this.$emit('stockSelectChange',ret.data)
          }else{
            alert("股票池为空，请重新选择！");
          }
        }).catch(err=>{
          alert("错误！");
        })
      }
    }
  }
</script>

<style scoped>
</style>
