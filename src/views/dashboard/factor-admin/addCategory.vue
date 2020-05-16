<template>
  <div>
    <div calss="add-category">
      <el-form ref="categoryForm" :model="categoryForm">
        <el-form-item label="因子类key" prop="key">
          <el-input v-model="categoryForm.key" style="width: 25%"></el-input>
        </el-form-item>
        <el-form-item label="因子类名（中文）" prop="name">
          <el-input v-model="categoryForm.name" style="width: 50%"></el-input>
        </el-form-item>
        <el-form-item label="因子类描述" prop="desc">
          <el-input v-model="categoryForm.desc" style="width: 50%"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <el-button :loading="adding" @click="addFactorCategory">新增因子类</el-button>
  </div>
</template>

<script>
    export default {
      name: "addCategory",
      data(){
        return{
          categoryForm:{
            key:'',
            name:'',
            desc:''
          },
          adding:false
        }
      },
      methods:{
        addFactorCategory(){
          this.adding=true
          this.$axios.post('/admin/add/category',{
            key:this.categoryForm.key,
            name:this.categoryForm.name,
            desc:this.categoryForm.desc
          }).then(ret=>{
            this.adding=false
            if(ret.data=='success'){
              alert("新增因子类成功！")
            } else if(ret.data=='fail'){
              alert("未知错误，新增因子类失败！")
            }
          })
        }
      }
    }
</script>

<style scoped>
  .add-category{
    width: 50%;
    text-align: center;
  }
</style>
