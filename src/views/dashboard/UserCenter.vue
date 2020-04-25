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
					<el-input v-model="form.email"></el-input>
				</el-form-item>
				<el-form-item label="手机">
					<el-input v-model="form.phone"></el-input>
				</el-form-item>
				<el-form-item label="出生日期">
					<el-col :span="24">
						<el-date-picker type="date" placeholder="选择日期" v-model="form.birth" style="width: 100%;"></el-date-picker>
					</el-col>
				</el-form-item>
				<el-form-item label="性别">
					<el-select class="select-sex" v-model="form.sex" placeholder="请选择性别">
						<el-option label="男" value="man"></el-option>
						<el-option label="女" value="woman"></el-option>
					</el-select>
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
          birth:'',
          sex:''
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
      this.$axios.get('/user/getUser').then(function(response) {
        console.log(response);
        if(response.data.success){
          let result = response.data.user;
          self.form.name = result.username;
          /*
          self.form.email = result.email;
          self.form.phone = result.phone;
          self.form.birth = result.birth;
          self.form.sex = result.sex;
          */
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
