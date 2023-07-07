//Note: Dane said we don't need to do anything with schema.sql file.

//Already did 'npm i': mysql2, sequelize, express, dotenv

//Check: Do I need to 'require' those in this index.js (or the other one, or neither)?

//Here, we 'require' the 4 tables of data listed (which reside in our 'models' folder) so that they can be referenced below.
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

//Here, we declare that each 'Product' has 1 'Category' that it 'belongsTo'. Another way to put it is that each 'Product' has a "1-to-1 relationship" with a 'Category'.
Product.belongsTo(Category, {
  
  //Here, we establish that the 'foreignKey' for each 'Product' is accessed by reading the value in the (primary key) 'id' column, in the table named 'category'. In this way, we get each 'Product' the correct 'id' for the 'category' to which it belongs.
  foreignKey: 'category_id'
});

//This declaration essentially does the opposite of the above, declaring that each 'Category' 'hasMany' 'Product's in it.
Category.hasMany(Product, {
  foreignKey: 'category_id'
});

//Here, we declare that each 'Product' 'belongsToMany' 'Tag's 'through' the intermediate 'Model' 'ProductTag', which serves as a "bridge", holding the associations shared by the 'Product' and 'Tag' 'Models'.
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
