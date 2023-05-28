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
      <el-table-column prop="name" label="工作名称" width="150px">
      </el-table-column>
      <el-table-column
        prop="sensor"
        label="执行器型号"
        width="150px"
      ></el-table-column>
      <el-table-column prop="description" label="功能说明"></el-table-column>
      <el-table-column label="启动模式（手动模式或自动模式）" width="250px">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.autoModel"
            inactive-text="手动模式"
            active-text="自动模式"
            @change="change(scope.$index, scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="threshold" label="阈值设定">
        <template slot-scope="scope" v-if="scope.row.autoModel">
          <el-button
            type="primary"
            style="margin-right: 30px"
            size="mini"
            @click="scope.row.drawer = true"
            >设定</el-button
          >

          您是设置的土壤温度阈值为：{{ scope.row.threshold }}
        </template>
      </el-table-column>
    </el-table>

    <!-- 设置自动模式工作指标阈值 -->

    <!-- 一层土壤加热 -->
    <el-drawer
      title="一层土壤加热温度阈值设定"
      :visible.sync="tableData[0].drawer"
      direction="ttb"
    >
      <div style="text-align: center">
        <div>
          <span>设置一层土壤加热温度阈值：</span>
          <el-select
            v-model="tableData[0].threshold"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in tableData[0].selectOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>

        <el-button
          type="primary"
          style="width: 400px; margin-top: 50px"
          @click="heatThresholdOne"
        >
          提交
        </el-button>
      </div>
    </el-drawer>
    <!-- 二层土壤加热 -->
    <el-drawer
      title="二层土壤加热温度阈值设定"
      :visible.sync="tableData[1].drawer"
      direction="ttb"
    >
      <div style="text-align: center">
        <div>
          <span>设置二层土壤加热温度阈值：</span>
          <el-select
            v-model="tableData[1].threshold"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in tableData[1].selectOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>

        <el-button
          type="primary"
          style="width: 400px; margin-top: 50px"
          @click="heatThresholdTwo"
        >
          提交
        </el-button>
      </div>
    </el-drawer>
    <!-- 灌溉 -->
    <el-drawer
      title="灌溉湿度阈值设定"
      :visible.sync="tableData[2].drawer"
      direction="ttb"
    >
      <div style="text-align: center">
        <div>
          <span>设置灌溉湿度阈值：</span>
          <el-select
            v-model="tableData[2].threshold"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in tableData[2].selectOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>

        <el-button
          type="primary"
          style="width: 340px; margin-top: 50px"
          @click="irrigateThreshold"
        >
          提交
        </el-button>
      </div>
    </el-drawer>
    <!-- 通风 -->
    <el-drawer
      title="通风湿度阈值设定"
      :visible.sync="tableData[3].drawer"
      direction="ttb"
    >
      <div style="text-align: center">
        <div>
          <span>设置通风湿度阈值：</span>
          <el-select
            v-model="tableData[3].threshold"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in tableData[3].selectOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>

        <el-button
          type="primary"
          style="width: 340px; margin-top: 50px"
          @click="airThreshold"
        >
          提交
        </el-button>
      </div>
    </el-drawer>
    <!-- 补光 -->
    <el-drawer
      title="补光光照阈值设定"
      :visible.sync="tableData[4].drawer"
      direction="ttb"
    >
      <div style="text-align: center">
        <div>
          <span>设置补光光照阈值：</span>
          <el-select
            v-model="tableData[4].threshold"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in tableData[4].selectOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>

        <el-button
          type="primary"
          style="width: 340px; margin-top: 50px"
          @click="windowThreshold"
        >
          提交
        </el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: "一层土壤加热",
          description: "监测到一层土壤温度低于设定值，自动进行加热",
          sensor: "P&P[5v/2.5w]",
          threshold: "18",
          autoModel: false,
          drawer: false,
          selectOption: [
            {
              value: "18",
              label: "18",
            },
            {
              value: "22",
              label: "22",
            },
            {
              value: "26",
              label: "26",
            },
          ],
        },
        {
          name: "二层土壤加热",
          description: "监测到二层土壤温度低于设定值，自动进行加热",
          sensor: "P&P[5v/2.5w]",
          threshold: "18",
          autoModel: false,
          drawer: false,
          selectOption: [
            {
              value: "18",
              label: "18",
            },
            {
              value: "22",
              label: "22",
            },
            {
              value: "26",
              label: "26",
            },
          ],
        },
        {
          name: "灌溉",
          description: "监测到土壤湿度低于设定值，自动进行灌溉",
          sensor: "DC[3v]",
          threshold: "10",
          autoModel: false,
          drawer: false,
          selectOption: [
            {
              value: "10",
              label: "10",
            },
            {
              value: "30",
              label: "30",
            },
            {
              value: "50",
              label: "50",
            },
          ],
        },
        {
          name: "通风",
          description: "监测到湿度高于设定值，自动进行通风",
          sensor: "SG90",
          threshold: "40",
          autoModel: false,
          drawer: false,
          selectOption: [
            {
              value: "40",
              label: "40",
            },
            {
              value: "60",
              label: "60",
            },
            {
              value: "80",
              label: "80",
            },
          ],
        },
        {
          name: "补光",
          description: "监测到光照低于设定值，自动进行补光",
          sensor: "FL5V",
          threshold: "40",
          autoModel: false,
          drawer: false,
          selectOption: [
            {
              value: "40",
              label: "40",
            },
            {
              value: "60",
              label: "60",
            },
            {
              value: "80",
              label: "80",
            },
          ],
        },
      ],
    };
  },
  created() {},
  methods: {
    change(index, row) {
      switch (index) {
        case 0:
          if (row.autoModel) {
            var msgOneOpen =
              '{"M":"say","ID":"D28950","C":"altAuHe_1","SIGN":""}\n';
            this.$websocket.send(msgOneOpen);
            this.$notify({
              title: "成功",
              message: "一层土壤加热自动模式开启成功！",
              type: "success",
            });
          } else {
            var msgOneClose =
              '{"M":"say","ID":"D28950","C":"altHaHe_1","SIGN":""}\n';
            this.$websocket.send(msgOneClose);
            this.$notify({
              title: "成功",
              message: "一层土壤加热自动模式关闭成功！",
              type: "success",
            });
          }
          break;

        case 1:
          if (row.autoModel) {
            var msgTwoOpen =
              '{"M":"say","ID":"D28950","C":"altAuHe_2","SIGN":""}\n';
            this.$websocket.send(msgTwoOpen);
            this.$notify({
              title: "成功",
              message: "二层土壤加热自动模式开启成功！",
              type: "success",
            });
          } else {
            var msgTwoClose =
              '{"M":"say","ID":"D28950","C":"altHaHe_2","SIGN":""}\n';
            this.$websocket.send(msgTwoClose);
            this.$notify({
              title: "成功",
              message: "二层土壤加热自动模式关闭成功！",
              type: "success",
            });
          }
          break;

        case 2:
          if (row.autoModel) {
            var msgThreeOpen =
              '{"M":"say","ID":"D28950","C":"altAuWa","SIGN":""}\n';
            this.$websocket.send(msgThreeOpen);
            this.$notify({
              title: "成功",
              message: "灌溉自动模式开启成功！",
              type: "success",
            });
          } else {
            var msgThreeClose =
              '{"M":"say","ID":"D28950","C":"altHaWa","SIGN":""}\n';
            this.$websocket.send(msgThreeClose);
            this.$notify({
              title: "成功",
              message: "灌溉自动模式关闭成功！",
              type: "success",
            });
          }
          break;

        case 3:
          if (row.autoModel) {
            var msgFourOpen =
              '{"M":"say","ID":"D28950","C":"altAuVen","SIGN":""}\n';
            this.$websocket.send(msgFourOpen);
            this.$notify({
              title: "成功",
              message: "通风自动模式开启成功！",
              type: "success",
            });
          } else {
            var msgFourClose =
              '{"M":"say","ID":"D28950","C":"altHaVen","SIGN":""}\n';
            this.$websocket.send(msgFourClose);
            this.$notify({
              title: "成功",
              message: "通风自动模式关闭成功！",
              type: "success",
            });
          }
          break;

        default:
          if (row.autoModel) {
            var msgFiveOpen =
              '{"M":"say","ID":"D28950","C":"altAuLi","SIGN":""}\n';
            this.$websocket.send(msgFiveOpen);
            this.$notify({
              title: "成功",
              message: "补光自动模式开启成功！",
              type: "success",
            });
          } else {
            var msgFiveClose =
              '{"M":"say","ID":"D28950","C":"altHaLi","SIGN":""}\n';
            this.$websocket.send(msgFiveClose);
            this.$notify({
              title: "成功",
              message: "补光自动模式关闭成功！",
              type: "success",
            });
          }
      }
    },
    heatThresholdOne() {
      var msgOneOpen = '{"M":"say","ID":"D28950","C":"optTem1_'+this.tableData[0].threshold+'","SIGN":""}\n';
      this.$websocket.send(msgOneOpen);
      this.tableData[0].drawer = false;
      this.$notify({
        title: "成功",
        message: "一层土壤自动加热阈值设置成功！",
        type: "success",
      });
    },
    heatThresholdTwo() {
      var msgTwoOpen = '{"M":"say","ID":"D28950","C":"optTem1_'+this.tableData[1].threshold+'","SIGN":""}\n';
      this.$websocket.send(msgTwoOpen);
      this.tableData[1].drawer = false;
      this.$notify({
        title: "成功",
        message: "二层土壤自动加热阈值设置成功！",
        type: "success",
      });
    },
    irrigateThreshold() {
      var msgThreeOpen = '{"M":"say","ID":"D28950","C":"optSo_'+this.tableData[2].threshold+'","SIGN":""}\n';
      this.$websocket.send(msgThreeOpen);
      this.tableData[2].drawer = false;
      this.$notify({
        title: "成功",
        message: "灌溉自动模式阈值设置成功！",
        type: "success",
      });
    },
    airThreshold() {
      var msgFourOpen = '{"M":"say","ID":"D28950","C":"optHum_'+this.tableData[3].threshold+'","SIGN":""}\n';
      this.$websocket.send(msgFourOpen);
      this.tableData[3].drawer = false;
      this.$notify({
        title: "成功",
        message: "通风自动模式阈值设置成功！",
        type: "success",
      });
    },
    windowThreshold() {
      var msgFiveOpen = '{"M":"say","ID":"D28950","C":"optLi_'+this.tableData[4].threshold+'","SIGN":""}\n';
      this.$websocket.send(msgFiveOpen);
      this.tableData[4].drawer = false;
      this.$notify({
        title: "成功",
        message: "开窗自动模式阈值设置成功！",
        type: "success",
      });
    },
  },
};
</script>

<style scoped>
.model-contorl-table {
  width: calc(100% - 300px);
}
</style>