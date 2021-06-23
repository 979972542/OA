<template>
    <div class="login-page">
        <div class="login-content">
            <h1>登录</h1>
            <div class="mg-medium">
                <input 
                    v-model="form.account" 
                    @blur="blur('account')"
                    type="text"
                    class="border-radius" 
                    placeholder="用户名">
                <span :class="['small',formError.account?'error':'']">请输入用户名</span>
            </div>
            <div class="mg-medium">
                <input 
                    v-model="form.password" 
                    @blur="blur('password')"
                    type="password" 
                    class="border-radius" 
                    placeholder="密码">
                <span :class="['small',formError.password?'error':'']">请输入密码</span>
            </div>
            <div class="submit mg-medium border-radius pointer" @click="submit">
                登录
            </div>
        </div>
    </div>
</template>

<script>
// import request from '@/utils/http.js'
import {login} from '@/api/login.js'
export default {
    data(){
        return{
            form:{
                account:'123',
                password:'123'
            },
            formError:{
                account:false,
                password:false
            }
        }
    },
    mounted(){
        // console.log(request)
    },
    methods:{
        validate(){
            let bool = true;
            //校验参数是否通过
            //一假既假
            if(!this.form.account){
                bool = false;
                this.formError.account=true;
                // return bool
            }
            if(!this.form.password){
                bool = false;
                this.formError.password=true;
                // return bool
            }
            return bool
        },
        blur(key){
            if(this.form[key]){
                this.formError[key] = false;
            }else{
                this.formError[key] = true;
            }
        },
        submit(){
            if(this.validate()){
                login(this.form).then(res=>{
                    window.localStorage.setItem('token',res.data);
                    this.$message.success(res.message);
                    this.$router.replace('/person');
                })
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .login-page{
        background-color: #00a1d6;
        height: 100vh;
        position: relative;
        .login-content{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-110%);
            h1{
                text-align: center;
                color: #fff;
            }
            input{
                height: 40px;
                width: 400px;
                outline: none;
                border: none;
                padding: 10px;
                box-sizing: border-box;
            }
            .submit{
                width: 400px;
                height: 40px;
                text-align: center;
                background-color: #fff;
                line-height: 40px;
                color: #555;
                border: 1px solid #ccc;
                font-size: 14px;
                &:hover{
                    background-color: #f7f7f7;
                }
            }
            .mg-medium{
                position: relative;
              
            }
            .small{
                font-size: 12px;
                position: absolute;
                left: 0;
                bottom: 0;
                transform: translateY(100%) rotateX(90deg);
                transform-origin: 50% 0;
                color: red;
                transition: transform 0.3s;
                &.error{
                    transform: translateY(100%);
                    
                }
            }
        }
    }
</style>