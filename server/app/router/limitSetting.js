module.exports = app => {
    const { router, controller } = app;
    router.get('/limit-leaves', controller.limitSetting.limitleaves.limitleaves)
    router.post('/limit-leaves-add', controller.limitSetting.limitleaves.limitleavesAdd)
    router.put('/limit-leaves-edit', controller.limitSetting.limitleaves.limitleavesEdit)

    router.get('/limit-morework', controller.limitSetting.limitmorework.limitmorework)
    router.post('/limit-morework-add', controller.limitSetting.limitmorework.limitmoreworkAdd)
    router.put('/limit-morework-edit', controller.limitSetting.limitmorework.limitmoreworkEdit)

    router.get('/limit-project', controller.limitSetting.limitproject.limitproject)
    router.post('/limit-project-add',controller.limitSetting.limitproject.limitprojectadd)
    router.put('/limit-project-edit',controller.limitSetting.limitproject.limitprojectedit)
    router.post('/limit-project-delete', controller.limitSetting.limitproject.limitprojectdelete)
    router.post('/limit-judge', controller.limitSetting.limitproject.limitjudge)

    router.get('/limit-tracking', controller.limitSetting.limittracking.limittracking)

    router.post('/limit-list', controller.limitSetting.limitlist.limitlist)
    router.post('/limit-list-add', controller.limitSetting.limitlist.limitlistadd)
    router.put('/limit-list-edit', controller.limitSetting.limitlist.limitlistedit)
    router.delete('/limit-list-delete/:id', controller.limitSetting.limitlist.limitlistdelete)
}