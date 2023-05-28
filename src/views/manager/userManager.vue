<template>
  <div class="user-manager-root">
    <!-- 用户搜索表单开始 -->
    <div class="clearfix top">
      <div class="search-from left">
        <el-input
          placeholder="请输入内容"
          v-model="searchFrom.content"
          class="input-with-select"
        >
          <el-select
            v-model="searchFrom.type"
            placeholder="请选择"
            slot="prepend"
            style="width: 150px"
          >
            <el-option label="用户名称" value="username"></el-option>
            <el-option label="电话号码" value="telephone"></el-option>
            <el-option label="邮箱地址" value="email"></el-option>
          </el-select>
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="search"
          ></el-button>
        </el-input>
      </div>
      <el-button
        type="primary"
        class="add-user-btn right"
        @click="drawerSave = !drawerSave"
        >添加</el-button
      >
    </div>
    <!-- 用户搜索表单结束 -->

    <!-- 用户信息表格 -->
    <el-table :data="pageUserListData.list" class="user-info-table" border>
      <el-table-column label="用户名" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.sex }}</span>
        </template>
      </el-table-column>
      <el-table-column label="年龄" width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.age }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系方式" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.telephone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮件地址" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="注册时间" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">
            {{ formatTime(scope.row.gmtCreate) }}</span
          >
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
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
      :total="pageUserListData.total"
      :page-size="pageUserListData.limit"
      @current-change="currentChange"
      class="right page"
    >
    </el-pagination>

    <!-- 添加用户信息弹框 -->
    <el-drawer
      title="用户添加"
      :visible.sync="drawerSave"
      direction="ttb"
      style="height: 1800px"
    >
      <el-form
        ref="form"
        label-width="80px"
        style="width: 1000px; margin: auto"
      >
        <el-form-item label="* 用户名">
          <el-input v-model="userFromSave.username"></el-input>
        </el-form-item>
        <el-form-item label="* 密码">
          <el-input v-model="userFromSave.password"></el-input>
        </el-form-item>
        <el-form-item label="* 性别">
          <el-select v-model="userFromSave.sex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="* 年龄">
          <el-input v-model="userFromSave.age"></el-input>
        </el-form-item>
        <el-form-item label="* 电话号">
          <el-input v-model="userFromSave.telephone"></el-input>
        </el-form-item>
        <el-form-item label="* 邮箱地址">
          <el-input v-model="userFromSave.email"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmitSave">提交</el-button>
          <el-button @click="cancelSave">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>

    <!-- 修改用户信息弹框 -->
    <el-drawer
      title="用户信息修改"
      :visible.sync="drawerModify"
      direction="ttb"
      style="height: 1800px"
    >
      <el-form
        ref="form"
        label-width="80px"
        style="width: 1000px; margin: auto"
      >
        <el-form-item label="* 用户名">
          <el-input v-model="userFromModify.username"></el-input>
        </el-form-item>
        <el-form-item label="* 密码">
          <el-input v-model="userFromModify.password"></el-input>
        </el-form-item>
        <el-form-item label="* 性别">
          <el-select v-model="userFromModify.sex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="* 年龄">
          <el-input v-model="userFromModify.age"></el-input>
        </el-form-item>
        <el-form-item label="* 电话号">
          <el-input v-model="userFromModify.telephone"></el-input>
        </el-form-item>
        <el-form-item label="* 邮箱地址">
          <el-input v-model="userFromModify.email"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmitModify">提交</el-button>
          <el-button @click="cancelModify">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import {
  saveUserApi,
  pageUserListApi,
  deleteUserApi,
  findUserByIdApi,
  modifyUser,
  pageUserListByLikeApi,
} from "../../api/index";

export default {
  name: "UserManager",
  data() {
    return {
      searchFrom: {
        current: 1,
        limit: 8,
        type: "username",
        content: "",
      },
      drawerSave: false,
      drawerModify: false,
      userFromSave: {
        username: "",
        password: "",
        sex: "",
        age: "",
        telephone: "",
        email: "",
      },
      userFromModify: {},
      pageUserListData: {
        current: 1,
        limit: 8,
        total: 0,
        pages: 0,
        hasPrevious: false,
        hasNext: false,
        list: [],
      },
      searchFlag: false,
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    handleEdit(index, row) {
      findUserByIdApi(row.id).then((response) => {
        this.userFromModify = response.data.user;
      });
      this.drawerModify = !this.drawerModify;
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该用户信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteUserApi(row.id).then(
            (response) => {
              this.$notify({
                title: "成功",
                message: "删除用户信息成功！",
                type: "success",
              });
              this.getUserList();
            },
            (error) => {
              this.$notify({
                title: "成功",
                message: "删除用户信息失败！",
                type: "success",
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
    onSubmitSave() {
      saveUserApi(this.userFromSave).then(
        (response) => {
          // 关闭弹出抽屉
          this.drawerSave = false;

          // 显示提示信息
          this.$notify({
            title: "成功",
            message: "添加用户信息成功！",
            type: "success",
          });
          this.getUserList();
        },
        (error) => {
          // 显示提示信息
          this.$notify({
            title: "失败",
            message: "添加用户信息失败！",
            type: "error",
          });
        }
      );
    },
    cancelSave() {
      this.userFromSave = {};
    },
    onSubmitModify() {
      modifyUser(this.userFromModify).then(
        (response) => {
          // 关闭弹出抽屉
          this.drawerModify = false;

          // 显示提示信息
          this.$notify({
            title: "成功",
            message: "修改用户信息成功！",
            type: "success",
          });

          this.getUserList();
        },
        (error) => {
          this.$notify({
            title: "成功",
            message: "修改用户信息失败！",
            type: "error",
          });
        }
      );
    },
    cancelModify() {
      this.drawerModify = false;
    },
    getUserList() {
      pageUserListApi(
        this.pageUserListData.current,
        this.pageUserListData.limit
      ).then((response) => {
        let data = response.data.userPageVO;
        this.pageUserListData.total = data.total;
        this.pageUserListData.pages = data.pages;
        this.pageUserListData.hasPrevious = data.hasPrevious;
        this.pageUserListData.hasNext = data.hasNext;
        this.pageUserListData.list = data.list;
      });
    },
    currentChange(current) {
      this.pageUserListData.current = current;
      if (this.searchFlag) {
        this.searchFrom.current = this.pageUserListData.current;
        this.searchFrom.limit = this.pageUserListData.limit;
        this.getUsrListByLike();
      } else {
        this.getUserList();
      }
    },
    search() {
      this.searchFlag = true;
      this.getUsrListByLike();
    },
    getUsrListByLike() {
      pageUserListByLikeApi(this.searchFrom).then((response) => {
        let data = response.data.userPageVO;
        this.pageUserListData.total = data.total;
        this.pageUserListData.pages = data.pages;
        this.pageUserListData.hasPrevious = data.hasPrevious;
        this.pageUserListData.hasNext = data.hasNext;
        this.pageUserListData.list = data.list;
      });
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
  width: 800px;
}
.page {
  margin-right: 20px;
  margin-top: 50px;
}

.user-info-table {
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