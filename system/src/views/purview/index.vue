<template>
  <div>
    <div>
      <el-button @click="search" type="primary">搜索</el-button>
    </div>

    <div>
      <el-button @click="add" type="primary">添加</el-button>
    </div>

    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      :data="list"
      style="width: 100%"
    >
      <el-table-column prop="id" label="id"> </el-table-column>

      <el-table-column prop="purview" label="职位"> </el-table-column>

      <el-table-column label="权限">
        <template slot-scope="scope">
          <template v-if="scope.row.routerId == 0">
            <span>超级管理员,全部权限</span>
          </template>
          <template v-else>
            <span v-for="(item, index) in scope.row.router" :key="index">
              {{ item.label }}
            </span>
          </template>
        </template>
      </el-table-column>

      <el-table-column prop="created_at" label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.created_at | filterTime }}
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <div v-if="scope.row.routerId != '0'">
            <el-button @click="edit(scope.row)" type="primary">编辑</el-button>
            <el-button @click="Delete(scope.row)" type="danger">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <ui-open
      v-model="close"
      @init="search"
      :row="row"
      :isEdit="isEdit"
    ></ui-open>
  </div>
</template>
<script>
import { getPurviewList, purviewDelete } from "@/api/purview.js";
export default {
  data() {
    return {
      loading: false,
      list: [],
      close: false, //开关
      row: {}, //需要编辑的列表数据
      isEdit: false, //是否打开(那个页面)
    };
  },
  mounted() {
    this.search();
  },
  methods: {
    search() {
      this.loading = true;
      getPurviewList().then((res) => {
        this.list = res.data;
        this.loading = false;
      });
    },
    add() {
      this.close = true; //开关
      this.isEdit = false;
    },
    edit(row) {
      this.close = true;
      this.row = row;
      this.isEdit = true;
    },
    Delete(row) {
      this.$confirm(`此操作将永久删除${row.purview},是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          purviewDelete(row.id).then((res) => {
            this.$message.success(res.message);
            this.search();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  filters: {
    filterTime(val) {
      return new Date(val).toLocaleString();
    },
  },
  components: {
    uiOpen: require("./components/open").default,
  },
};
</script>
<style lang="less" scoped>
</style>