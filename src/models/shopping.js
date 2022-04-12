module.exports = (sequelize, type) => {
    return sequelize.define('shopping', {
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
        itemId: {
            type: type.INTEGER,
            allowNull: false,
            references: {
                model: 'items',
                key: 'id'
            },
        },
        createdAt: type.DATE,
        updatedAt: type.DATE,
    
    })
}