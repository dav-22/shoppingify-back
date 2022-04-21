module.exports = (sequelize, type) => {
    return sequelize.define('shopping', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        itemId: {
            type: type.INTEGER,
            allowNull: false,
            references: {
                model: 'items',
                key: 'id'
            },
        },
        count: type.INTEGER,
        listId: {
            type: type.INTEGER,
            allowNull: false,
            references: {
                model: 'lists',
                key: 'id'
            },
        },
        checked: type.INTEGER,
        createdAt: type.DATE,
        updatedAt: type.DATE,
    
    })
}