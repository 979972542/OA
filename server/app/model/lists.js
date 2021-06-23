module.exports = app => {
    const { INTEGER, DATE, STRING } = app.Sequelize;
    const purview = app.model.define('lists', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        label:STRING,
        reason:STRING,
        project_where:STRING,
        createdAt: DATE,
        updatedAt: DATE,
    })
    return purview
}