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
    <el-tabs>
      <el-tab-pane label="更新因子数据库">
        <el-button :loading="updating" @click="updateFactorData">更新因子数据库</el-button>
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
          updating:false,
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
        updateFactorData(){
          this.updating=true
          this.$axios.get('/admin/update/factor').then(ret=>{
            if(ret.data=='success'){
              this.updating=false
              alert("更新因子数据成功！")
            }else{
              alert("当日可能为非交易日，请确认！更新失败！")
            }
          }).catch(err=>{
            console.log(err)
          })
        }
      }
    }
</script>

<style scoped>

</style>
