<template>
  <div>
    <div>
      <el-button type="primary" @click="find">搜索</el-button>
      <el-input style="width:400px" v-model="input"></el-input>
    </div>
    <div>
      <el-button type="primary" @click="again">重置</el-button>
    </div>
    <div>
      <el-button type="primary" @click="add">添加</el-button>
    </div>
    <div>
      <el-button type="primary" @click="Change">
        <i class="iconfont icon-paixu"></i>
      </el-button>
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
    </div>

    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      :data="list"
      style="width: 100%"
    >
      <el-table-column prop="id" label="id"> </el-table-column>

      <el-table-column prop="label" label="姓名"> </el-table-column>

      <el-table-column prop="base" label="底薪"> </el-table-column>

      <el-table-column prop="work_time" label="工作时长"> 
        <template slot-scope="scope">
          {{scope.row.work_time}}{{' 小时'}}
        </template>
      </el-table-column>

      <el-table-column prop="late_time" label="请假时长">
        <template slot-scope="scope">
          {{scope.row.late_time}}{{' 小时'}}
        </template>
      </el-table-column>

      <el-table-column prop="add_time" label="加班时长"> 
        <template slot-scope="scope">
          {{scope.row.add_time}}{{' 小时'}}
        </template>
      </el-table-column>

      <el-table-column prop="special" label="节日加班时长"> 
        <template slot-scope="scope">
          {{scope.row.special}}{{' 小时'}}
        </template>
      </el-table-column>
      <el-table-column prop="money" label="工资"> </el-table-column>
    </el-table>
    <ui-open
      v-model="close"
      @init="search"
      :row="row"
    ></ui-open>
    <!--  -->
    <div>
      <el-pagination 
        @size-change="sizeChangeHandle" 
        @current-change="currentChangeHandle" 
        :current-page="pageIndex"
        :page-sizes="[5, 10, 15, 30, 50]" 
        :page-size="pageSize" 
        :total="totalPage" 
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
    </div>
    <!--  -->
  </div>
</template>
<script>
import {moneyAll,moneyChange,moneyNewPost,moneyFind} from '@/api/money.js'
export default {
  data() {
    return {
      loading: false,
      list: [],
      close: false, //开关
      row: {}, //需要编辑的列表数据
      Value1: "id",
      option1: [
        { label: "id", value: 0 },
        { label: "加班时间", value: 2 },
        { label: "请假时间", value: 3 },
        { label: "工资", value: 4 },
      ],
      other:[1],
      input:'',
      // 
      totalPage: 0, //总条目数
        pageSize: 10,//每页条数
        pageIndex: 1,//当前页数
        //参数
        tableData: [],
        //查询条件
        dataForm: {
          keywords: '',
        }
      // 
    };
  },
  mounted() {
    this.search();
  },
  methods: {
    search(){
        this.loading = true;
        moneyAll().then((ro)=>{
            this.list = ro.data
            this.list.forEach((ro)=>{
              moneyChange(ro)
            })
            this.loading = false;
        })
    },
    add() {
      this.close = true; //开关
      this.isEdit = false;
    },
    changeValue1(value) {
      this.Value1 = value;
    },
    Change(){
      // 
      if((this.Value1 == 'id' && this.other == 1)||
      (this.Value1 == '工资' && this.other == 1)||
      (this.Value1 == '加班时间' && this.other == 1)||
      (this.Value1 == '请假时间' && this.other == 1)
      ){
        this.other = 2
        console.log('现在是2');
        moneyNewPost({
          other:this.other,
          Value1:this.Value1
        }).then((ro)=>{
          this.list = ro.data
        })
        return
      }
      // 
      if(
        (this.Value1 == 'id' && this.other == 2)||
        (this.Value1 == '工资' && this.other == 2)||
        (this.Value1 == '加班时间' && this.other == 2)||
        (this.Value1 == '请假时间' && this.other == 2)
        ){
        this.other = 1
        console.log('现在是1');
        moneyNewPost({
          other:this.other,
          Value1:this.Value1
        }).then((ro)=>{
          this.list = ro.data
        })
        return
      }
    },
    find(){
      moneyFind({
        input:this.input
      }).then((ro)=>{
        this.list = []
        this.list.push(ro.data)
        this.$message.success(ro.message);
      })
    },
    again(){
      this.search();
    },
    // 
    // 
    //
    //pageSize 改变时会触发  每页条数
      sizeChangeHandle(val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      //currentPage 改变时会触发  当前页
      currentChangeHandle(val) {
        this.getDataList(val)
      },
       //调用请求方法
     getDataList(currIndex) {
     //判断属性是否为空，是即第一页
       this.pageIndex = currIndex ? currIndex : 1;
        this.$http({
          url: this.$http.adornUrl('/product/getListAll'),
          method: 'get',
          params: this.$http.adornParams({
            'pageNum': this.pageIndex,//当前页数
            'pageSize': this.pageSize,//每页条数
            'keywords': this.dataForm.keywords
          })
        }).then(({
          data
        }) => {
          if (data && data.code === 0) {
          //总条数
            this.totalPage = data.data.total
            //数据
            this.tableData = data.data.list;//
          }
        })
      }
      // 
      // 
      // 
  },
  filters: {
    filterTime(val) {
      return new Date(val).toLocaleString();
    },
  },
  //监听页数发生改变
 watch:{
      totalPage(){
        if(this.totalPage == (this.pageIndex -1) * this.pageSize && this.totalPage != 0){
          this.pageIndex-= 1;
          this.getDataList();
        }
      }
    },
  components: {
    uiOpen: require("./components/open").default,
  },
};
</script>
<style lang="less" scoped>
</style>