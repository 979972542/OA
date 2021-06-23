module.exports = app => {
    const { INTEGER, DATE, STRING } = app.Sequelize;
    const purview = app.model.define('trackings', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        label: STRING,
        project_id: STRING,
        createdAt: DATE,
        updatedAt: DATE,
    })
    return purview
}