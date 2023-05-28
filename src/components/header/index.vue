<template>
  <div class="header-root">
    <div class="content clearfix">
        <div class="name clearfix left">
          <img src="../../assets/images/cloud.png" alt="" class="left">
          <h2 class="left">基于物联网的种植智能感知与控制平台</h2>
        </div>

        <div class="operate right">
          <a href="/visualization/index.html" class="visualization" target="_blank">大屏可视化显示</a>
          <a class="logout" @click="logout">退出</a>
        </div>
    </div>
  </div>
</template>

<script>
import {sendAlarmEmailApi} from "../../api/index"
export default {
  methods:{
    logout(){
      let obj = {}
      sendAlarmEmailApi(obj).then((response) => {

      })
    }
  }
}
</script>

<style scoped>
.header-root{
  width: 100%;
  height: 70px;
  background-color: #1588c7;
}

.header-root .content .name{
  margin-left: 50px;
}

.header-root .content .name img{
  width: 50px;
  height: 50px;
  margin-top: 8px;
}

.header-root .content .name h2{
  height: 70px;
  line-height: 70px;
  color: white;
  font-weight: bolder;
  font-size: 30px;
  margin-left: 20px;
}

.header-root .content .operate{
  margin-right: 50px;
}

.header-root .content .operate .visualization,
.header-root .content .operate .logout{
  display: inline-block;
  color: white;
  height: 70px;
  line-height: 70px;
  font-size: 20px;
  font-weight: bolder;
  margin-left: 50px;
}
</style>