const Controller = require('egg').Controller;

class LimitController extends Controller {
    async limitproject() {

    this.ctx.body = await this.ctx.service.limitSetting.limitproject.limitproject();
    }

    async limitprojectadd(){

    const {body} = this.ctx.request

    this.ctx.body = await this.ctx.service.limitSetting.limitproject.limitprojectadd(body);
    }

    async limitprojectedit(){

    const {body} = this.ctx.request

    this.ctx.body = await this.ctx.service.limitSetting.limitproject.limitprojectedit(body);
    }

    async limitprojectdelete(){
        const {body} = this.ctx.request

        this.ctx.body = await this.ctx.service.limitSetting.limitproject.limitprojectdelete(body)
    }
    async limitjudge(){
        const {body} = this.ctx.request
        
        this.ctx.body = await this.ctx.service.limitSetting.limitproject.limitjudge(body)
    }
}

module.exports = LimitController