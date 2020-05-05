<template>
    <div>
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item><i class="el-icon-edit"></i> 管理中心</el-breadcrumb-item>
          <el-breadcrumb-item>添加管理员</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="add-admin">
        <el-form ref="adminForm" :model="adminForm" :rules="rules" label-width="80px">
          <el-form-item prop="name" label="账户名">
            <el-input v-model="adminForm.name" type="text" placeholder="请输入账户名" style="width: 50%"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input v-model="adminForm.password" type="password" placeholder="请输入密码" style="width: 50%"></el-input>
          </el-form-item>
          <el-form-item prop="checkPass" label="确认密码">
            <el-input v-model="adminForm.checkPass" type="password" placeholder="请再次输入密码" style="width: 50%"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('adminForm')">确定</el-button>
            <el-button @click="onCancel">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
    export default {
      name: "addAdmin",
      data(){
        var validatePass = (rule, value, callback) => {
          if(value === '') {
            callback(new Error('请输入密码'));
          } else {
            if(this.adminForm.checkPass !== '') {
              this.$refs.adminForm.validateField('checkPass');
            }
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if(value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.adminForm.password) {
            callback(new Error('两次输入的密码不一致'));
          } else {
            callback();
          }
        };
        return{
          adminForm:{
            name:'',
            password:'',
            checkPass:''
          },
          rules: {
            name:[{message:'账户名',trigger: 'blur'}],
            password: [
              { validator: validatePass, trigger: 'blur'}
            ],
            checkPass: [
              { validator: validatePass2, trigger: 'blur' }
            ]
          }
        }
      },
      methods:{
        onSubmit(formName){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$axios.post('/admin/addAdmin',this.adminForm).then(response=> {
                console.log(response);
                if(response.data=='success'){
                  alert("添加管理员账户成功")
                }else{
                  alert("管理员账户已存在")
                }
                //刷新页面
                location.reload()
              }).catch(error=> {
                console.log(error);
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        onCancel(){
          //返回管理界面
          this.$router.push('/admin/center')
        }
      }
    }
</script>

<style scoped>
  .crumbs{
    height: 50px;
  }
  .add-admin{
    width: 100%;
    text-align: center;
  }
</style>
