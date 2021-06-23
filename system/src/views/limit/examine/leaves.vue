<template>
  <div>
    <div>
      <el-button type="primary" @click="search">搜索</el-button>
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
      <el-table-column prop="id" label="id" width="100"> </el-table-column>

      <el-table-column prop="label" label="请假人员"  width="100"> </el-table-column>

      <el-table-column prop="reason" label="请假原因" width="100"> </el-table-column>

      <el-table-column prop="created_time" label="放假开始时间" width="180">
        <template slot-scope="scope">
          {{ scope.row.created_time | filterTime }}
        </template>
      </el-table-column>

      <el-table-column prop="time" label="放假时长" width="100"> 
        <template slot-scope="scope">
        {{ scope.row.time }}{{scope.row.Company}}
        </template>
      </el-table-column>

      <el-table-column prop="adopt" label="是否通过" width="100" style="color:red">
        <template slot-scope="scope">
          {{scope.row.Adopt}}
        </template>
      </el-table-column>

      <el-table-column prop="created_at" label="申请时间" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.created_at | filterTime }}
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
            <el-button type="primary" @click="primary(scope.row)">审核</el-button>
        </template>
      </el-table-column>
    </el-table>

    <ui-open
      v-model="close"
      :row= row
      :isEdit = isEdit
      @init="search"
    ></ui-open>
  </div>
</template>
<script>
import {limitLeaves} from "@/api/limit.js"
export default {
  data() {
    return {
      loading: false,
      list: [],
      close: false, //开关
      row: {}, //需要编辑的列表数据
      isEdit: false, //是否打开(那个页面)
      Company:[{
        hours:'时',
        day:'天',
        week:'周'
      }],
      Adopt:[]
    };
  },
  mounted() {
    this.search();
  },
  methods: {
    search(){
      this.loading = true;
      limitLeaves().then((ro)=>{
        this.list = ro.data;
        this.list.forEach((ro)=>{
          // console.log(ro.time);
          if(ro.adopt == 0){
            ro.Adopt = '未审核'
          }
          if(ro.adopt == 1){
            ro.Adopt = '已通过'
          }
          if(ro.adopt == 2){
            ro.Adopt = '审核不通过'
          }
          // 
          if(ro.time < 8){
            // 
            ro.Company = this.Company.map((ro)=>ro.hours)[0]
          }

          if(ro.time >= 8 && ro.time < 40){
            ro.time = ro.time/8
              ro.Company = this.Company.map((ro)=>ro.day)[0]
          }

          if(ro.time >= 40){
            ro.time = ro.time/40
             ro.Company = this.Company.map((ro)=>ro.week)[0]
          }

        })
        // 
        this.loading = false
      })
    },
    add(){
      this.close = true;
      this.isEdit = false
    },
    primary(row){
      this.close = true;
      this.row = row;
      this.isEdit = true
    },
  },
  filters: {
    filterTime(val) {
      return new Date(val).toLocaleString();
    },
  },
  components: {
    uiOpen: require("./leaves-components/open").default,
  },
};
</script>
<style lang="less" scoped>
</style>