module.exports = (sequelize, type) => {
    return sequelize.define('list', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: type.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            },
        },
        name: type.STRING,
        status: type.STRING,
        createdAt: type.DATE,
        updatedAt: type.DATE,
     
    })
}