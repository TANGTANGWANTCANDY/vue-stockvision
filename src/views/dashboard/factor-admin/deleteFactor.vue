<template>
  <div>
    <div class="category-btns">
      <template v-for="category in categories">
        <el-button @click="displayFactors(category)">{{category.name}}</el-button>
      </template>
    </div>
    <div class="display-factor" v-if="showFactor">
      <el-table :data="factorList" border>
        <el-table-column
          type="index"
          label="序列">
        </el-table-column>
        <el-table-column
          v-for="{prop,label} in colConfigs"
          :key="prop"
          :prop="prop"
          :label="label"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <!--scope.row代表当前对应行-->
            <el-button type="danger" size="small" @click="deleteFactor(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="currentPage"
        :page-sizes="[5,10,20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="factorList.length">
      </el-pagination>
    </div>
  </div>
</template>

<script>
    export default {
      name: "deleteFactor",
      data(){
        this.colConfigs=[
          {prop:'factor',label:'因子'},
          {prop:'name',label:'因子名'},
          {prop:'description',label:'描述'},
        ]
        return{
          showFactor:false,
          categories:[],
          category:{},
          factorList:[],
          currentPage:1,
          pageSize:5
        }
      },
      methods:{
        initCategories(categories){
          this.categories=categories
        },
        displayFactors(category){
          this.showFactor=false
          this.category=category  //记录选择的因子类
          this.$axios.get('/admin/get/factors/'+category.id).then(ret=>{
            this.showFactor=true
            this.factorList=ret.data
          }).catch(err=>{
            alert("错误！")
          })
        },
        // 每页多少条
        sizeChange(val) {
          this.pageSize = val
        },
        // 当前页
        currentChange(val) {
          this.currentPage = val
        },
        deleteFactor(factor){
          this.$axios.get('/admin/deleteFactor/'+this.category.id+"/"+factor.id).then(ret=>{
            if(ret.data=='success'){
              alert("删除因子成功！")
              this.displayFactors(this.category)
            }else {
              alert("出错了！")
            }
          }).catch(err=>{
            alert("出错了！")
          })
        },
      }
    }
</script>

<style scoped>
  .display-factor{
    text-align: center;
    width: 100%;
    margin-left: 5%;
    margin-right: 5%;
    margin-top: 10px;
  }
</style>
