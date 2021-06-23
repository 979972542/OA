const Controller = require('egg').Controller;

class MoneyController extends Controller{
    async moneyAll(){
        const {body} = this.ctx.request
    this.ctx.body = await this.ctx.service.money.money.moneyAll(body)
    }
    async moneyChange(){
        const {body} = this.ctx.request
        // console.log(body);
        this.ctx.body = await this.ctx.service.money.money.moneyChange(body)
    }
    async moneyAdd(){
        const {body} = this.ctx.request
        this.ctx.body = await this.ctx.service.money.money.moneyAdd(body)
    }
    async moneyNewPost(){
        const {body} = this.ctx.request

        this.ctx.body = await this.ctx.service.money.other.moneyNewPost(body)
    }
    async moneyFind(){
        const {body} = this.ctx.request

        this.ctx.body = await this.ctx.service.money.other.moneyFind(body)
    }
}

module.exports = MoneyController