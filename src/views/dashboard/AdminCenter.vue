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
          <el-button @click="manageDB">数据库管理</el-button>
          <el-button @click="toFactorManage">因子管理</el-button>
          <div v-if="displayDB" style="margin-top: 20px;margin-left: 10px">
            请选择更新时间：<DateStartToEnd @getDate="updateDate"></DateStartToEnd>
          </div>
          <div v-if="displayDB" class="display-database">
            <p style="font-style: initial">数据库基础数据表</p>
            <el-table :data="basicTables" border>
              <el-table-column
                type="index"
                label="序列">
              </el-table-column>
              <el-table-column
                v-for="{prop,label} in colTables"
                :key="prop"
                :prop="prop"
                :label="label"
              >
              </el-table-column>
              <el-table-column label="操作">
                <template scope="scope">
                  <!--scope.row代表当前对应行-->
                  <el-button type="primary" style="background-color:#587482" :loading=false size="small" v-if="scope.row.state === 'normal'" @click="updateTable(scope.row)">更新</el-button>
                  <el-button type="primary" style="background-color:#587482" :loading=true size="small" v-else>正在更新</el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-pagination
              @size-change="tableSizeChange"
              @current-change="tableCurrentChange"
              :current-page="tableCurrentPage"
              :page-sizes="[10, 20, 30, 50, 100]"
              :page-size="tablePageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="basicTables.length">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import DateStartToEnd from "@/components/SelectBox/DateStartToEnd"
    export default {
      name: "AdminCenter",
      data(){
          this.colConfigs=[
            {prop:'username',label:'用户名'},
            {prop:'phoneNumber',label:'电话号码'},
            {prop:'mailAddress',label:'邮箱'},
            {prop:'gender',label:'性别'},
            {prop:'info',label:'个人简介'},
          ];
          this.colTables=[
            {prop:'tableName',label:'表名'},
            {prop:'describe',label:'描述'},
            {prop:'earliestDate',label:'最早日期'},
            {prop:'latestDate',label:'最新日期'},
            {prop:'state',label:'状态'},
        ]
          return{
            users:[],
            basicTables:[],
            displayUsers:false,
            displayDB:false,
            // 当前页
            currentPage: 1,
            //  每页多少条
            pageSize: 10,
            // 数据库表当前页
            tableCurrentPage: 1,
            //  数据库表每页多少条
            tablePageSize: 10,
            date:{
              startdate:"",
              enddate:"",
            },
            buttonstate: false,
            buttontext: "更新"
          }
      },
      components: {
        DateStartToEnd,
      },
      methods:{
        getUsers(){
          this.$axios.get('/admin/getGeneralUsers').then(
            ret=>{
              if(ret.data.length === 0){
                alert("无用户")
              }else{
                this.users=ret.data
              }
            }
          ).catch(err=>{
            console.log(err)
          })
        },
        getTables(){
          this.$axios.get('/admin/getBasicTables').then(
            ret=>{
              if(ret.data.length === 0){
                alert("无数据库表")
              }else{
                this.basicTables=ret.data
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
        // 数据库表每页多少条
        tableSizeChange(val) {
          this.tablePageSize = val
        },
        // 数据库表当前页
        tableCurrentChange(val) {
          this.tableCurrentPage = val
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
        manageDB(){
          this.displayDB=true
          this.getTables()
        },
        updateDate(value2){
          this.date.startdate = value2[0]
          this.date.enddate = value2[1];
        },
        formatDate(date) {
          let y = date.getFullYear();
          let MM = date.getMonth() + 1;
          MM = MM < 10 ? ('0' + MM) : MM;
          let d = date.getDate();
          d = d < 10 ? ('0' + d) : d;
          return y + MM + d;
        },
        updateTable(table) {
          table.state = "updating"
          this.$axios
            .post('/admin/updateTable',{
              date: this.date,
              tableName: table.tableName
            })
            .then(res => {
              this.getTables()
              table.state = "normal"
              alert(res.data)
            })
            .catch(err => {
              if (err.message !== 'interrupt') {
                alert("请求失败")
              }
              console.log(err);
              table.state = "normal"
            })
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
  .display-database{
    text-align: center;
  }
</style>
