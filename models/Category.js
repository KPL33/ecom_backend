//Each 'Product' falls under 1 category. This file defines how the 'Category' data of each 'Product' in our database should be handled.

//Here, we import the 'Model' and 'DataTypes' objects from the 'sequelize' library, which we'll need to work with our 'sequelize' 'models'.
const { Model, DataTypes } = require('sequelize');

//Here, we import the 'sequelize' instance, which enables connection to our database.
const sequelize = require('../config/connection.js');

//The below extends 'sequelize's built-in 'Model' 'class'.
class Category extends Model {}

//We call the 'init' method on our 'Category' 'Model', passing the method two objects as arguments: 1) Attributes of the columns 'id' (the 'primaryKey' of this table) and 'category_name' are defined here, showing rules for and what types of data to expect in those columns...
Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  //...and 2) Features and options that we can use on that data by leveraging the 'sequelize' library, including establishing the 'modelName' in a way that 'sequelize' can reference.
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

//Finally, we 'export' the 'Category' 'Model', so that it can be imported into our 'models > index.js' file.
module.exports = Category;
