const Service = require('egg').Service;

class OtherService extends Service{
    async moneyNewPost(body){
     const arr = await this.ctx.model.Moneys.findAll({
        attributes: ['id', 'label', 'money','work_time', 'add_time','late_time', 'base','special']
     })
    const ID = arr.map((ro)=>{
         return ro.dataValues.id
     })
    const AddTime = arr.map((ro)=>{
        return ro.dataValues.add_time
    })
    const LateTime = arr.map((ro)=>{
        return ro.dataValues.late_time
    })
    const MONEY = arr.map((ro)=>{
        return ro.dataValues.money
    })
    if(body.Value1 == 'id'){
        var need = ID
    }
    if(body.Value1 == '工资'){
        var need = MONEY
    }
    if(body.Value1 == '加班时间'){
        var need = AddTime
    }
    if(body.Value1 == '请假时间'){
        var need = LateTime
    }
    // 反向（从后到前）
    if(body.other == 2){
        var max
        for(var i=0; i<need.length; i++){
            for(var j=i; j<need.length; j++){
                if(need[i]<need[j]){
        　　　　　　 max=need[j];
                    need[j]=need[i];
                    need[i]=max;
                    }
                }
            }
    }
    //  
    // 正向（从前到后）
    if(body.other == 1){
        var mini
        for(var i=0; i<need.length; i++){
            for(var j=i; j<need.length; j++){
                if(need[i]>need[j]){
        　　　　　　 mini=need[j];
                    need[j]=need[i];
                    need[i]=mini;
                }
            }
        }
    }
    // 
    const Data= need.map(row=>{
        const newArr = arr.find(val=>{

            if(val.dataValues.id == row && body.Value1 == 'id'){
                 var Arr = val.dataValues
            }
            if(val.dataValues.money == row && body.Value1 == '工资'){
                var Arr = val.dataValues
            }
            if(val.dataValues.add_time == row && body.Value1 == '加班时间'){
                var Arr = val.dataValues
            }
            if(val.dataValues.late_time == row && body.Value1 == '请假时间'){
                var Arr = val.dataValues
            }

            return Arr
         })
         return newArr
     })
     return{
         status:200,
         data:Data
     }   
    }

    async moneyFind(body){
        const arr = await this.ctx.model.Moneys.findAll({
            attributes: ['id', 'label', 'money', 'work_time', 'add_time','late_time', 'base','special']
        })
        const Find = arr.find(r=>{
            if( r.dataValues.id == body.input||
                r.dataValues.label == body.input||
                r.dataValues.money == body.input
                ){
                var zh = []
                zh = r.dataValues
                return zh
            }else{
                return {
                    status:402,
                    message:'请输入正确的id,姓名或工资'
                }
            }
            
        })
        return{
            status:200,
            data:Find,
            message:'查询成功'
        }
    }
}

module.exports = OtherService;