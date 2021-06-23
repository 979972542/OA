const Service = require('egg').Service;
const Sequelize = require('sequelize')

class PurviewSettingService extends Service {
    async RouterAll({ page, pageSize, label }) {
        let limit = 20;
        let offset = 0;

        if (page && pageSize) {
            limit = +pageSize; //查几条
            offset = pageSize * (page - 1) //忽略几条  从0开始
        }

        let where = {};
        // 用来存放label的值

        if (label) {
            where.label = {
                [sequelize.Op.like]: `%${label}%`
            }
        }

        return {
            status: 200,
            data: await this.ctx.model.Routers.findAndCountAll({
                where,
                limit,
                offset,
                attributes: ['id', 'path', 'label', 'parents', 'created_at']
                    // 显示
            }).then(async res => {
                for (const row of res.rows) {
                    // 用for不能foreach
                    if (row.dataValues.parents) {
                        // 如果parents里有不为空
                        row.dataValues.parent = await this.ctx.model.Routers.findOne({
                            where: {
                                id: row.dataValues.parents
                                    // 找父元素id
                            }
                        })
                    }
                }
                return res
                    // 把找到的id返回
            })
        }
    }
    async addRouter(body) {
            const message = await this.valid(body)
                // const message = body
            if (message) return message
            await this.ctx.model.Routers.create({
                path: body.path ? body.path : null,
                label: body.label ? body.label : null,
                parents: body.parents ? body.parents : null
            })
            return {
                status: 200,
                message: "添加成功"
            }
        }
        /**
         * 
         * @param {Object} body 
         * @returns {
         *      status:状态码
         *      message:提示信息
         * }
         */
    async editRouter(body) {
        const message = await this.valid(body, true)
            // const message = body
        if (message) return message
        await this.ctx.model.Routers.update({
            path: body.path ? body.path : null,
            label: body.label ? body.label : null,
            parents: body.parents ? body.parents : null
        }, {
            where: {
                id: body.id
            }
        })
        return {
            status: 200,
            message: "修改成功"
        }
    }

    async valid(body, edit = false) {
        let where = {
            label: body.label
                // 找到label
                // body 由其各个引入
        }
        if (edit) {
            where.id = {
                [Sequelize.Op.ne]: body.id
                    // id != body.id
            }
        }
        const find = await this.findRouter(where)
        if (find) {
            this.ctx.status = 402;
            return {
                status: 402,
                message: '存在相同的页面名称'
            }
        }
        where = {
            path: body.path
        }
        if (edit) {
            where.id = {
                [Sequelize.Op.ne]: body.id
            }
        }
        // 查path是否相同
        const findPath = await this.findRouter(where)
        if (findPath) {
            this.ctx.status = 402;
            return {
                status: 402,
                message: '存在相同的页面路径'
            }
        }
        let parents
            // 查父id是否相同
        if (body.parents) {
            parents = await this.findRouter({
                id: body.parents
            })
        }
        if (!parents && body.path && body.parents) {
            // 
            // 是否有path
            // 是否有父id
            this.ctx.status = 402;
            return {
                status: 402,
                message: '不存在该父级页面'
            }
        }
        // 
        // 
        if (parents && parents.dataValues.parents) {
            // 有子id
            // 连着的子那一条 有子id
            this.ctx.status = 402;
            return {
                status: 402,
                message: '该父级页面又存在父级，不允许嵌套'
            }
        }
        if (parents && parents.dataValues.path) {
            // 有子id
            // 连着的子那一条 有path
            this.ctx.status = 402;
            return {
                status: 402,
                message: '该为父级页面，不允许嵌套'
            }
        }
        // 
    }


    async findRouter(where) {
        // where = {body.path}
        return this.ctx.model.Routers.findOne({
            // findOne 方法获得它找到的第一个条目
            where
        })
    }

    async deleteRouter({ id }) {
        //  {id} 是 params 结构出来的id
        //  id 5
        id = +id
        console.log(id);
        const find = await this.ctx.model.Routers.findOne({
            where: {
                id
            }
        })
        console.log("111");
        if (!find) {
            this.ctx.state = 402
            return {
                state: 402,
                message: "不存在该角色id"
            }
        }

        console.log("000");
        this.ctx.model.Routers.destroy({
            where: { id }
        })
        return {
            state: 200,
            message: "删除成功"
        }
    }
}

module.exports = PurviewSettingService