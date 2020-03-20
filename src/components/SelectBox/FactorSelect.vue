<template>
  <el-select v-model="keywords" @change = "factorValue" filterable placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          value: '选项1',
          label: 'change'
        }, {
          value: '选项2',
          label: 'change'
        }, {
          value: '选项3',
          label: 'change'
        }, {
          value: '选项4',
          label: 'change'
        }, {
          value: '选项5',
          label: 'change'
        }],
        keywords: ''
      }
    },
    methods: {
      factorValue(){
        this.returntext = this.keywords
        console.log('您选择了：',this.returntext)
        this.$axios
          .post('/test-box', {
            keywords: keywords
          }).then(resp => {
          this.returntext = resp.data
          console.log('您选择了：',this.returntext)
        })
      }
    }
  }
</script>
