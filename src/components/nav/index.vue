<template>
  <div class="nav-root">
    <el-row class="tac">
      <el-col :span="24" class="">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          background-color="#283043"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-menu-item index="/home">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-platform"></i>
              <span>智能感知</span>
            </template>
            <el-menu-item index="/perception/onlineData">实时数据</el-menu-item>
            <el-menu-item index="/perception/dataChart">图表分析</el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-upload"></i>
              <span slot="title">在线控制</span>
            </template>
            <el-menu-item index="/control/modelControl">模式控制</el-menu-item>
            <el-menu-item index="/control/switchControl">状态控制</el-menu-item>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-s-data"></i>
              <span slot="title">数据中心</span>
            </template>
            <el-menu-item index="/dataCenter/alarmRecord">报警记录</el-menu-item>
          </el-submenu>

          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-s-tools"></i>
              <span slot="title">系统管理</span>
            </template>
            <el-menu-item index="/manager/userManager"> 用户管理 </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Nav"
};
</script>

<style scoped>
.tac{
  height: calc(100vh - 70px);
  width: 250px;
  background-color: #283043;
}

.el-menu{
    border: none;
}

.el-menu-item{
    font-size: 15px;
    height: 50px;
}
.el-menu-item [class^=el-icon-]{
    font-size: 20px;
    width: 35px;
}

.el-submenu{
    font-size: 15px !important;
}
.el-submenu [class^=el-icon-]{
    font-size: 20px;
    width: 35px;
}

.el-submenu .el-menu-item {
  margin-left: 20px;
}
</style>