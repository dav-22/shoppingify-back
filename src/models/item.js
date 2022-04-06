module.exports = (sequelize, type) => {
    return sequelize.define('item', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: type.STRING,
        description: type.STRING,
        image: type.STRING,
        createdAt: type.DATE,
        updatedAt: type.DATE,
    
    })
}