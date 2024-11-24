const { DataTypes } = require('sequelize');
const sequelize = require('../../../../config/sequelize');

const SubscriptionModel = sequelize.define('Subscription', {
    SubscriptionID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    TokenQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    PricePerMonth: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    OverduePricePerDay: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
  }, {
    tableName: 'Subscription',
    timestamps: false,
  });
  
  module.exports = SubscriptionModel;