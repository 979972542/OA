import Vue from 'vue'
import VueRouter from 'vue-router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import layout from '@/layout/index.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('@/views/login/index.vue'),
    },
    {
        // 个人中心
        path: '/',
        component: layout,
        children: [{
            path: 'person',
            component: () =>
                import ('@/views/person/index.vue')
        }]
    },
    {
        // 账号列表
        path: '/',
        component: layout,
        children: [{
            path: 'account',
            component: () =>
                import ('@/views/account/index.vue')
        }]
    },
    {
        //路由列表
        path: '/',
        component: layout,
        children: [{
            path: 'router-list',
            component: () =>
                import ('@/views/router/index.vue')
        }]
    },
    {
        //权限列表
        path: '/',
        component: layout,
        children: [{
            path: 'purview-list',
            component: () =>
                import ('@/views/purview/index.vue')
        }]
    },
    {
        //账号列表
        path: '/',
        component: layout,
        children: [{
            path: 'account',
            component: () =>
                import ('@/views/account/index.vue')
        }]
    },
    {
        // 放假审核
        path: '/',
        component: layout,
        children: [{
            path: 'limit-leaves',
            component: () =>
                import ('@/views/limit/examine/leaves.vue')
        }]
    },
    {
        // 加班审核
        path: '/',
        component: layout,
        children: [{
            path: 'limit-morework',
            component: () =>
                import ('@/views/limit/examine/morework.vue')
        }]
    },
    {
        // 项目列表
        path: '/',
        component: layout,
        children: [{
            path: 'project',
            component: () =>
                import ('@/views/limit/process/project.vue')
        }]
    },
    {
        // 跟踪列表
        path: '/',
        component: layout,
        children: [{
            path: 'tracking-project',
            component: () =>
                import ('@/views/limit/process/tracking.vue')
        }]
    },
    {
        // 工资列表
        path: '/',
        component: layout,
        children: [{
            path: 'money',
            component: () =>
                import ('@/views/money/index.vue')
        }]
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    nprogress.start();
    next();
})

router.afterEach(() => {
    nprogress.done();
})

export default router