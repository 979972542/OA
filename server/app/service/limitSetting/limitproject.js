const Service = require('egg').Service;

class LimitSettingService extends Service {
    async limitproject() {
        const list = await this.ctx.model.Projects.findAll({
            attributes: ['id', 'project', 'time', 'created_at', 'adopt', 'bonus', 'project_list', 'reason']
        })
        return {
            status: 200,
            data: list
        }
    }
    async limitprojectadd({ project, adopt, value, time, bonus }) {
        console.log(111);
        const name = await this.ctx.model.Projects.findOne({
            where: {
                project
            }
        })
        console.log('hhh');
        if (name) {
            return {
                status: 402,
                message: '有重复的项目'
            }
        }
        if (value == false) {
            adopt = 0
        }
        if (value == true) {
            adopt = 1
        }
        const list = await this.ctx.model.Projects.create({
            project,
            time,
            adopt,
            bonus,
        })
        return {
            status: 200,
            data: list,
            message: '添加成功'
        }
    }
    async limitprojectedit(body) {

        const list = await this.ctx.model.Projects.update({
            project: body.project,
            time: body.time,
            bonus: body.bonus,
            adopt: body.adopt
        }, {
            where: {
                id: body.id
            }
        })
        return {
            status: 200,
            data: list,
            message: '修改成功'
        }
    }

    async limitprojectdelete({ project, id }) {
        const Label = await this.ctx.model.Lists.findAll({
            attributes: ['label', 'project_where', 'id']
        })
        var status_list = []
        Label.forEach(ro => {
            if (ro.dataValues.project_where == project) {
                status_list = 201
            }
        })
        if (status_list == 201) {
            await this.ctx.model.Lists.destroy({
                where: {
                    project_where: project
                }
            })
            await this.ctx.model.Projects.destroy({
                where: {
                    id
                }
            })
            return {
                status: 201,
                message: '删除成功'
            }
        }

        await this.ctx.model.Projects.destroy({
            where: {
                id
            }
        })
        return {
            status: 200,
            message: '删除成功'
        }
    }
    async limitjudge({ project_where }) {
        const list = await this.ctx.model.Lists.findOne({
            where: {
                project_where
            }
        })
        if (list) {
            return {
                status: 201
            }
        } else {
            return {
                status: 200
            }
        }
    }
}
module.exports = LimitSettingService