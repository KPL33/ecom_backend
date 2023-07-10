//We have MANY 'Products' and MANY 'Tags'. The 'ProductTag' 'Model' establishes a relationship between the 'Products' and 'Tags' in our database, assigning a unique 'id' to each instance of a 'Product' and 'Tag' pairing. For example, if we have a 'Tag' that describes 'blue', and the 'Product' we're referring to is a 'hat', 'blue' has an 'id' in the 'Tag' 'Model' and 'hat' has an 'id' in the 'Product' 'Model'. This instance (a 'blue hat') gets an 'ProductTag' 'id' of its own. And if we changed that to a 'green' 'hat', the 'ProductTag' 'Model' assigns another unique 'id' to the 'green hat'. In this way, 'ProductTag' bridges the 'Product' and 'Tag' 'Models'. And this file defines how the data in that overall 'ProductTag' table should be handled.

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

//Finally, we 'export' the 'ProductTag' 'Model', so that it can be imported into our 'models/index.js' file.
module.exports = ProductTag;
