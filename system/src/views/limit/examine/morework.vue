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
      class="table"
    >
      <el-table-column prop="id" label="id" width="100"> </el-table-column>

      <el-table-column prop="label" label="加班人员" width="100"> </el-table-column>

      <el-table-column prop="reason" label="加班原因" width="100"> </el-table-column>

      <el-table-column prop="created_time" label="加班开始时间" width="180">
        <template slot-scope="scope">
          {{ scope.row.created_time | filterTime }}
        </template>
      </el-table-column>

      <el-table-column prop="time" label="加班时长" width="100"> 
        <template slot-scope="scope">
        {{ scope.row.time }}{{scope.row.Company}}
        </template>
      </el-table-column>

      <el-table-column prop="adopt" label="申请是否通过" width="100">
        <template slot-scope="scope">
          {{scope.row.Adopt}}
        </template>
      </el-table-column>

       <el-table-column prop="festival" label="是否节假日加班" width="130">
        <template slot-scope="scope">
          {{scope.row.Festival}}
        </template>
      </el-table-column>

      <el-table-column prop="created_at" label="加班申请时间" show-overflow-tooltip>
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
import {limitMorework} from "@/api/limit.js"
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
      Adopt:[],
      Festival:[],
    };
  },
  mounted() {
    this.search();
  },
  methods: {
    search(){
      this.loading = true;
      limitMorework().then((ro)=>{
        this.list = ro.data;
        this.list.forEach((ro)=>{
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
          // 
          if(ro.festival == 0){
            ro.Festival = '不是'
          }
          if(ro.festival == 1){
            ro.Festival = '是'
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
    uiOpen: require("./morework-components/open").default,
  },
};
</script>
<style lang="less" scoped>
.table{
  width:100%;
}
</style>