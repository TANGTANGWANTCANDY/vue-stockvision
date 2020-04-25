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
        value1: this.formatDate(new Date(new Date().getTime() - 3600 * 1000 * 24)),
      }
    },
    mounted() {
      this.dateValue()
    },
    methods:{
      dateValue(){
        this.$emit('getIndustryDate',this.value1);
      },
      formatDate(date) {
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + MM + d;
      }
    }
  };
</script>
