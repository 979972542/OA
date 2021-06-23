const Controller = require('egg').Controller;

class PurviewSettingController extends Controller {
    async RouterAll() {
        const { query } = this.ctx.request;
        this.ctx.body = await this.ctx.service.purviewSetting.router.RouterAll(query)
    }

    async addRouter() {
        const { body } = this.ctx.request
            // {body} : { account: '123', password: '123' }
        if (body.parents && !body.path) {
            // body.parents 子path
            // body.path 父path
            this.ctx.body = {
                status: 402,
                message: '存在父级页面必须需要path'
            }
            return
        }
        this.ctx.body = await this.ctx.service.purviewSetting.router.addRouter(body)
    }

    async editRouter() {
        const { body } = this.ctx.request
            // {body} : { account: '123', password: '123' }
        if (body.parents && !body.path) {
            // body.parents 子path
            // body.path 父path
            this.ctx.body = {
                status: 402,
                message: '存在父级页面必须需要path'
            }
            return
        }
        this.ctx.body = await this.ctx.service.purviewSetting.router.editRouter(body)
    }

    async deleteRouter() {
        const params = this.ctx.params
        console.log(params);
        // params { id: '5' }
        this.ctx.body = await this.ctx.service.purviewSetting.router.deleteRouter(params)
    }
}

module.exports = PurviewSettingController