'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orderitem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      orderitem.hasMany(models.ordertopping, {
        as: "toppings",
        foreignKey: {
          name: "orderId"
        }
      })
    }
  };
  orderitem.init({
    transactionId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    image: DataTypes.STRING,
    qty: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'orderitem',
  });
  return orderitem;
};