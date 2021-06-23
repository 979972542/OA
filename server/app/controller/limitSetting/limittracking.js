const Controller = require('egg').Controller;

class LimitController extends Controller {
    async limittracking() {
    this.ctx.body = await this.ctx.service.limitSetting.limittracking.limittracking();
    }
}

module.exports = LimitController