<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-setting"></i>管理中心</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="user-management">
      <el-tabs>
        <el-tab-pane label="用户管理">
          <el-row>
            <div class="user-manage-btns">
              <el-button @click="manageGeneralUsers">普通用户管理</el-button>
              <el-button @click="addAdmin">创建管理员账户</el-button>
            </div>
          </el-row>
          <div v-if="displayUsers" class="display-users">
            <p style="font-style: initial">普通用户列表</p>
            <el-table :data="users" border>
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
                  <el-button type="danger" size="small" @click="deleteUser(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-pagination
              @size-change="sizeChange"
              @current-change="currentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 50, 100]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="users.length">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="sys-management">
      <el-tabs>
        <el-tab-pane label="系统管理">
          <el-button>基础数据库管理</el-button>
          <el-button @click="toFactorManage">因子管理</el-button>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
    export default {
      name: "AdminCenter",
      data(){
          this.colConfigs=[
            {prop:'username',label:'用户名'},
            {prop:'phoneNumber',label:'电话号码'},
            {prop:'mailAddress',label:'邮箱'},
            {prop:'gender',label:'性别'},
            {prop:'info',label:'个人简介'},
          ]
          return{
            users:[],
            displayUsers:false,
            // 当前页
            currentPage: 1,
            //  每页多少条
            pageSize: 10,
          }
      },
      methods:{
        getUsers(){
          this.$axios.get('/admin/getGeneralUsers').then(
            ret=>{
              if(ret.data.length==0){
                alert("无用户")
              }else{
                this.users=ret.data
              }
            }
          ).catch(err=>{
            console.log(err)
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
        deleteUser(user){
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
        },
        toFactorManage(){
          //跳转到因子管理界面
          this.$router.push('/admin/factor/manage')
        },
      }
    }
</script>

<style scoped>
  .crumbs{
    height: 10%;
  }
  .user-management{
    height: 40%;
    margin-top: 10px;
  }
  .sys-management{
    height: 20%;
    margin-top: 50px;
  }
  .display-users{
    text-align: center;
  }
</style>
