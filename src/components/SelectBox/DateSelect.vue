<template>
  <div class="block">
    <span class="demonstration">日期：</span>
    <el-date-picker
      v-model="value1"
      @change = "dateValue"
      type="date"
      placeholder="选择日期"
      format="yyyy-MM-dd"
      value-format="yyyyMMdd"
    >
    </el-date-picker>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value1: ''
      }
    },
    methods:{
      dateValue(){
        this.$emit('getIndustryDate',this.value1);
      },
    }
  };
</script>
