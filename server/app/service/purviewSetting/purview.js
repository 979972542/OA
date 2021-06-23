const Service = require('egg').Service;
const Sequelize = require('Sequelize')

class PurviewService extends Service {
    async getPurviewList() {
        return {
            status: 200,
            data: await Promise.all([
                    this.ctx.model.Purviews.findAll({
                        // Promise.all 变为一个数组输出
                        attributes: ['id', 'purview', 'routerId', 'created_at']
                    }),
                    this.ctx.model.Routers.findAll({
                        attributes: ['id', 'path', 'label', 'parents']
                    })
                ])
                .then(([Purviews, Routers]) => {
                    Purviews.forEach(row => {
                        if (row.dataValues.routerId == 0) {
                            row.dataValues.router = [] //没有限制
                                // 超管
                        }
                        // 不是超管的时候
                        let router = []
                        const arr = row.dataValues.routerId.split(',');

                        arr.forEach(ro => {
                            router.push(Routers.find(r => r.dataValues.id == ro) /* 找对应的数据 */ )
                        })

                        // 找到对应id后传入对应的路由=>显示出来
                        row.dataValues.router = router
                    })
                    console.log(Purviews,123);
                    return Purviews
                        // 返回去data
                })
        }
    }

    async purviewAdd({ purview, router }) {
        await this.ctx.model.Purviews.create({
            purview,
            routerId: router.join(',')
                // join() 方法用于把数组中的所有元素放入一个字符串。
        })
        return {
            message: '新增成功',
            status: 200
        }
    }

    async purviewTree() {
        const list = await this.ctx.model.Routers.findAll({
            attributes: ['id', 'path', 'label', 'parents']
        })
        const tree = list.filter(row => row.dataValues.parents == null) //找头
        const other = list.filter(row => row.dataValues.parents != null) //找尾
        other.forEach(val => {
            const find = tree.find(ro => ro.dataValues.id === val.dataValues.parents)
            if (find.dataValues.children) {
                find.dataValues.children.push(val)
            } else {
                find.dataValues.children = [val]
            }
        })
        return {
            status: 200,
            data: tree,
        }
    }

    async purviewData({ id }) {
        id = +id;
        const purview = await this.ctx.model.Purviews.findOne({
            // Purviews表id 
            where: {
                id
            }
        })
        const list = await this.ctx.model.Routers.findAll({
            attributes: ['id', 'label', 'path', 'parents']
                // Router
        })
        const purviewRouter = purview.dataValues.routerId.split(',')
            // 在上面purview中找到有routerId的
        list.forEach(ro => {
            const find = purviewRouter.find(row => row == ro.dataValues.id)

            if (find) {
                ro.dataValues.check = true
            } else {
                ro.dataValues.check = false
            }
        })
        const tree = list.filter(row => row.dataValues.parents == null) //找头
        const other = list.filter(row => row.dataValues.parents != null) //找尾
        other.forEach(val => {
            const find = tree.find(ro => ro.dataValues.id === val.dataValues.parents)
            if (find.dataValues.children) {
                find.dataValues.children.push(val)
            } else {
                find.dataValues.children = [val]
            }
        })
        purview.dataValues.tree = tree
        return {
            status: 200,
            data: purview,
        }
    }

    async purviewEdit(body) {
        await this.ctx.model.Purviews.update({
            purview: body.purview,
            routerId: body.router.join(',')
        }, {
            where: {
                id: body.id
            }
        })
        return {
            status: 200,
            message: '更新成功'
        }
    }

    async purviewDelete({ id }) {
        id = +id
        await this.ctx.model.Purviews.destroy({
            where: { id }
        })
        return {
            status: 200,
            message: "删除成功"
        }
    }
}

module.exports = PurviewService;