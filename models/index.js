//Note: Dane said we don't need to do anything with schema.sql file.

//Already did 'npm i': mysql2, sequelize, express, dotenv

//Check: Do I need to 'require' those in this index.js (or the other one, or neither)?

//Don't forget... we are using SEQUELIZE, not just sql.

// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
//Each product has 1 category
Product.belongsTo(Category, {
  foreignKey: 'category_id'
});

// Categories have many Products
//1 category has many products
Category.hasMany(Product, {
  foreignKey: 'category_id'
});

//Note: It is possible that the foreignKey of 1 of the above 2 is incorrect (prob for 'Category'), although Dane did specifically say to use category_id.

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id'
});
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
