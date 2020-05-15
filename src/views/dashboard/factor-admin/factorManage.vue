<template>
  <div>
    <el-tabs>
      <el-tab-pane label="增加因子类">
        <add-category></add-category>
      </el-tab-pane>
    </el-tabs>
    <el-tabs>
      <el-tab-pane label="增加因子">
        <add-factor ref="addFactorChild" :categories="categories"></add-factor>
      </el-tab-pane>
    </el-tabs>
    <el-tabs>
      <el-tab-pane label="删除因子">
        <delete-factor ref="deleteFactorChild" :categories="categories"></delete-factor>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
    import AddCategory from "./addCategory";
    import AddFactor from "./addFactor";
    import DeleteFactor from "./deleteFactor";
    export default {
      name: "factorManage",
      components: {DeleteFactor, AddFactor, AddCategory},
      data(){
        return{
          categories:[],
        }
      },
      beforeCreate(){
        // 拿到因子类信息数据
        this.$axios.get('/admin/get/categories').then(ret=>{
          console.log(ret.data)
          this.categories=ret.data
          this.$refs['addFactorChild'].initCategories(ret.data)
          this.$refs['deleteFactorChild'].initCategories(ret.data)
        }).catch(err=>{
          console.log(err)
        })
      },
      methods:{

      }
    }
</script>

<style scoped>

</style>
