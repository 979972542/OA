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

      <el-table-column prop="label" label="昵称"> </el-table-column>
      
      <el-table-column prop="account" label="账号"> </el-table-column>

      <el-table-column prop="password" label="密码"> </el-table-column>

      <el-table-column prop="purviews.purview" label="角色"> </el-table-column>

      <el-table-column label="操作">
        <!-- <template slot-scope="scope"> -->
            <el-button type="danger">删除</el-button>
        <!-- </template> -->
      </el-table-column>
    </el-table>

    <ui-open
      v-model="close"
      @init="search"
    ></ui-open>
  </div>
</template>
<script>
import {accountget} from '@/api/purview.js'
export default {
  data() {
    return {
      loading: false,
      list: [],
      close: false, //开关
    };
  },
mounted() {
    this.search();
  },
  methods: {
    search(){
      this.loading = true;
      accountget().then((ro)=>{
        this.list = ro.data;
        this.loading = false
      })
    },
    add(){
      this.close = true
      this.isEdit = false
    }
  },
  components: {
    uiOpen: require("./components/open").default,
  },
};
</script>
<style lang="less" scoped>
</style>