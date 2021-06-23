const Controller = require('egg').Controller;

class purviewController extends Controller {
    async getPurviewList() {
        // return
        this.ctx.body = await this.ctx.service.purviewSetting.purview.getPurviewList();
    }

    async purviewAdd(){

        const {body} = this.ctx.request

        this.ctx.body = await this.ctx.service.purviewSetting.purview.purviewAdd(body);
    }

    async purviewTree(){

        this.ctx.body = await this.ctx.service.purviewSetting.purview.purviewTree();
    }

    async purviewData(){
        const params = this.ctx.params
        this.ctx.body = await this.ctx.service.purviewSetting.purview.purviewData(params);
    }

    async purviewEdit(){
        const {body} = this.ctx.request

        this.ctx.body = await this.ctx.service.purviewSetting.purview.purviewEdit(body)
    }

    async purviewDelete(){
        const params = this.ctx.params
        this.ctx.body = await this.ctx.service.purviewSetting.purview.purviewDelete(params)
    }
}

module.exports = purviewController;