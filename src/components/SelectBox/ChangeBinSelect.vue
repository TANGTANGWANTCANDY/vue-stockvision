<template>
  <div class="block">
    <!--<span class="changebin">换仓间隔：</span>-->
    <el-select v-model="changeBin" @change = "changeBinValue" filterable placeholder="换仓间隔">
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
          value: 'day',
          label: '日换仓'
        }, {
          value: 'week',
          label: '周换仓'
        }, {
          value: 'month',
          label: '月换仓'
        }],
        changeBin: 'week'
      }
    },
    mounted() {
      this.changeBinValue()
    },
    methods:{
      changeBinValue(){
        this.$emit('getChangeBin',this.changeBin);
      }
    }
  }
</script>
