
const Sequelize = require('sequelize');
const CategoryModel = require('./models/category');
const ItemModel = require('./models/item');
const UserModel = require('./models/user');

const sequelize = new Sequelize(
    process.env.DATABASE, 
    process.env.USER, 
    process.env.PASSWORD, 
    {
        host: process.env.HOST,
        dialect: 'mysql'
    }
);

const Category = CategoryModel(sequelize, Sequelize);
const Item = ItemModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);

sequelize.sync({ force: false })
    .then(() => {
        console.log('Tabla sincronizadas');
    })

module.exports = {
    Category,
    Item,
    User
}