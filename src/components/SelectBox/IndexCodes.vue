<template>
  <div class="block">
    <!--<span class="demonstration">指数</span>-->
    <el-select class="select" v-model="indexValue" @change = "indexChange" multiple collapse-tags placeholder="请选择指数" >
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
          label: '沪深300(000300.SH)'
        }, {
          value: '399300.SZ',
          label: '沪深300(399300.SZ)'
        }, {
          value: '000001.SH',
          label: '上证综指(000001.SH)'
        }, {
          value: '399001.SZ',
          label: '深证成指(399001.SZ)'
        }, {
          value: '000905.SH',
          label: '中证500(000905.SH)'
        }, {
          value: '399005.SZ',
          label: '中小板指(399005.SZ)'
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
