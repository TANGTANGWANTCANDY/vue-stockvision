<template>
  <div>
    <div class="basicDiv">
      <el-row style="display: inline-flex">
        <el-col>
          <el-select v-model="category" style="width: 80%" placeholder="请选择因子类">
            <el-option
              v-for="item in categories"
              :key="item.id"
              :label="item.name"
              :title="item.description"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col>
          <el-input v-model="name" placeholder="因子名" style="width: 80%"></el-input>
        </el-col>
        <el-col>
          <el-input v-model="desc" placeholder="因子描述" style="width: 100%"></el-input>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        计算因子函数名：
        <el-input v-model="param.function" style="width: 50%"></el-input>
      </el-row>
    </div>
    <div class="param0Div">
      <el-select v-model="param.param0" multiple placeholder="请选择计算因子所需的基础数据" style="width: 35%">
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
        <el-col>
          <param-input
            v-for="p in param1List"
            :param="p"
            @delete="onParamInputDelete"
            @inputChange="onParamInputChange"
          >
          </param-input>
        </el-col>
      </div>
      <div v-else-if="param1List">没有常量参数</div>

      <el-button @click="addParam1">添加常量参数</el-button>
    </div>

    <el-button @click="addFactor" style="margin-top: 10px">新增因子</el-button>
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
          category:null,
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
            text:"参数"+(this.param1List.length+1),
            value:'0'
          }
          console.log(paramNew.text)
          this.param1List.push(paramNew)
        },
        onParamInputChange(param){
          //更新参数值的改变
          for ( let i = 0; i <this.param1List.length; i++){
            if(this.param1List[i].text==param.text){
              this.param1List[i].value=param.value
            }
          }
        },
        addFactor(){
          //记录常量参数的选择
          for ( let i = 0; i <this.param1List.length; i++){
            this.param.param1.push(this.param1List[i].value)
          }
          //添加基本表信息
          for ( let i = 0; i <this.param.param0.length; i++){
            this.param.param0[i]="daily."+this.param.param0[i]
          }
          //发起后端请求
          this.$axios.post('/admin/add/factor',{
            category:this.category,
            name:this.name,
            desc:this.desc,
            param:this.param
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
  .param0Div{
    margin-top: 20px;
  }
</style>
