module.exports = app => {
    const { INTEGER, DATE, STRING } = app.Sequelize;
    const purview = app.model.define('moreworks', {
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
        festival:STRING,
        created_time: DATE,
        createdAt: DATE,
        updatedAt: DATE,
    })
    return purview
}