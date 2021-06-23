<template>
    <el-dialog
        title="添加"
        width="500px"
        :visible.sync="dialog"
        :before-close="handleClose"
        @open="open">
        
        <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

            <el-form-item label="路径" prop="path">
                <el-input v-model="form.path"></el-input>
            </el-form-item>

            <el-form-item label="名称" prop="label">
                <el-input v-model="form.label"></el-input>
            </el-form-item>

            <!-- 下拉的父级 -->
            <el-form-item label="父级" prop="parents">
                <el-select 
                    v-model="form.parents" 
                    clearable 
                    filterable 
                    remote
                    @clear="search"
                    :loading="loading"
                    :remote-method="search">
                    <el-option 
                        v-for="(item,index) in list" :key="index"
                        :value="item.id">
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
import {RouterAll,addRouter,editRouter} from '@/api/router.js'
export default {
    props:{
        value:{},
        editRow:{},//编辑数据 
        isEdit:{},//编辑开关
    },
    data(){
        return{
            form:{
                path:'',
                label:'',
                parents:'',
            },
            rules:{
                label:[{ required: true, message: '名称不能为空', trigger: 'blur' }],
            },
            list:[],
            dialog:false,
            loading:false
        }
    },
    mounted(){
        this.search();
    },
    methods:{
        search(label){
            this.loading = true;
            RouterAll({
                label
            }).then(res=>{
                console.log(res.data);
                this.list = res.data.rows;
                this.loading = false
            })
        },
        submit(){
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    if(this.isEdit){
                        // 看外面有没有isEdit
                        editRouter(Object.assign(this.form,{id:this.editRow.id})).then(res=>{
                            // 用来把几个对象合并到一个对象
                            this.$message.success(res.message);
                            this.dialog = false;
                            this.$emit('init');
                        })
                    }else{
                        addRouter(this.form).then(res=>{
                            this.$message.success(res.message);
                            this.dialog = false;
                            this.$emit('init');
                        })
                    }
                    
                } else {
                    return false;
                }
            });
        },
        exit(){
            this.dialog = false
        },
        day(text){
            console.log(text);
        },

        handleClose(e){
            this.$confirm("确认关闭吗").then(()=>{
                e()
            }).catch(()=>{

            })
        },
        open(){
            this.$nextTick(()=>{
                // this.$nextTick()获取到的值为dom更新之后的值
                //重置表单
                this.$refs['ruleForm'].resetFields();
                if(this.isEdit){
                    this.form.path = this.editRow.path
                    this.form.label = this.editRow.label
                    this.form.parents = this.editRow.parents
                    //把那一列的值传到form[]
                    this.search(this.editRow.parent?this.editRow.parent.label:'')
                }
            })
        },
    },
    watch:{
        value(val){
            this.dialog = val
        },
        dialog(val){
            this.$emit('input',val)
        }
    }
}
</script>
<style lang="less" scoped>

</style>