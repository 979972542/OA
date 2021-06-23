module.exports = app => {
    const { INTEGER, DATE, STRING } = app.Sequelize;
    const purview = app.model.define('leaves', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        reason: STRING,
        adopt:STRING,
        label: STRING,
        adopt:INTEGER,
        time: STRING,
        created_time: DATE,
        createdAt: DATE,
        updatedAt: DATE,
    })
    return purview
}