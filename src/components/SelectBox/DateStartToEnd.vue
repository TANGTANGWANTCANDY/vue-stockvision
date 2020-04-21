<template>
  <div class="block">
    <span class="demonstration">日期：</span>
    <el-date-picker
      v-model="value2"
      @change = "dateValue"
      type="daterange"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
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
        value2: [this.formatDate(new Date(new Date().getTime() - 3600 * 1000 * 24 * 30 * 3)), this.formatDate(new Date(new Date().getTime() - 3600 * 1000 * 24))]
      };
    },
    mounted() {
      this.dateValue()
    },
    methods:{
      dateValue(){
        this.$emit('getDate',this.value2);
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
