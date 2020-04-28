<template>
  <div class="block">
    <!--<span class="demonstration">模块：</span>-->
    <el-select v-model="models" @change = "modelValue" filterable placeholder="因子分析模块">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
  export default {
    name: 'AnaType',
    data() {
      return {
        options: [{
          value: 'ic',
          label: 'IC序列分析'
        }, {
          value: 'icdecay',
          label: 'IC衰减'
        }, {
          value: 'ret',
          label: '收益率分析'
        }, {
          value: 'turnover',
          label: '换手率分析'
        }, {
          value: 'buydecay',
          label: '买入信号衰减与反转'
        },{
        value: 'industryana',
          label: '版块分析'
      }],
        models: ''
      }
    },
    methods:{
      modelValue(){
        this.$emit('getAnaModel',this.models);
      }
    }
  }
</script>
