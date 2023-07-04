// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');
const Tag = require('./Tag')
const ProductTag = require('./ProductTag');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model { }

//Here, we have set up the fields and rules for the 'Product' 'Model'.
Product.init(
  {
    //Each of the following 'objects' can be considered columns in our overall table and each has its own set of rules for the data it stores.
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    //Here, we do want the 'price' to be an 'INTEGER', but we also want control over both its "math base" (10, in our case) and the number of decimals in the price (2).
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      //Here, we allow only 'price' 'value's in that adhere to our "math base" and 'DECIMAL' rules established above.
      validate: {
        isDecimal: true
      }
    },
    //Similar to 'price' we 'validte' that the 'value' 'isNumeric' and give the stored 'stock' data a 'defaultValue'.
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isNumeric: true
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
    
  }
);

Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id',
  as: 'tags',
});

module.exports = Product;
