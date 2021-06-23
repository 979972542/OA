<template>
  <el-dialog
    title="添加"
    width="500px"
    :visible.sync="dialog"
    :before-close="handleClose"
    @open="open"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="人员姓名" prop="label">
        <el-input v-model="form.label"></el-input>
      </el-form-item>

      <el-form-item label="底薪" prop="base">
        <el-input v-model="form.base"></el-input>
      </el-form-item>

    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="exit">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import {moneyAdd } from "@/api/money.js"
export default {
  props: {
    value: {},
    row: {}, //编辑数据
    isEdit: {}, //编辑开关
  },
  data() {
    return {
      form: {
        label: "",
        base:""
      },
      rules: {
        label: [{ required: true, message: "名称不能为空", trigger: "blur" }],
        base: [{ required: true, message: "底薪不能为空", trigger: "blur" }],
      },
      dialog: false,
      loading: false,
    };
  },
  mounted() {
    
  },
  methods: {
    submit() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
              moneyAdd({
                label:this.form.label,
                base:this.form.base
                }).then((res) => {
              this.$message.success(res.message);
              this.dialog = false;
              this.$emit("init");
            });
        } else {
          return false;
        }
      });
    },
    exit() {
      this.dialog = false;
    },

    handleClose(e) {
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
        if (this.isEdit) {
          this.form.label = this.row.label;
          this.form.base = this.row.base;
        }
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