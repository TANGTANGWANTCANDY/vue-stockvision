<template>
	<div>
		<div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-edit"></i> 个人中心</el-breadcrumb-item>
                <el-breadcrumb-item>修改用户</el-breadcrumb-item>
            </el-breadcrumb>
		</div>
		<div class="userContent">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="用户名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select class="select-sex" v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" value="man"></el-option>
            <el-option label="女" value="woman"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="个人简介" prop="info">
          <el-input v-model="form.info"></el-input>
        </el-form-item>
				<el-form-item>
					<el-button type="primary" @click="updateUserData('form')">确定</el-button>
					<el-button @click="onCancle()">取消</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import Util from '../../utils/utils';
	export default {
		data() {
			var validateEmail = (rule, value, callback) => {
				if (value === '') {
					//callback(new Error('请输入邮箱'));
          console.log("空醇")
          callback();
				} else if (!Util.emailReg.test(this.form.email)){
					callback(new Error('请输入正确的邮箱'));
				} else {
					callback();
				}
			};
			var validatePhone = (rule, value, callback) => {
				if (value === '') {
					//callback(new Error('请输入手机号'));
          callback()
				} else if (!Util.phoneReg.test(this.form.phone)){
					callback(new Error('请输入正确的手机号'));
				} else {
					callback();
				}
			};
      return {
				form: {
          name:'',
          email:'',
          phone:'',
          sex:'',
          address:'',
          info:''
				},
				rules: {
            name: [
              { required: true, message: '请输入用户名', trigger: 'blur' }
            ],
            email: [
              { validator: validateEmail, trigger: 'blur' }
            ],
            phone: [
              { validator: validatePhone, trigger: 'blur' }
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
        	getUserData() {
				const self = this;	
				self.$axios.get('/user/getUser/'+sessionStorage.getItem('ms_user')).then(function(response) {
					console.log(response);
					let result = response.data.user;
					self.form.name = result.username;
          self.form.email = result.mailAddress;
          self.form.phone = result.phoneNumber;
          self.form.sex = result.gender;
          self.form.address=result.address;
          self.form.info=result.info;
					sessionStorage.setItem('ms_userId', result.id);
				}).then(function(error) {
					console.log(error);
				})
			},			
			updateUserData(formName) {
				const self = this;
				let formData = {
					id: parseInt(sessionStorage.getItem('ms_userId')),
          username:self.form.name,
          password:'',
          phoneNumber:self.form.phone,
          mailAddress:self.form.email,
          gender:self.form.sex,
          address:self.form.address,
          info:self.form.info,
          perems:''
				};

				self.$refs[formName].validate((valid) => {
          if (valid) {
            self.$axios.post('/user/updateUser',formData).then(function(response) {
							//console.log(response);
							self.$router.push('/user/update/success');
						}).then(function(error) {
							console.log(error);
						})
          } else {
            console.log('error submit!!');
            return false;
          }
        });
			},
      onCancle() {
         this.$router.push('/user/center');
      }
		},
		//初始化
		mounted() {
			this.getUserData();
		}  
	}
</script>

<style>
	.userContent {
		width: 400px;
		margin: 0 auto;
	}
	.select-sex {
		width: 320px;
	}
</style>
