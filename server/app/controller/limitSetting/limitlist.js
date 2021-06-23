const Controller = require('egg').Controller;

class LimitController extends Controller {
    async limitlist() {
        const {body} = this.ctx.request
        this.ctx.body = await this.ctx.service.limitSetting.limitlist.limitlist(body);
    }

    async limitlistadd(){
        const {body} = this.ctx.request
        this.ctx.body = await this.ctx.service.limitSetting.limitlist.limitlistadd(body)
    }

    async limitlistedit(){
        const {body} = this.ctx.request
        this.ctx.body = await this.ctx.service.limitSetting.limitlist.limitlistedit(body)
    }
    
    async limitlistdelete(){
        const params = this.ctx.params
 
        this.ctx.body = await this.ctx.service.limitSetting.limitlist.limitlistdelete(params)
    }
}

module.exports = LimitController