<template>
  <div class="tag">
    {{param.text}}:
    <el-input v-model="param.value" @change="onInputChange"></el-input>
    <button @click="onCloseClick">x</button>
  </div>
</template>

<script>
    export default {
      name: "paramInput",
      data(){
        return{
          param:{
            text:'',
            value:'',
          }
        }
      },
      methods:{
        onCloseClick(){
          this.$emit("delete",this.param)
        },
        onInputChange(){
          this.$emit("inputChange",this.param)
        }
      }
    }
</script>

<style scoped>
  .tag{
    display: inline-block;
    margin: 3px;
  }
</style>
