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
      <el-form-item label="权限名称" prop="purview">
        <el-input v-model="form.purview"></el-input>
      </el-form-item>


      <!--  -->
      <el-form-item label="可见权限">
        <template v-for="(item, index) in router_list">

          <el-checkbox
            v-if="!item.children"
            v-model="item.check"
            :key="index"
            >{{ item.label }}
            </el-checkbox>

          <div v-else :key="index">

            <el-checkbox
              v-model="item.check"
              @change="checkAll(item)"
              :indeterminate="item.isIndeterminate">
              {{ item.label }}
            </el-checkbox>

            <el-checkbox-group
              v-model="item.checkList"
              @change="isChange(item)">

              <el-checkbox
                v-for="ite in item.children"
                :label="ite.id"
                :key="ite.id">
                {{ ite.label }}
                </el-checkbox>
                
            </el-checkbox-group>

          </div>

        </template>
      </el-form-item>
      <!--  -->
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="exit">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import {purviewTree,purviewData,purviewAdd,purviewEdit} from '@/api/purview'
export default {
  props: {
    value: {},
    row: {}, //编辑数据
    isEdit: {}, //编辑开关
  },
  data() {
    return {
      form: {
        purview: "",
      },
      rules: {
        label: [{ required: true, message: "名称不能为空", trigger: "blur" }],
      },
      list: [],
      dialog: false,
      loading: false,
      router_list: [],
    };
  },
  mounted() {},
  methods: {
    submit() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          const router = [];
          // 先把数据存到router[]里
          this.router_list.forEach((row) => {
            if (row.check) {
              router.push(row.id);
            }
            if (row.checkList && row.checkList.length > 0) {
              router.push(...row.checkList);
              router.push(row.id);
            }
          });
          // 然后分开判断，各自调用
          if (this.isEdit) {
            purviewEdit({
              router,
              id: this.row.id,
              purview: this.form.purview,
            }).then((res) => {
              this.$message.success(res.message);
              this.dialog = false;
              this.$emit("init");
            });
          } else {
            purviewAdd({
              purview: this.form.purview,
              router,
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
    //
    // 单个选择
    isChange(row) {
      row.checkList.length > 0 && row.checkList.length != row.children.length
        ? (row.isIndeterminate = true)
        : (row.isIndeterminate = false);
      row.checkList.length == row.children.length
        ? (row.check = true)
        : (row.check = false);
    },
    // 选择全部
    checkAll(row) {
      if (row.check) {
        row.checkList = row.children.map((ro) => ro.id);
        // ro => 例：权限设置下的 两个列表
        row.isIndeterminate = false;
      } else {
        row.checkList = [];
      }
    },
    getpurviewTree() {
      this.loading = true;
      purviewTree().then((res) => {
        this.router_list = res.data.map((row) => {
          row.check = false;
          if (row.children) {
            row.isIndeterminate = false;
            row.checkList = [];
            row.children.forEach((ro) => (ro.check = false));
          }
          return row;
        });
        this.loading = false;
      });
    },
    //
    open() {
      this.$nextTick(()=>{
        this.$refs["ruleForm"].resetFields();
      })
       if (this.isEdit) {
        purviewData(this.row.id).then((res) => {
          this.router_list = res.data.tree.map((row) => {

            if (row.children) {
              row.isIndeterminate = false;
              // isIndeterminate 没有全选时
              row.children.forEach((ro) => {
                if (ro.check) {
                  row.isIndeterminate = true;
                  if (row.checkList) {
                    row.checkList.push(ro.id);
                  } else {
                    row.checkList = [ro.id];
                  }
                }
              });

              if (!row.checkList) {
                row.checkList = [];
              }
              if (row.checkList.length === row.children.length) {
                row.isIndeterminate = false;
                row.check = true;
              }
            }
            return row;
          });
          this.form.purview = res.data.purview;
        });
        } else {
        this.getpurviewTree();
      }
    },
    
    handleClose(f) {
      this.$confirm("确定关闭吗").then(() => {
        f();
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
</style>