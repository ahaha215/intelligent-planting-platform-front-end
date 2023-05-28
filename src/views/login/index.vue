<template>
  <div class="root">
    <div class="box clearfix">
      <img src="../../assets/images/bg-login.jpg" alt="" class="left" />
      <el-form  class="login-form left">
        <h2>种植智能感知与控制平台</h2>
        <el-form-item class="item">
          <el-input
            v-model="loginUserInfo.username"
            placeholder="用户名"
            type="text"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="loginUserInfo.password"
            placeholder="密码"
            type="password"
          ></el-input>
        </el-form-item>
      </el-form>
      <button class="btn-login" @click="login">登 录</button>

      <div class="inform right">
        登录即代表同意
        <a href="">《隐私政策》</a>
        和
        <a href="">《用户协议》</a>
      </div>
    </div>
  </div>
</template>

<script>
import { loginApi } from "../../api/index";

export default {
  data() {
    return {
      loginUserInfo: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      console.log("csww:login");
      loginApi(this.loginUserInfo).then((response) => {
        console.log("csww:loginok");
        this.$message({
          message: "登录成功！",
          type: "success",
        });
        this.$router.push("/home");
      });
    },
  },
};
</script>

<style scoped>
.root {
  padding-top: 200px;

  width: calc(100vw);
  height: calc(100vh - 200px);
  background: url(../../assets/images/bg-login.jpg) no-repeat;
  position: relative;
  background-size: 100% 100%;
  overflow: hidden;
  background-color: #47a96c;
}

.root .box {
  width: 1000px;
  height: 500px;
  background-color: whitesmoke;
  margin: auto;
  border-radius: 20px;
}

.root .box img {
  width: 500px;
  height: 400px;
  margin-top: 50px;
  margin-left: 50px;
  border-radius: 20px;
}

.root .box .login-form {
  width: 350px;
  margin-left: 50px;
  margin-top: 80px;
}

.root .box .login-form h2 {
  font-size: 25px;
  font-weight: bolder;
  margin-bottom: 50px;
  font-style: italic;
}

.el-form-item__content {
  margin-bottom: 20px;
}

.btn-login {
  width: 350px;
  height: 50px;
  background-color: #47a96c;
  font-size: 20px;
  font-weight: bolder;
  color: white;
  border-radius: 6px;
  margin-bottom: 50px;
  margin-left: 50px;
}

.inform {
  color: rgb(131, 131, 132);
  font-size: 14px;
  text-align: center;
  display: block;
  margin-right: 48px;
}
.inform a {
  color: #47a96c;
}
</style>