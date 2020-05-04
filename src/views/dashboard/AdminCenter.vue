<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-setting"></i>管理中心</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="user-management">
      <el-row>
        <div class="user-manage-btns">
          <el-button @click="manageGeneralUsers">普通用户管理</el-button>
          <el-button @click="addAdmin">创建管理员账户</el-button>
        </div>
      </el-row>
      <div v-if="displayUsers" class="dispaly-users">
        普通用户列表：
        <el-table :data="users" border>
          <el-table-column
            v-for="{prop,label} in colConfigs"
            :key="prop"
            :prop="prop"
            :label="label"
          >
          </el-table-column>
          <el-table-column label="操作"><a href="javascript:;" @click="deleteUser(index)">删除</a></el-table-column>
        </el-table>
      </div>
    </div>

    <div class="sys-management">
      <el-button>数据库管理</el-button>
      <el-button>增加因子</el-button>
    </div>
  </div>
</template>

<script>
    export default {
      name: "AdminCenter",
      data(){
          this.colConfigs=[
            {prop:'id',label:'id'},
            {prop:'username',label:'用户名'},
            {prop:'phoneNumber',label:'电话号码'},
            {prop:'mailAddress',label:'邮箱'},
            {prop:'gender',label:'性别'},
            {prop:'info',label:'个人简介'},
          ]
          return{
            users:[],
            displayUsers:false,
          }
      },
      methods:{
        getUsers(){
          this.$axios.get('/admin/getGeneralUsers').then(
            ret=>{
              this.users=ret.data
            }
          ).catch(err=>{
            console.log(err)
          })
        },
        deleteUser(index){
          let user=this.users[index]
          this.$axios.get('/admin/deleteUser/'+user.id).then(ret=>{
            this.getUsers()
            console.log(ret)
          }).catch(err=>{
            console.log(err)
          })
        },
        manageGeneralUsers(){
          this.displayUsers=true
          this.getUsers()
        },
        addAdmin(){
          //跳转新增管理员账户界面
          this.$router.push('/admin/add')
        }
      }
    }
</script>

<style scoped>
  .crumbs{
    height: 50px;
  }
  .user-management{
    height: 200px;
  }
  .sys-management{
    height: 200px;
  }
</style>
