//We have MANY 'Products' and MANY 'Tags'. The 'ProductTag' 'Model' establishes a relationship between the 'Products' and 'Tags' in our database, assigning a unique 'id' to each instance of a 'product'. For example, if we have a 'Tag' that details that the article of clothing is 'red', and the article of clothing we're referring to is a 'hat', 'red' has an 'id' in the 'Tag' 'Model' and 'hat' has an 'id' in the 'Product' 'Model'. This instance gets an 'id' of its own. And if we changed that to a 'blue' 'hat', the 'ProductTag' 'Model' assigns a uniqu 'id' to the 'red hat' and a unique 'id' to the 'blue hat'. In this way, 'ProductTag' bridges the 'Product' and 'Tag' 'Models'. And this file defines how the data in that overall 'ProductTag' table should be handled.

//Here, we import the 'Model' and 'DataTypes' objects from the 'sequelize' library, which we'll need to work with our 'sequelize' 'models'.
const { Model, DataTypes } = require('sequelize');

//Here, we import the 'sequelize' instance, which enables connection to our database.
const sequelize = require('../config/connection');

//Since 'Tag','Product' and 'ProductTag' are all dependent on each other in order to properly handle their own data, we 'require' the other 2 files and provide a path to them here.
const Tag = require('./Tag')
const Product = require('./ProductTag');

//The below extends 'sequelize's built-in 'Model' 'class'.
class ProductTag extends Model {}

//Here, we have set up the fields and rules for the 'ProductTag' 'Model'.
ProductTag.init(
  {
    //Each of the following 'objects' can be considered columns in our overall table and each has its own set of rules for the data it stores.
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'product',
        key: 'id'
      },
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tag',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
