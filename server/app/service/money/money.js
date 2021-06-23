const Service = require('egg').Service

class MoneyService extends Service {
    async moneyAll({pageSize,pageNum}) {
        console.log(pageSize ,pageNum);
        // 
        let limit = 5;
        let offset = 0;

        if (pageNum && pageSize) {
            console.log(1);
            limit = +pageSize; //查几条
            offset = pageSize * (pageNum - 1) //忽略几条  从0开始
        }
        // 
        console.log(2);
        return {
            status: 200,
            data:await Promise.all([
                this.ctx.model.Moneys.findAll({
                    attributes: ['id', 'label', 'money', 'work_time', 'add_time','late_time', 'base','special']
                }),
                // late_time
                this.ctx.model.Leaves.findAll({
                    attributes: ['time', 'label','adopt']
                }),
                // 
                // add_time
                this.ctx.model.Moreworks.findAll({
                    attributes:['time','label','festival','adopt']
                }),
                //
            ]).then(([Moneys, Leaves,Moreworks]) => {
                const arr = Moneys.map((val) => {
                    return val.dataValues
                })
                // late_time
                const arr2 = Leaves.map((val) => {
                    return val.dataValues
                })
                // 
                // add_time
                const arr3 = Moreworks.map((val)=>{
                    return val.dataValues
                })
                // 
                // late_time
                arr.forEach((ro) => {
                    let list = arr2.map((row) => {
                        if (ro.label == row.label && row.adopt == 1) {
                            var add = []
                            add = row.time
                        }
                        return add
                    })
                    for (var i = 0; i < list.length; i++) {
                        if (list[i] == undefined) {
                            list.splice(i, 1);
                            i = i - 1; // i - 1 ,因为空元素在数组下标 2 位置，删除空之后，后面的元素要向前补位，
                            // 这样才能真正去掉空元素,觉得这句可以删掉的连续为空试试，然后思考其中逻辑
                        }
                    }
                    //
                    var sum = eval(list.join('+'))
                    if(sum){
                        ro.late_time = sum
                    }else{
                        ro.late_time = 0
                    }
                })
                // 
                // add_time
                arr.forEach((ro) => {
                    let list2 = arr3.map((row) => {
                        if (ro.label == row.label && row.festival == 0 &&row.adopt == 1) {
                            var add = []
                            add = row.time
                            return add
                        }else{
                            return false
                        }
                    })
                    let list3 = arr3.map((row)=>{
                        if (ro.label == row.label && row.festival == 1 &&row.adopt == 1) {
                            var add2 = []
                            add2 = row.time
                            return add2
                        }else{
                            return false
                        }
                    })
                    for (var i = 0; i < list2.length; i++) {
                        if (list2[i] == false) {
                            list2.splice(i, 1);
                            i = i - 1;
                        }
                    }
                    for (var i = 0; i < list3.length; i++) {
                        if (list3[i] == false) {
                            list3.splice(i, 1);
                            i = i - 1;
                        }
                    }
                    var sum = eval(list2.join('+'))
                    var sum_special = eval(list3.join('+'))
                    if(sum){
                        ro.add_time = sum
                    }else{
                        ro.add_time = 0
                    }
                    // 
                    if(sum_special){
                        ro.special = sum_special
                    }else{
                        ro.special = 0
                    }
                    // 
                })
                // 
                // money(计算工资)
                arr.forEach((ro) => {
                    var late = []
                    var add = []
                    var add2 = []
                    var late_money = 10//请假扣的时薪
                    var add_money = 5//加班时薪
                    var add2_money = 10//节假日时薪
                    // 请假
                    if(ro.late){
                        late = ro.late_time *late_money
                    }else{
                        late = 0
                    }
                    // 
                    // 加班
                    if(ro.add_time){
                        add = ro.add_time *add_money
                    }else{
                        add = 0
                    }
                    //
                    // 假日加班
                    if(ro.special){
                        add2 = ro.special *add2_money
                    }else{
                        add2 = 0
                    }
                    //  
                    ro.money = ro.base -late +add+add2
                })
                return arr 
            })
        }
    }
    async moneyChange(body){
        await this.ctx.model.Moneys.update({
            label:body.label,
            money:body.money,
            work_time:body.work_time,
            add_time:body.add_time,
            late_time:body.late_time,
            special:body.special
        },{where:{
            id:body.id,
        }})
        return{
            status:200,
        }
    }

    async moneyAdd(body){
        const add = await this.ctx.model.Moneys.create({
            label:body.label,
            base:body.base
        })
        return{
            status:200,
            data:add,
            message:'添加成功'
        }
    }
}
module.exports = MoneyService