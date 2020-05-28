<template>
  <div>
    日线行情：
    <el-select class="select" v-model="daily" multiple placeholder="请选择" @change="selectDailyAll">
      <el-option
        v-for="item in dailyFactorAll"
        :key="item.value"
        :label="item.name"
        :value="item.value"
        :title="item.description"
      >
      </el-option>
    </el-select>
    每日指标：
    <el-select class="select" v-model="dailyBasic" multiple placeholder="请选择" @change="selectDailyBasicAll">
      <el-option
        v-for="item in dailyBasicFactorAll"
        :key="item.value"
        :label="item.name"
        :value="item.value"
        :title="item.description"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
  import BasicFactorInfo from "./BasicFactorInfo";
    export default {
      name: "BasicFactorSelect",
      data(){
        return{
          dailyBasicFactorAll: BasicFactorInfo.dailyBasicFactorInfo,
          dailyFactorAll: BasicFactorInfo.dailyFactorInfo,
          dailyBasic: [],
          daily: [],
          oldDailyOptions:[[]],
          oldDailyBasicOptions:[[]],
        }
      },
      methods:{
        selectDailyAll(val){
          this.daily=this.selectAll(val,this.dailyFactorAll,this.oldDailyOptions)
          this.oldDailyOptions[1]=this.daily
          this.$emit('basicFactorSelectChange',this.daily,this.dailyBasic)
        },
        selectDailyBasicAll(val){
          this.dailyBasic=this.selectAll(val,this.dailyBasicFactorAll,this.oldDailyBasicOptions)
          this.oldDailyBasicOptions[1]=this.dailyBasic
          this.$emit('basicFactorSelectChange',this.daily,this.dailyBasic)
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
      }
    }
</script>

<style scoped>

</style>
