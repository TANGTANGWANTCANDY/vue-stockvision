<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-setting"></i>管理中心</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="user-management">
      <el-button @click="manageGeneralUsers">普通用户管理</el-button>
      <div v-if="displayUsers" class="dispaly-users">
        普通用户列表：
        <table>
          <tr>
            <th>id</th>
            <th>用户名</th>
            <th>密码</th>
            <th>手机</th>
            <th>邮箱</th>
            <th>性别</th>
            <th>住址</th>
            <th>操作</th>
          </tr>
          <tr v-cloak v-for="(item, index) of users">
            <td>{{item.id}}</td>
            <td>{{item.username}}</td>
            <td>{{item.password}}</td>
            <td>{{item.phoneNumber}}</td>
            <td>{{item.mailAddress}}</td>
            <td>{{item.gender}}</td>
            <td>{{item.address}}</td>
            <td><a href="javascript:;" @click="deleteUser(index)">删除</a></td>
          </tr>
        </table>
      </div>
      <el-button @click="addAdmin">创建管理员账户</el-button>
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
