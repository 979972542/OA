const Service = require('egg').Service;

class LimitSettingService extends Service {
    async limitmorework() {
        const list = await this.ctx.model.Moreworks.findAll({
            attributes: ['id', 'label', 'time', 'reason', 'created_at', 'created_time','adopt','festival']
        })
        return {
            status: 200,
            data: list
        }
    }

    async limitmoreworkAdd({label,time,reason,created_time,value,adopt,Value1,festival,festival_value}) {
        const list = await this.ctx.model.Moreworks.findOne({
            where:{
                label
            }
        })
        // 单位
        if(Value1 == '时'){
            time = time
            console.log(time,0);
        }
        if(Value1 =='天'){
            time = time*8
            console.log(time,9);
        }
        if(Value1 == '周'){
            time = time*40
            console.log(time,8);
        }
        // 
        // 审核通过
        if(value == true){
            adopt = 1
         }
         if(value == false){
            adopt = 0
         }
        //
        if(festival_value == true){
            festival = 1
         }
         if(festival_value == false){
            festival = 0
         } 
        //  
        if (list && adopt == 0) {
            this.ctx.status = 402
            return {
                status: 402,
                message: `存在未审核的申请`
            }
        }
        // 
        const add = await this.ctx.model.Moreworks.create({
            label,
            time,
            reason,
            created_time,
            adopt,
            festival
        })

        return {
            status: 200,
            data: add,
            message: "申请添加成功"
        }
    }
    async limitmoreworkEdit(body){
        if(body.Value1 == '时'){
            body.time = body.time
        }
        if(body.Value1 =='天'){
            body.time = body.time*8
        }
        if(body.Value1 == '周'){
            body.time = body.time*40
        }
        // 
        if(body.value == true){
            body.adopt = 1
         }
         if(body.value == false){
            body.adopt = 2
         }
        //  
        // 
         if(body.festival_value == true){
            body.festival = 1
         }
         if(body.festival_value == false){
            body.festival = 0
         } 
        //  
        await this.ctx.model.Moreworks.update({
           label:body.label,
           time:body.time,
           created_time:body.created_time,
           reason:body.reason,
           adopt:body.adopt,
           festival:body.festival
        },{where:{
            id:body.id
        }})
        return{
            status:200,
            message:"修改成功"
        }
    }
}
module.exports = LimitSettingService