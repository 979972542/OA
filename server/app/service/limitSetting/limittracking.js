const Service = require('egg').Service;

class LimitSettingService extends Service {
    async limittracking() {
        const list = await this.ctx.model.Trackings.findAll({
            attributes: ['id', 'label', 'project_id', 'created_at','updated_at']
        })
        return {
            status: 200,
            data: list
        }
    }

}
module.exports = LimitSettingService