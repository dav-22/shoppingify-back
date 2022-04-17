
const Sequelize = require('sequelize');
const CategoryModel = require('./models/category');
const ItemModel = require('./models/item');
const UserModel = require('./models/user');
const ListModel = require('./models/list');
const ShoppingModel = require('./models/shopping');

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
const List = ListModel(sequelize, Sequelize);
const Shopping = ShoppingModel(sequelize, Sequelize);

//BEGIN RELATIONS
Item.belongsTo(Category, {as: 'category'});

Category.hasMany(Item, {as: 'items'});

List.hasMany(Shopping, {as: 'shoppingLists'});

Shopping.belongsTo(Item, {as: 'item'});
//END RELATIONS


sequelize.sync({ force: false })
    .then(() => {
        console.log('Tabla sincronizadas');
    })

module.exports = {
    Category,
    Item,
    User,
    List,
    Shopping
}