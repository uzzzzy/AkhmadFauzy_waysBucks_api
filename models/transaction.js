'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transaction.belongsTo(models.transactiondetail, {
        as: "userOrder",
        foreignKey: {
          name: "orderDetailId"
        }
      })

      transaction.hasMany(models.orderitem, {
        as: "order",
        foreignKey: {
          name: "transactionId"
        }
      })
    }
  };
  transaction.init({
    userId: DataTypes.INTEGER,
    orderDetailId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};