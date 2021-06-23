<template>
  <el-dialog
    :title="this.form.project"
    fullscreen
    :visible.sync="dialog"
    @open="open"
    :modal = false
  >
    <el-form
      :model="form"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
    <div class="return">
      <el-button type="primary" @click="submit">
        <i class="icon-zuojiantou iconfont"></i>
      </el-button>
    </div>
    <div>
      <el-button type="primary">搜索</el-button>
    </div>

    <div>
      <el-button type="primary" @click="add">添加</el-button>
    </div>
      <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      :data="list_two"
      style="width: 100%"
    >
      <el-table-column prop="id" label="id"> </el-table-column>

      <el-table-column prop="label" label="任務名稱"> </el-table-column>

      <el-table-column prop="reason" label="項目簡介"> </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
            <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
            <el-button type="danger" @click="delite(scope.row)">删除</el-button>
        </template>
      </el-table-column>

      </el-table>

      <ui-open
      v-model="close_tile"
      :row= row
      :row_title = row_title
      :isEdit = isEdit
      @init="open"
    ></ui-open>

    </el-form>

  </el-dialog>
</template>
<script>
import {limitlist,limitlistdelete} from '@/api/limit.js'
export default {
  props: {
    value: {},
    row_list:{}
  },
  data() {
    return {
      form: {
        value: false,
        project:''
      },
      list_two:[],
      dialog: false,
      loading: false,
      close_tile:false,
      row: {}, //需要编辑的列表数据
      row_title:{},
      isEdit: false, //是否打开(那个页面)
    };
  },
  mounted() {
    
  },
  methods: {
    submit(){
        this.dialog = false
    },
    changeValue1(value) {
      this.Value1 = value;
    },
    add(){
      this.close_tile = true
      console.log(this.form.project);
      this.row_title = this.form.project
    },
    edit(row){
      this.close_tile =true
      this.row = row
      this.isEdit = true
    },
    delite(row){
      console.log(row.id);
      limitlistdelete({
        id:row.id
      }).then(ro=>{
        this.$message.success(ro.message)
        limitlist({
          project:this.form.project
          }).then(ro=>{
            this.list_two = ro.data;
            this.loading = false
          })
      })
    },
    open() {
      this.$nextTick(() => {
        this.$refs["ruleForm"].resetFields();
        this.form.project = this.row_list
          limitlist({
          project:this.form.project
          }).then(ro=>{
            this.list_two = ro.data;
            this.loading = false
          })
        // 
        // add
        // project:this.form.project
        // 
      });
    },
  },
  watch: {
    value(val) {
      this.dialog = val;
    },
    dialog(val) {
      this.$emit("input", val);
    },
  },
  components: {
    uiOpen: require("./list-components/open").default,
  },
};
</script>
<style lang="less" scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.return{
  margin-bottom: 10px;
}
</style>