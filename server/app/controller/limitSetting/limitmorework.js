const Controller = require('egg').Controller;

class LimitController extends Controller {
    async limitmorework() {
        this.ctx.body = await this.ctx.service.limitSetting.limitmorework.limitmorework();
    }
    async limitmoreworkAdd() {
        const { body } = this.ctx.request;
        console.log(body);
        this.ctx.body = await this.ctx.service.limitSetting.limitmorework.limitmoreworkAdd(body)
    }
    async limitmoreworkEdit(){
        const {body} = this.ctx.request;
        
        this.ctx.body = await this.ctx.service.limitSetting.limitmorework.limitmoreworkEdit(body)
    }
}

module.exports = LimitController