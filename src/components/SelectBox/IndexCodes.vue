<template>
  <div class="block">
    <span class="demonstration">指数：</span>
    <el-select class="select" v-model="indexValue" @change = "indexChange" multiple collapse-tags placeholder="请选择" >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
  export default {
    name: 'IndexCodes',
    data() {
      return {
        options: [{
          value: '000300.SH',
          label: '沪深300'
        }, {
          value: '399300.SZ',
          label: '399300.SZ'
        }],
        indexValue: []
      }
    },
    methods:{
      indexChange(){
        this.$emit('getIndex',this.indexValue);
      }
    }
  }
</script>

<style scoped>

</style>
