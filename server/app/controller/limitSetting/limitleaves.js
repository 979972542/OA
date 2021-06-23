const Controller = require('egg').Controller;

class LimitController extends Controller {
    async limitleaves() {
        this.ctx.body = await this.ctx.service.limitSetting.limitleaves.limitleaves();
    }
    async limitleavesAdd() {
        const { body } = this.ctx.request;
        this.ctx.body = await this.ctx.service.limitSetting.limitleaves.limitleavesAdd(body)
    }
    async limitleavesEdit(){
        const {body} = this.ctx.request;
        
        this.ctx.body = await this.ctx.service.limitSetting.limitleaves.limitleavesEdit(body)
    }
}

module.exports = LimitController