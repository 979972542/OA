module.exports = app => {
    const { INTEGER, DATE, STRING } = app.Sequelize;
    const purview = app.model.define('moneys', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        label: STRING,
        money:STRING,
        work_time:STRING,
        late_time:STRING,
        add_time:STRING,
        createdAt: DATE,
        updatedAt: DATE,
        base:STRING,
        special:STRING,
    })
    return purview
}