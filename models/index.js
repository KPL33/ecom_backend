//Here, we 'require' the 4 tables of data listed (which reside in our 'models' folder) so that they can be referenced below.
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

//Here, we declare that each 'Product' has 1 'Category' that it 'belongsTo'. Another way to put it is that each 'Product' has a "1-to-1 relationship" with a 'Category'.
Product.belongsTo(Category, {
  
  //Here, we establish that the 'foreignKey' for each 'Product' is accessed by reading the value in the ("primary key") 'id' column in the table named 'Category'. In this way, we get each 'Product' the correct 'id' for the 'Category' to which it belongs.
  foreignKey: 'category_id'
});

//Here, we declare that each 'Category' 'hasMany' 'Product's in it.
Category.hasMany(Product, {
  foreignKey: 'category_id'
});

//Here, we declare that each 'Product' 'belongsToMany' 'Tag's 'through' the intermediate 'Model' called 'ProductTag', which "bridges" the 'Product' and 'Tag' 'Models' through the associations they share.
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id'
});

Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id'
});

//Finally, we 'export' the 'ProductTag' 'Model', so that it can be imported into our 'models/index.js' file.
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag
};
