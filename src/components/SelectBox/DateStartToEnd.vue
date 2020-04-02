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
        value2: ''
      };
    },
    methods:{
      dateValue(){
        this.$emit('getDate',this.value2);
      },
    }
  };
</script>
