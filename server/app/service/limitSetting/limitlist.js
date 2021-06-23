const Service = require('egg').Service;

class LimitSettingService extends Service {
    async limitlist({project}){
        const head = await this.ctx.model.Projects.findOne({
            where:{
                project
            }
        })
        const project_label = head.dataValues.project
        const list = await this.ctx.model.Lists.findAll({
            attributes:['id','label','reason','project_where']
        })
        const Find = list.filter(r=>{
            if(project_label == r.dataValues.project_where){
                var a =[]
                a = r.dataValues
                return a
            }
        })
        return{
            status:200,
            data:Find,
        }
    }

    async limitlistadd({label,reason,project_where,project}){
        const head = await this.ctx.model.Projects.findOne({
            where:{
                project
            }
        })
        project_where = head.dataValues.project
        //
        const Label = await this.ctx.model.Lists.findAll({
            attributes:['label','project_where']
        })
        var status_list = []
        Label.forEach(r=>{
            if(r.dataValues.project_where == project_where 
                && r.dataValues.label == label){
                    status_list = 402
            }
        })
        if(status_list == 402){
            return{
                status:402,
                message:'已有重复任务'
            }
        }
        // 
        const list = await this.ctx.model.Lists.create({
            label,
            reason,
            project_where,
        })
        // 
        return{
            status:200,
            data:list,
            message:'任务创建成功'
        }
    }

    async limitlistedit(body){
        const list = await this.ctx.model.Lists.update({
            label:body.label,
            reason:body.reason,
        },{
          where:{
              id:body.id
          }  
        })
        return{
            status:200,
            data:list,
            message:'修改成功'
        }
    }

    async limitlistdelete({id}){
        id = +id
        await this.ctx.model.Lists.destroy({
            where:{
                id
            }
        })
        return{
            status:200,
            message:'删除成功'
        }
    }
}
module.exports = LimitSettingService