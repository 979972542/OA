<template>
  <el-dialog
    width="500px"
    title="内层 Dialog"
    append-to-body
    :visible.sync="dialog_list"
    :before-close="handleClosetwo"
    @open="open"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="项目名称" prop="label">
        <el-input v-model="form.label"></el-input>
      </el-form-item>

      <el-form-item label="项目简介" prop="reason" >
        <el-input 
        v-model="form.reason" 
        type="textarea" 
        placeholder="请简单描述任务的内容"></el-input>
      </el-form-item>

    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="exit">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import {limitlistadd,limitlistedit} from "@/api/limit.js";
export default {
  props: {
    value: {},
    row: {}, //编辑数据
    isEdit: {}, //编辑开关
    row_title:{}
  },
  data() {
    return {
      form: {
        value: false,
        label:'',
        reason:''
      },
      rules: {
        label: [{ required: true, message: "项目名称不能为空", trigger: "blur" }],
      },
      list: [],
      dialog_list: false,
      loading: false,
    };
  },
  mounted() {

  },
  methods: {
    submit() {
      this.$refs["ruleForm"].validate((valid) => {
        if(valid){
          if(this.isEdit){
            limitlistedit({
              label:this.form.label,
              reason:this.form.reason,
              id:this.row.id
            }).then(ro=>{
              this.$message.success(ro.message)
              this.dialog_list = false
              this.$emit("init")
            })
          }else{
            limitlistadd({
                label:this.form.label,
                reason:this.form.reason,
                project:this.row_title
            }).then(ro=>{
              if(ro.status == 200){
                this.$message.success(ro.message)
              }else{
                this.$message.error(ro.message)
              }
              this.dialog_list = false;
              this.$emit("init");
            })
          }
        }
      });

    },
    exit() {
      this.dialog_list = false;
    },
    changeValue1(value) {
      this.Value1 = value;
    },

    handleClosetwo(e) {
      this.$confirm("确认关闭吗")
        .then(() => {
          e();
        })
        .catch(() => {});
    },
    open() {
      this.$nextTick(() => {
        // this.$nextTick()获取到的值为dom更新之后的值
        //重置表单
        this.$refs["ruleForm"].resetFields();
        if(this.isEdit){
          this.form.value = this.row.value,
          this.form.label = this.row.label,
          this.form.reason = this.row.reason
        }
      });
    },
  },
  watch: {
    value(val) {
      this.dialog_list = val;
    },
    dialog_list(val) {
      this.$emit("input", val);
    },
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
</style>