module.exports = app =>{
    const { router, controller } = app;
    const jwt = app.middleware.jwt();
    router.get('/money-all', controller.moneySetting.money.moneyAll)
    router.put('/money-change', controller.moneySetting.money.moneyChange)
    router.post('/money-add', controller.moneySetting.money.moneyAdd)
    router.post('/money-new-post', controller.moneySetting.money.moneyNewPost)//排序
    router.post('/money-find', controller.moneySetting.money.moneyFind)//查找
} 