<template>
  <div class="block">
    <!--<span class="demonstration">时间长度</span>-->
    <el-select v-model="stdLen" @change = "stdLenValue" filterable placeholder="计算标准差所需间隔">
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
          value: 30,
          label: '30天'
        }, {
          value: '60',
          label: '60天'
        }, {
          value: '90',
          label: '90天'
        }],
        stdLen: ''
      }
    },
    methods:{
      stdLenValue(){
        this.$emit('getStdLen',this.stdLen);
      }
    }
  }
</script>
