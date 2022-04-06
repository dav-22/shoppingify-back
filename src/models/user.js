module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: type.STRING,
        surName: type.STRING,
        email: type.STRING,
        createdAt: type.DATE,
        updatedAt: type.DATE,
    
    })
}