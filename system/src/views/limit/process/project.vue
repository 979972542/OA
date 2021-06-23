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

      <el-table-column prop="project" label="项目名称"> </el-table-column>

      <el-table-column prop="time" label="时间"> </el-table-column>

      <el-table-column prop="bonus" label="奖金"> </el-table-column>

      <el-table-column prop="adopt" label="通过"> </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
            <el-button type="primary" @click="add_list(scope.row.project)">
              <i class="icon-liebiao iconfont" title="展开列表"></i>
            </el-button>
            <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
            <el-button type="danger" @click="delite(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <ui-open
      v-model="close"
      @init="search"
      :row="row"
      :isEdit="isEdit"
    ></ui-open>
    <tableOpen
    v-model="close_list"
    :row_list = row_list
    ></tableOpen>
  </div>
</template>
<script>
import {limitproject,limitprojectdelete,limitjudge} from '@/api/limit.js'
export default {
  data() {
    return {
      loading: false,
      list: [],
      close_list:false,
      close: false, //开关
      row: {}, //需要编辑的列表数据
      row_list: {},
      isEdit: false, //是否打开(那个页面)
    };
  },
  mounted() {
    this.search();
  },
  methods: {
    search(){
      this.loading = true;
      limitproject().then((ro)=>{
        this.list = ro.data;
        this.loading = false
      })
    },
    add(){
      this.close = true
      this.isEdit = false
    },
    add_list(row){
      this.close_list = true
      this.row_list = row
    },
    edit(row){
      this.close = true
      this.isEdit = true
      this.row = row
    },
    delite(row){
      limitjudge({
        project_where:row.project
      }).then((val)=>{
        console.log(val);
        if(val.status == 201){
          this.$confirm("项目里的分组任务会一并删除，是否确定").then(()=>{
            limitprojectdelete({
              project:row.project,
              id:row.id
            }).then(ro=>{
              this.$message.success(ro.message)
              this.search();
            })
          }).catch(()=>{})
        }
        if(val.status == 200){
          this.$confirm("是否删除空项目").then(()=>{
            limitprojectdelete({
              project:row.project,
              id:row.id
            }).then(ro=>{
              this.$message.success(ro.message)
              this.search();
            })
          }).catch(()=>{})
        }
      })
    }
  },
  filters: {
    filterTime(val) {
      return new Date(val).toLocaleString();
    },
  },
  components: {
    uiOpen: require("./project-components/open").default,
    tableOpen: require("./project-list").default,
  },
};
</script>
<style lang="less" scoped>
</style>