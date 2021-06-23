const Controller = require('egg').Controller;

class purviewController extends Controller {
    async accountget() {
        // return
        this.ctx.body = await this.ctx.service.purviewSetting.account.accountget();
    }

    async accountadd(){

        const {body} = this.ctx.request

        this.ctx.body = await this.ctx.service.purviewSetting.account.accountadd(body);
    }
    async accountfind(){

        const {body} = this.ctx.request

        this.ctx.body = await this.ctx.service.purviewSetting.account.accountfind(body);
    }
}

module.exports = purviewController;