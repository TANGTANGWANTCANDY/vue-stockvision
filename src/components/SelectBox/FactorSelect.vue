<template>
  <div class="block">
    <span class="demonstration">因子：</span>
    <el-select v-model="keywords" @change = "factorValue" filterable placeholder="请选择">
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
    name: 'FactorSelect',
    data() {
      return {
        options: [{
          value: 'change',
          label: 'change'
        }, {
          value: 'change',
          label: 'change'
        }, {
          value: 'change',
          label: 'change'
        }, {
          value: 'change',
          label: 'change'
        }, {
          value: 'change',
          label: 'change'
        }],
        keywords: ''
      }
    },
    methods:{
      factorValue(){
        this.$emit('getFactor',this.keywords);
      }
    }
  }
</script>
