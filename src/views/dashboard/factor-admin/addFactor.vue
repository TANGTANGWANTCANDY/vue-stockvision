<template>
  <div>
    <div class="basicDiv">
      <el-select v-model="category" style="width: 100px" placeholder="请选择">
        <el-option
          v-for="item in categories"
          :key="item.id"
          :label="item.name"
          :title="item.description"
          :value="item.id">
        </el-option>
      </el-select>

      <el-input v-model="param.function" ></el-input>
    </div>
    <div class="param0Div">
      <el-select v-model="param.param0" multiple >
        <el-option
          v-for="item in dailyFactorAll"
          :key="item.value"
          :label="item.name"
          :value="item.value"
          :title="item.description"
        >
        </el-option>
      </el-select>
    </div>
    <div class="param1Div">
      <div v-if="param1List && param1List.length>0">
        <param-input
          v-for="p in param1List"
          :param="p"
          @delete="onParamInputDelete"
          @inputChange="onParamInputChange"
        >
        </param-input>
      </div>
      <div v-else-if="param1List">没有常量参数</div>

      <el-button @click="addParam1">添加常量参数</el-button>
    </div>
    <el-input v-model="name" >因子名</el-input>
    <el-input v-model="desc">因子描述</el-input>
    <el-button @click="addFactor">新增因子</el-button>
  </div>
</template>

<script>
    import BasicFactorInfo from "../../custom-factor/BasicFactorInfo";
    import ParamInput from "./paramInput";

    export default {
      name: "addFactor",
      components: {ParamInput},
      data(){
        return{
          categories:[],
          showInputDiv:false,
          category:0,
          param:{
            function:'',
            param0:[],
            param1:[]
          },
          name:'',
          desc:'',
          dailyFactorAll: BasicFactorInfo.dailyFactorInfo,
          param1List:[{text:'参数1',value:'0'}],
        }
      },
      methods:{
        initCategories(categories){
          this.categories=categories
        },
        onParamInputDelete(param){
          //从数组中移除
          this.param1List.splice(this.param1List.indexOf(param),1)
        },
        addParam1(){
          //新建一个常量参数对象
          let paramNew={
            text:"参数"+this.param1List.length,
            value:'0'
          }
          this.param1List.push(paramNew)
        },
        onParamInputChange(param){
          //更新参数值的改变
          for ( let i = 0; i <param1List.length; i++){
            if(this.param1List[i].text==param.text){
              this.param1List[i].value=param.value
            }
          }
        },
        addFactor(){
          this.$axios.post('/admin/add/factor',{
            category:this.category.id,
            name:this.name,
            desc:this.desc,
            parm:this.param
          }).then(ret=>{
            if(ret.data=='success'){
              alert("新增因子成功！")
            }else{
              alert("未知错误！新增因子失败！")
            }
          }).catch(err=>{
            alert("未知错误！")
          })
        },
      }
    }
</script>

<style scoped>

</style>
