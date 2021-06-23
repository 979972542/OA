<template>
  <div>
    <div>
      <el-button type="primary">搜索</el-button>
    </div>

    <div>
      <el-button type="primary" @click="add">添加</el-button>
    </div>

    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      :data="list"
      style="width: 100%"
    >
      <el-table-column prop="id" label="id"> </el-table-column>

      <el-table-column prop="label" label="职位"> </el-table-column>

      <el-table-column prop="project_id" label="负责项目"> </el-table-column>

      <el-table-column label="操作">
        <!-- <template slot-scope="scope"> -->
            <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
            <el-button type="danger">删除</el-button>
        <!-- </template> -->
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
import {limittracking} from '@/api/limit.js'
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
    search(){
      this.loading = true;
      limittracking().then((ro)=>{
        this.list = ro.data;
        this.loading = false
      })
    },
    add(){
      this.close = true
      this.isEdit = false
    }
  },
  filters: {
    filterTime(val) {
      return new Date(val).toLocaleString();
    },
  },
  components: {
    uiOpen: require("./tracking-components/open").default,
  },
};
</script>
<style lang="less" scoped>
</style>