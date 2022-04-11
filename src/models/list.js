module.exports = (sequelize, type) => {
    return sequelize.define('list', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: type.STRING,
        status: type.STRING,
        createdAt: type.DATE,
        updatedAt: type.DATE,
    
    })
}