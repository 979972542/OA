<template>
    <el-menu 
        class="el-menu-vertical-demo" 
        :default-active="routerActive"
        :router="true">
        <!-- default-active    当前激活菜单的 index -->

        <component 
            v-for="(item,index) in routerList" 
            :is="item.path?'el-menu-item':'el-submenu'"
            :index="item.path?item.path:item.id+''" 
            :key="index">

            <template v-if="item.path">
                <span slot="title">{{item.label}}</span>
            </template>
            
            <template v-else>
                <span slot="title">{{item.label}}</span>
                <el-menu-item 
                    v-for="(ite,ind) in item.children" 
                    :key="ind"
                    :index="ite.path">
                    {{ite.label}}
                </el-menu-item>
            </template>
            
        </component>

    </el-menu>
</template>

<script>
import {getRouter} from '@/api/login.js'
export default {
    data(){
        return{
            routerList:[],
            routerActive:''
        }
    },
    mounted(){
        this.getRouter();
        this.routerActive=this.$route.path
    },
    methods:{
        getRouter(){
            getRouter().then(res=>{
                this.routerList=res.data;
            })
        }
    }
}
</script>

<style lang="less" scoped>
    .el-menu{
        border-right: none;
    }
</style>