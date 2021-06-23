<template>
  <el-dialog
    title="添加"
    width="500px"
    :visible.sync="dialog"
    :before-close="handleClose"
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

      <el-form-item label="账号" prop="account">
        <el-input v-model="form.account"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>

      <el-form-item label="角色选择" prop="purview">
        <el-select v-model="form.purview">
          <el-option
            v-for="(item, index) in list"
            :key="index"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="exit">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { accountget, accountadd } from "@/api/purview.js";
export default {
  props: {
    value: {},
  },
  data() {
    return {
      form: {
        label: "",
        account: "",
        password: "",
        purview: "",
      },
      rules: {
        account: [{ required: true, message: "账号必填", trigger: "blur" }],
        label: [{ required: true, message: "姓名必填", trigger: "blur" }],
        password: [{ required: true, message: "密码必填", trigger: "blur" }],
        purview: [{ required: true, message: "请选择角色", trigger: "change" }],
      },
      list: [],
      dialog: false,
      loading: false,
    };
  },
  mounted() {
    this.search();
  },
  methods: {
    search() {
      this.loading = true;
      accountget().then((res) => {
        this.list = res.data.map((row) => {
          return {
            label: row.purviews.purview,
            value: row.id,
          };
          
        });
      });
      //

      //
    },
    submit() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          accountadd({
            account: this.form.account,
            password: this.form.password,
            label: this.form.label,
            purview: this.form.purview,
          }).then((res) => {
            this.$message.success(res.message);
            this.dialog = false;
            this.$emit("init");
          });
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