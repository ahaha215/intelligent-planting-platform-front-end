<template>
  <div class="alarm-record-root">
    <!-- 报警记录搜索表单开始 -->
    <div class="top clearfix">
      <div class="search-from right">
        <el-select
          placeholder="请选择"
          slot="prepend"
          style="width: 150px"
          v-model="alarmRecordQueryCondition.type"
        >
          <el-option label="未处理" value="未处理"></el-option>
          <el-option label="已处理" value="已处理"></el-option>
          <el-option label="不限" value=""></el-option>
        </el-select>
        <el-date-picker
          v-model="searchTime"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
        <el-button icon="el-icon-search" @click="searchAlarmRecord"></el-button>
      </div>
    </div>
    <!-- 报警记录搜索表单结束 -->

    <!-- 报警信息表格 -->
    <el-table
      :data="pageAlarmRecordListData.list"
      class="record-info-table"
      border
    >
      <el-table-column label="时间" width="250">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            formatTime(scope.row.time)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类别" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述" width="250">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="级别" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.level }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否处理" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.isHandle }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleAlarm(scope.$index, scope.row)"
            >处理</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next"
      :total="pageAlarmRecordListData.total"
      :page-size="pageAlarmRecordListData.limit"
      @current-change="currentChange"
      class="right page"
    >
    </el-pagination>

    <!-- 报警处理 -->
    <el-dialog
      title="报警处理"
      :visible.sync="dialogFormVisible"
      width="50%"
      center
      top="15%"
    >
      <el-form style="width: 40%; margin: auto">
        <el-form-item label="处理状态">
          <el-select
            placeholder="请选择处理状态"
            v-model="alarmRecordHandle.isHandle"
          >
            <el-option label="未处理" value="未处理"></el-option>
            <el-option label="已处理" value="已处理"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handelSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  pageAlarmRecordListByConditionApi,
  deleteAlarmRecordApi,
  handleAlarmRecordApi,
} from "../../api/index";

export default {
  name: "UserManager",
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      pageAlarmRecordListData: {
        current: 1,
        limit: 8,
        total: 0,
        pages: 0,
        hasPrevious: false,
        hasNext: false,
        list: [],
      },
      searchTime: "",
      alarmRecordQueryCondition: {
        current: 1,
        limit: 8,
        type: "",
        beginTime: "",
        endTime: "",
      },
      dialogFormVisible: false,
      alarmRecordHandle: {
        id: "",
        isHandle: "",
      },
    };
  },
  created() {
    this.pageAlarmRecordListByCondition();
  },
  methods: {
    pageAlarmRecordListByCondition() {
      pageAlarmRecordListByConditionApi(this.alarmRecordQueryCondition).then(
        (response) => {
          let data = response.data.alarmRecordPageVO;
          this.pageAlarmRecordListData.total = data.total;
          this.pageAlarmRecordListData.pages = data.pages;
          this.pageAlarmRecordListData.hasPrevious = data.hasPrevious;
          this.pageAlarmRecordListData.hasNext = data.hasNext;
          this.pageAlarmRecordListData.list = data.list;
        }
      );
    },
    handleAlarm(index, row) {
      this.alarmRecordHandle.id = row.id;
      this.alarmRecordHandle.isHandle = row.isHandle;
      this.dialogFormVisible = true;
    },
    handelSubmit() {
      handleAlarmRecordApi(this.alarmRecordHandle).then(
        (response) => {
          this.$notify({
            title: "成功",
            message: "处理报警信息成功！",
            type: "success",
          });
          this.pageAlarmRecordListByCondition();
        },
        (error) => {
          this.$notify({
            title: "失败",
            message: "处理报警信息失败！",
            type: "error",
          });
        }
      );
      this.dialogFormVisible = false;
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该报警信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteAlarmRecordApi(row.id).then(
            (response) => {
              this.$notify({
                title: "成功",
                message: "删除报警信息成功！",
                type: "success",
              });
              this.pageAlarmRecordListByCondition();
            },
            (error) => {
              this.$notify({
                title: "失败",
                message: "删除报警信息失败！",
                type: "error",
              });
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    currentChange(current) {
      this.alarmRecordQueryCondition.current = current;
      this.pageAlarmRecordListByCondition();
    },
    searchAlarmRecord() {
      // 将分页启始发页设置为1
      this.alarmRecordQueryCondition.current = 1;

      // 处理搜索的时间
      this.alarmRecordQueryCondition.beginTime = this.searchTime[0];
      this.alarmRecordQueryCondition.endTime = this.searchTime[1];

      this.pageAlarmRecordListByCondition();
    },

    formatTime(time) {
      let date = new Date(time);
      const Y = date.getFullYear();
      const M = this.prefixZero(date.getMonth() + 1);
      const D = this.prefixZero(date.getDate());
      const H = this.prefixZero(date.getHours());
      const Mi = this.prefixZero(date.getMinutes());
      const S = this.prefixZero(date.getSeconds());
      return Y + "-" + M + "-" + D + " " + H + ":" + Mi + ":" + S;
    },
    prefixZero(num = 0, n = 2) {
      // 数字位数不够，数字前面补零
      return (Array(n).join("0") + num).slice(-n);
    },
  },
};
</script>

<style scoped>
.top {
  height: 50px;
  padding-top: 30px;
  padding-right: 30px;
}
.search-from {
  position: relative;
}
.page {
  margin-right: 20px;
  margin-top: 50px;
}

.record-info-table {
  width: calc(100vw - 300px);
  margin-top: 20px;
}

.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>