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
      <el-form-item label="项目名称" prop="project">
        <el-input v-model="form.project"></el-input>
      </el-form-item>

      <el-form-item label="时长" prop="time">
        <el-input v-model="form.time" style="width: 80px" onkeyup="this.value=this.value.replace(/[^\d]/g,'') "></el-input>
        <!--  -->
        <el-dropdown @command="changeValue1" split-button>
          <span class="el-dropdown-link">
            {{ Value1 }}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="item in option1"
              :key="item.value"
              :command="item.label"
            >
              <span> {{ item.label }}</span></el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
        <!--  -->
      </el-form-item>

      <el-form-item label="项目奖金" prop="bonus">
        <el-input v-model="form.bonus"></el-input>
      </el-form-item>

    <!-- <div v-if="this.isEdit"> -->
      <el-form-item label="是否通过">
        <el-switch
          v-model="form.value"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >
        </el-switch>
      </el-form-item>
    <!-- </div> -->

    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="exit">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import {limitprojectadd,limitprojectedit} from "@/api/limit.js";
export default {
  props: {
    value: {},
    row: {}, //编辑数据
    isEdit: {}, //编辑开关
  },
  data() {
    return {
      form: {
        value: false,
        project:'',
        time:'',
        bonus:'',
      },
      rules: {
        project: [{ required: true, message: "名称不能为空", trigger: "blur" }],
        time: [
          { required: true, message: "请假时长不能为空", trigger: "blur" },
        ],
      },
      list: [],
      dialog: false,
      loading: false,
      Value1: "天",
      option1: [
        { label: "天", value: 0 },
        { label: "周", value: 1 },
        { label: "月", value: 2 },
      ],
    };
  },
  mounted() {

  },
  methods: {
    submit() {
      this.$refs["ruleForm"].validate((valid) => {
          if(valid){
            if(this.isEdit){
              console.log(this.row,123);
              limitprojectedit({
                id:this.row.id,
                project:this.form.project,
                time:this.form.time,
                bonus:this.form.bonus,
                Value1:this.Value1,
                value:this.form.value
              }).then(res=>{
                this.$message.success(res.message);
                this.dialog = false;
                this.$emit("init");
              })
            }else{
              limitprojectadd({
                  project:this.form.project,
                  time:this.form.time,
                  bonus:this.form.bonus,
                  Value1:this.Value1,
                  value:this.form.value
              }).then(res=>{
                if(res.status == 200){
                    this.$message.success(res.message);
                }
                if(res.status == 402){
                    this.$message.error(res.message);
                }
                this.dialog = false;
                this.$emit("init");
              })
            }
          }else{
            return false
          }
      });

    },
    exit() {
      this.dialog = false;
    },
    changeValue1(value) {
      this.Value1 = value;
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
          this.form.project = this.row.project;
          this.form.time = this.row.time;
          this.form.bonus = this.row.bonus;
          if(this.row.adopt == 0 ){
            this.form.value = false
          }
          if(this.row.adopt == 1){
            this.form.value = true
          }
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