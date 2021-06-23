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

      <el-form-item label="时间">
        <div class="block">
          <el-date-picker
            v-model="form.created_time"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </div>
      </el-form-item>

      <el-form-item label="原因" prop="reason">
        <el-input v-model="form.reason" type="textarea"></el-input>
      </el-form-item>

      <el-form-item label="是否通过">
        <el-switch
          v-model="form.value"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >
        </el-switch>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="exit">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { limitLeaves, limitLeavesAdd ,limitLeavesEdit} from "@/api/limit.js";
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
        label: "",
        time: "",
        created_time: "",
        reason: "",
        created_at: "",
      },
      Value1: "天",
      option1: [
        { label: "时", value: 0 },
        { label: "天", value: 1 },
        { label: "周", value: 2 },
      ],
      rules: {
        label: [{ required: true, message: "名称不能为空", trigger: "blur" }],
        time: [
          { required: true, message: "请假时长不能为空", trigger: "blur" },
        ],
        created_time: [
          { required: true, message: "开始时间不能为空", trigger: "blur" },
        ],
        reason: [{ required: true, message: "理由不能为空", trigger: "blur" }],
      },
      list: [],
      dialog: false,
      loading: false,
      // examine:false
    };
  },
  mounted() {
    this.search();
  },
  methods: {
    search(label) {
      this.loading = true;
      limitLeaves({
        label,
      }).then((res) => {
        this.list = res.data;
        this.loading = false;
      });
    },
    submit() {
      this.$refs["ruleForm"].validate((valid) => {
        // const test = Object.assign({},this.form)
        if (valid) {
          const createdTime = new Date(this.form.created_time).getTime()
          this.form.created_time = createdTime
          if(this.isEdit){
            // this.examine = true
            // console.log(this.examine);
            limitLeavesEdit({
              id: this.row.id,
              Value1:this.Value1,
              label:this.form.label,
              time:this.form.time,
              reason:this.form.reason,
              created_time:this.form.created_time,
              value:this.form.value,
              }).then((res)=>{
              this.$message.success(res.message);
              this.dialog = false;
              this.$emit("init");
            })
          }else{
            // this.examine = false
            // console.log(this.examine);
              limitLeavesAdd({
                Value1:this.Value1,
                label:this.form.label,
                time:this.form.time,
                reason:this.form.reason,
                created_time:this.form.created_time,
                value:this.form.value,
                }).then((res) => {

              this.$message.success(res.message);
              this.dialog = false;
              this.$emit("init");
            });
          }
        } else {
          return false;
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
          this.form.label = this.row.label;
          this.form.time = this.row.time;
          this.form.created_time = this.row.created_time;
          this.form.reason = this.row.reason;
          this.Value1 = this.row.Company
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