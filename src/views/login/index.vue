<template>
  <div class="login-container">
    <div class="form-container">
      <el-form ref="loginForm" :model="loginForm" :rules="rules" class="login-form" auto-complete="on" label-position="left">
        <div class="title-container">
          <h3 class="title">股票市场监控系统</h3>
        </div>
        <div v-if="errorInfo">
          <span>{{errInfo}}</span>
        </div>
        <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="请输入用户名"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="请输入密码"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="submitForm('loginForm')"
          />
          <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
        </el-form-item>

        <el-form-item  prop="validate" class="validate-input">
          <el-input v-model="loginForm.validate" class="validate-code" placeholder="验证码" ></el-input>
        </el-form-item>
        <div class="code" @click="refreshCode">
          <SIdentify :identifyCode="identifyCode"></SIdentify>
        </div>

        <el-button type="primary" style="width:100%;margin-bottom:30px;font-size: 16px" @click.native.prevent="submitForm('loginForm')">登录</el-button>
        <div class="form-bottom">
          <el-checkbox-group class="check-box" v-model="check" :max="1" @change="checkRememberMe">
            <el-checkbox label="1" style="font-size: 20px;color: #173a5d">记住我</el-checkbox>
          </el-checkbox-group>
          <el-button class="register" @click="handleCommand()">注册</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import SIdentify from "./Identify";
  export default {
    name: 'Login',
    components: {SIdentify},
    data() {
      return {
        identifyCodes: "1234567890",
        identifyCode: "",
        errorInfo : false,
        loginForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          validate: [
            { required: true, message: '请输入验证码', trigger: 'blur' }
          ]
        },
        passwordType: 'password',
        redirect: undefined,
        rememberMe:false,
        check:[]
      }
    },
    watch: {
      $route: {
        handler: function(route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    mounted(){
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    methods: {
      checkRememberMe(){
        if(this.check.length){
          this.rememberMe=true
          //console.log(this.rememberMe)
        }else{
          this.rememberMe=false
        }
      },
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      submitForm(formName) {
        // debounceAjax(formName)
        const self = this;
        self.$refs[formName].validate((valid) => {
          if (valid) {
            self.$axios.post('/user/login',{
              username: self.loginForm.username,
              password: self.loginForm.password
            })
              .then((response) => {
                console.log(response);
                if(response.data.success){
                  self.$store.commit('login', self.loginForm)
                  self.$router.push('/index');
                  sessionStorage.setItem('username',self.loginForm.name);
                  sessionStorage.setItem('user',JSON.stringify(self.loginForm));
                  console.log(JSON.stringify(self.loginForm));
                }else{
                  self.errorInfo = true;
                  self.errInfo = response.data.msg;
                }
              }).then((error) => {
              console.log(error);
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleCommand() {
        this.$router.push('/register');
      },
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      },
      refreshCode() {
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
      },
      makeCode(o, l) {
        for (let i = 0; i < l; i++) {
          this.identifyCode += this.identifyCodes[
            this.randomNum(0, this.identifyCodes.length)
            ];
        }
        console.log(this.identifyCode);
      },
    }
  }
</script>

<style lang="scss">
  $bg:#283443;
  $light_gray:#fff;
  $cursor: #fff;
  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }
  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;
  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    background-image: url("../../assets/img/login.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    overflow: hidden;
  }
  .form-container{
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
  }
  .validate-input{
    width: 200px;
    float: left;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: #dddddd;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .code {
    width: 112px;
    height: 40px;
    border: 1px solid #ccc;
    float: right;
    border-radius: 2px;
  }
  .check-box{
    font-size:20px;
    color: #173a5d;
    float: left;
  }
  .register {
    font-size:16px;
    color:#999;
    cursor: pointer;
    float:right;
  }

</style>
