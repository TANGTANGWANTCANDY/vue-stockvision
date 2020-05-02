<template>
	<div>
    <!--
    <dialog v-model="showDialog" type="danger" title="错误" content="未登录" @cancel="clickCancel" dangerText="Delete"></dialog>
		-->
		<div class="crumbs">
			<el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i>个人中心</el-breadcrumb-item>
            </el-breadcrumb>
		</div>
		<div class="userContent">
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item label="用户名称">
					<el-input v-model="form.name" :disabled="disabled"></el-input>
				</el-form-item>
				<el-form-item label="邮箱">
					<el-input v-model="form.email" :disabled="disabled"></el-input>
				</el-form-item>
				<el-form-item label="手机">
					<el-input v-model="form.phone" :disabled="disabled"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-select class="select-sex" v-model="form.sex" placeholder="请选择性别" :disabled="disabled">
						<el-option label="男" value="man"></el-option>
						<el-option label="女" value="woman"></el-option>
					</el-select>
				</el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="个人简介">
          <el-input v-model="form.info" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateUser">修改个人信息</el-button>
          <el-button @click="modifyPassword">修改密码</el-button>
        </el-form-item>
			</el-form>
		</div>
    <Confirm ref="myConfirm"></Confirm>
	</div>
</template>

<script>
  import Dialog from "./dialog";
  import Confirm from "./Confirm";
  export default {
    components: {Confirm, Dialog},
    data() {
      return {
        disabled:true,
				form: {
				  name:'',
          email:'',
          phone:'',
          sex:'',
          address:'',
          info:''
				},
        showDialog:false
			}
		},
		methods:{
      clickCancel(){

      }
		},
		mounted() {
      let self=this
      console.log(sessionStorage.getItem('ms_user'))
      this.$axios.get('/user/getUser/'+sessionStorage.getItem('ms_user')).then(function(response) {
        if(response.data.success){
          let result = response.data.user;
          self.form.name = result.username;
          self.form.email = result.mailAddress;
          self.form.phone = result.phoneNumber;
          self.form.sex = result.gender;
          self.form.address=result.address;
          self.form.info=result.info;
        }else{
          self.$refs.myConfirm.show('系统检测到您还未登录！', {
            type: 'confirm',
            confirmText: '去登录',
            titleText: '消息提示',
            data:''
          })
        }
      }).then(function(error) {
        console.log(error);
      })
    },
    methods: {
      updateUser(){
        this.$router.push({path:'/user/update-user'})
      },
      modifyPassword(){
        this.$router.push({path:'/user/modify-password'})
      }
    }
    }
	
</script>

<style lang="less" scoped>
	.userContent {
		width: 400px;
		margin: 0 auto;
	}
	.select-sex {
		width: 320px;
	}
</style>
