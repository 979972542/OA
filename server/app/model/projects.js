module.exports = app => {
    const { INTEGER, DATE, STRING } = app.Sequelize;
    const purview = app.model.define('projects', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        project: STRING,
        time: STRING,
        bonus:STRING,
        adopt:STRING,
        project_list:STRING,
        createdAt: DATE,
        updatedAt: DATE,
    })
    return purview
}