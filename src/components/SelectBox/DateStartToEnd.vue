<template>
  <div class="block">
    <span class="demonstration">日期：</span>
    <el-date-picker
      v-model="value2"
      type="daterange"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        value2: ''
      };
    }
  };
</script>
