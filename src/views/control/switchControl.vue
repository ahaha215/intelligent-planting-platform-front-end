<template>
  <div class="mode-control-root">
    <!-- 解决高度坍塌开始 -->
    <div style="height: 50px"></div>
    <!-- 解决高度坍塌结束 -->

    <el-table
      :data="tableData"
      border
      class="model-contorl-table"
      :row-style="{ height: '100px' }"
    >
      <el-table-column prop="name" label="功能名称"> </el-table-column>
      <el-table-column prop="sensor" label="执行器型号"></el-table-column>
      <el-table-column prop="description" label="功能说明"></el-table-column>
      <el-table-column label="状态控制">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.autoModel"
            active-value="true"
            inactive-value="flase"
            inactive-text="关闭"
            active-text="开启"
            @change="change(scope.$index, scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: "一层土壤加热",
          description: "对种植地的一层土壤进行手动加热",
          sensor: "P&P[5v/2.5w]",
          autoModel:false
        },
        {
          name: "二层土壤加热",
          description: "对种植地的二层土壤进行手动加热",
          sensor: "P&P[5v/2.5w]",
          autoModel:false
        },
        {
          name: "灌溉",
          description: "对种植地进行手动灌溉",
          sensor: "DC[3v]",
          autoModel :false
        },
        {
          name: "通风",
          description: "对种植地进行通风",
          sensor: "SG90",
          autoModel: false
        },
        {
          name: "补光",
          description: "对种植地进行手动补光",
          sensor: "FL5V",
          autoModel:false
        },
      ],
    };
  },
  methods: {
    change(index, row) {
      switch (index) {
        case 0:
          if (row.autoModel == "true") {
            var msgOneOpen = '{"M":"say","ID":"D28950","C":"exOpHe_1","SIGN":""}\n';
            this.$websocket.send(msgOneOpen);
            this.$notify({
              title: "成功",
              message: "一层土壤加热开启成功！",
              type: "success",
            });
          } else {
            var msgOneClose = '{"M":"say","ID":"D28950","C":"exCloHe_1","SIGN":""}\n';
            this.$websocket.send(msgOneClose);
            this.$notify({
              title: "成功",
              message: "一层土壤加热关闭成功！",
              type: "success",
            });
          }
          break;

        case 1:
          if (row.autoModel == "true") {
            var msgTwoOpen = '{"M":"say","ID":"D28950","C":"exOpHe_2","SIGN":""}\n';
            this.$websocket.send(msgTwoOpen);
            this.$notify({
              title: "成功",
              message: "二层土壤加热开启成功！",
              type: "success",
            });
          } else {
            var msgTwoClose = '{"M":"say","ID":"D28950","C":"exCloHe_2","SIGN":""}\n';
            this.$websocket.send(msgTwoClose);
            this.$notify({
              title: "成功",
              message: "二层土壤加热关闭成功！",
              type: "success",
            });
          }
          break;

        case 2:
          if (row.autoModel == "true") {
            var msgThreeOpen = '{"M":"say","ID":"D28950","C":"exOpWa","SIGN":""}\n';
            this.$websocket.send(msgThreeOpen);
            this.$notify({
              title: "成功",
              message: "灌溉开启成功！",
              type: "success",
            });
          } else {
            var msgThreeClose = '{"M":"say","ID":"D28950","C":"exCloWa","SIGN":""}\n';
            this.$websocket.send(msgThreeClose);
            this.$notify({
              title: "成功",
              message: "灌溉关闭成功！",
              type: "success",
            });
          }
          break;

        case 3:
          if (row.autoModel == "true") {
            var msgFourOpen = '{"M":"say","ID":"D28950","C":"exOpVen","SIGN":""}\n';
            this.$websocket.send(msgFourOpen);
            this.$notify({
              title: "成功",
              message: "通风开启成功！",
              type: "success",
            });
          } else {
            var msgFourClose = '{"M":"say","ID":"D28950","C":"exCloVen","SIGN":""}\n';
            this.$websocket.send(msgFourClose);
            this.$notify({
              title: "成功",
              message: "通风关闭成功！",
              type: "success",
            });
          }
          break;

        default:
          if (row.autoModel == "true") {
            var msgFiveOpen = '{"M":"say","ID":"D28950","C":"exOpLi","SIGN":""}\n';
            this.$websocket.send(msgFiveOpen);
            this.$notify({
              title: "成功",
              message: "开窗开启成功！",
              type: "success",
            });
          } else {
            var msgFiveClose = '{"M":"say","ID":"D28950","C":"exCloLi","SIGN":""}\n';
            this.$websocket.send(msgFiveClose);
            this.$notify({
              title: "成功",
              message: "开窗关闭成功！",
              type: "success",
            });
          }
      }
    }
  },
};
</script>

<style scoped>
.model-contorl-table {
  width: calc(100% - 300px);
}
</style>