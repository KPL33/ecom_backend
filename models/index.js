//Note: Dane said we don't need to do anything with schema.sql file.

//Already did 'npm i': mysql2, sequelize, express, dotenv

//Check: Do I need to 'require' those in this index.js (or the other one, or neither)?

// import models
//Here, we 'require' the 4 tables of data listed (which reside in our 'models' folder) so that they can be referenced below.
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
//Here, we declare that each 'Product' has 1 'Category' that it 'belongsTo'. Another way to put it is that each 'Product' has a "1-to-1 relationship" with a 'Category'.
Product.belongsTo(Category, {
  //Here, we establish that the 'foreignKey' for each 'Product' is accessed by reading the value in the (primary key) 'id' column, in the table named 'category'. In this way, we get each 'Product' the correct 'id' for the 'category' to which it belongs.
  foreignKey: 'category_id'
});

// Categories have many Products
//This declaration essentially does the opposite of the above, declaring that each 'Category' 'hasMany' 'Product's in it. By usi
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
