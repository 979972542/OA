module.exports = app => {
    const { router, controller } = app;
    const jwt = app.middleware.jwt();
    router.get('/router-list', jwt, controller.purviewSetting.router.RouterAll); //获取所有的页面路由
    router.post('/add-router', jwt, controller.purviewSetting.router.addRouter); //添加新路由页面
    router.post('/edit-router', jwt, controller.purviewSetting.router.editRouter); //修改新路由页面
    router.delete('/delete-router/:id', jwt, controller.purviewSetting.router.deleteRouter); //添加新路由页面

    router.get('/purview-list', jwt, controller.purviewSetting.purview.getPurviewList); //获取权限列表
    router.post('/purview-add', jwt, controller.purviewSetting.purview.purviewAdd)//添加
    router.get('/purview-tree', jwt, controller.purviewSetting.purview.purviewTree)//路由树
    router.get('/purview-data/:id', jwt, controller.purviewSetting.purview.purviewData)
    router.put('/purview-edit', jwt, controller.purviewSetting.purview.purviewEdit)//修改
    router.delete('/purview-delete/:id', jwt, controller.purviewSetting.purview.purviewDelete)//删除

    router.get('/account-get',controller.purviewSetting.account.accountget);
    router.post('/account-add',controller.purviewSetting.account.accountadd);
    router.get('/account-find',controller.purviewSetting.account.accountfind);
}