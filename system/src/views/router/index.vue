<template>
    <div>
        <div>
            <el-button @click="search" type="primary">搜索</el-button>
        </div>

        <div>
            <el-button @click="add" type="primary" >添加</el-button>
        </div>

        <el-table
            v-loading='loading'
            element-loading-text="拼命加载中"
            :data="list"
            style="width: 100%">
            <el-table-column
                prop="id"
                label="id">
            </el-table-column>
            <el-table-column
                prop="path"
                label="路径">
            </el-table-column>
            <el-table-column
                prop="label"
                label="名称">
            </el-table-column>
            <el-table-column
                label="父级">
                <template slot-scope="scope">
                    {{scope.row.parent?scope.row.parent.label:''}}
                </template>
            </el-table-column>
            <el-table-column
                prop="created_at"
                label="创建时间">
                <template slot-scope="scope">
                    {{scope.row.created_at|filterTime}}
                </template>
            </el-table-column>
            <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row)" type="primary">编辑</el-button>
                    <el-button @click="dalete(scope.row)" type="danger" >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <ui-change v-model="close" @init="search" :editRow='editRow' :isEdit='isEdit'></ui-change>
    </div>
</template>
<script>
import {RouterAll,deteleRouter} from '@/api/router.js'
export default {
    data(){
        return{
            loading:false,
            list:[],
            close:false,//开关
            editRow:{},//需要编辑的列表数据
            isEdit:false,//是否打开(那个页面)
        }
    },
    mounted(){
        this.search();
    },
    methods:{
        search(){
            this.loading = true
            RouterAll().then(res=>{
                this.list = res.data.rows
                this.loading = false
            })
        },
        add(){
            this.close = true//开关
            this.isEdit = false
        },
        edit(row){
            this.close = true
            this.editRow = row
            this.isEdit = true
        },
        dalete(row){
        // console.log(row.id);
            this.$confirm(`此操作将营救删除${row.label}, 是否继续?`, '提示',{
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
            }).then(()=>{
                deteleRouter(row.id).then((e)=>{
                    console.log(e);
                    this.$message.success(e.message)
                    this.search();
                })
            }).catch(()=>{
                this.$message({
                    type:'info',
                    message:'已删除'
                })
            })
        }
    },
    filters:{
        filterTime(val){
            return new Date(val).toLocaleString()
        }
    },
    components:{
        uiChange:require('./components/change').default
    }
}
</script>
<style lang="less" scoped>

</style>