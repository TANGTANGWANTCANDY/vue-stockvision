<template>
	<div>
		<div class="crumbs crumbs-register">
			<el-breadcrumb separator="/" class="register-title">
                <el-breadcrumb-item><i class="el-icon-setting"></i>注册</el-breadcrumb-item>
            </el-breadcrumb>
		</div>
		<div class="userContent">
			<el-form ref="form" :model="form" :rules="rules" label-width="80px">
				<el-form-item prop="name" label="用户名称">
					<el-input v-model="form.name" placeholder="请输入用户名称"></el-input>
				</el-form-item>
				<el-form-item prop="pass" label="密码">
					<el-input v-model="form.pass" type="password" placeholder="请输入密码"></el-input>
				</el-form-item>
				<el-form-item prop="checkPass" label="确认密码">
					<el-input v-model="form.checkPass" type="password" placeholder="请再次输入密码"></el-input>
				</el-form-item>
				<el-form-item prop="email" label="邮箱">
					<el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
				</el-form-item>
				<el-form-item prop="phone" label="手机">
					<el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
				</el-form-item>
				<el-form-item prop="sex" label="性别">
					<el-select class="select-sex" v-model="form.sex" placeholder="请选择性别">
						<el-option label="男" value="man"></el-option>
						<el-option label="女" value="woman"></el-option>
					</el-select>
				</el-form-item>
        <el-form-item prop="address" label="住址">
          <el-input v-model="form.address" placeholder="地址"></el-input>
        </el-form-item>
        <el-form-item prop="info" label="个人简介">
          <el-input v-model="form.info" placeholder="简单介绍自己"></el-input>
        </el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit('form')">确定</el-button>
					<el-button @click="onCancle()">取消</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import Util from '@/utils/utils';
	export default {
		data() {
			var validatePass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入密码'));
				} else {
					if(this.form.checkPass !== '') {
						this.$refs.form.validateField('checkPass');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.form.pass) {
					callback(new Error('两次输入的密码不一致'));
				} else {
					callback();
				}
			};
			var validateEmail = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入邮箱'));
				} else if (!Util.emailReg.test(this.form.email)){
					callback(new Error('请输入正确的邮箱'));
				} else {
					callback();
				}
			};
			var validatePhone = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入手机号'));
				} else if (!Util.phoneReg.test(this.form.phone)){
					callback(new Error('请输入正确的手机号'));
				} else {
					callback();
				}
			};
      return {
				form: {
					name: '',
					pass: '',
					checkPass: '',
					email: '',
					phone: '',
					sex: '',
          address:'',
          info:'',
                },
                rules: {
                    name: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    pass: [
                        { required:true, message:'设置密码',validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { required:true,message:'确认密码',validator: validatePass2, trigger: 'blur' }
                    ],
                    email: [
                        { required:true,validator: validateEmail, trigger: 'blur' }
                    ],
                    phone: [
                        { required:true,validator: validatePhone, trigger: 'blur' }
                    ],
                    sex: [
                        { message: '请输入性别', trigger: 'blur' }
                    ],
                    address:[{message: '住址', trigger: 'blur'}],
                    info:[{message: '介绍自己', trigger: 'blur'}]
                }
			}
        },
        methods:{
        	onSubmit(formName) {
            const self = this;
            self.$refs[formName].validate((valid) => {
              if (valid) {
                self.$axios.post('/user/addUser',self.form).then(response=>{
                  console.log(response);
                  if(response.data=='success'){
                    self.$router.push('/register-success')
                  }else{
                    alert("您已注册过，请勿重复注册！")
                  }
                }).catch(error=>{
                  console.log(error);
                })
              } else {
                console.log('error submit!!');
                return false;
              }
            });
            },
          onCancle() {
        		this.$router.push('/login');
          },
          getDateTimes(str) {
            var str = new Date(str);
                return str;
          }
		  }
	}
</script>

<style>
	.crumbs-register {
		background-color: #324157;
		height: 50px;
		line-height: 50px;
	}
	.register-title {
		line-height: 50px;
		margin: 0 auto;
    	width: 50px;
    	font-size: 16px;
	}	
	.userContent {
		width: 400px;
		margin: 0 auto;
	}
	.select-sex {
		width: 320px;
	}
</style>
