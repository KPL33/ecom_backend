//This file defines how the data of each 'Tag' (AKA, "descriptive details about each 'Product') in our database should be handled.

//Here, we import the 'Model' and 'DataTypes' objects from the 'sequelize' library, which we'll need to work with our 'sequelize' 'models'.
const { Model, DataTypes } = require('sequelize');

//Here, we import the 'sequelize' instance, which enables connection to our database.
const sequelize = require('../config/connection.js');

//Since 'Tag','Product' and 'ProductTag' are all dependent on each other in order to properly handle their own data, we 'require' the other 2 files and provide a path to them here.
const Product = require('./Product')
const ProductTag = require('./ProductTag');

//The below extends 'sequelize's built-in 'Model' 'class'.
class Tag extends Model {}

//We call the 'init' method on our 'Tag' 'Model', passing the method two objects as arguments: 1) Attributes of the columns 'id' (the 'primaryKey' of this table) and 'tag_name' are defined here, showing rules for and what types of data to expect in those columns...
Tag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tag_name: {
      type: DataTypes.STRING
    }
  },
  //...and 2) Features and options that we can use on that data by leveraging the 'sequelize' library, including establishing the 'modelName' in a way that 'sequelize' can reference.
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag'
  }
);

//Finally, we 'export' the 'Tag' 'Model', so that it can be imported into our 'models/index.js' file.
module.exports = Tag;
