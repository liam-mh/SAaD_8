const { DataTypes } = require('sequelize');
const sequelize = require('../../../../config/sequelize');

const MemberSubscriptionModel = sequelize.define('MemberSubscription', {
  MemberID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: 'unique_subscription',
    references: {
      model: 'Member',
      key: 'MemberID',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  SubscriptionID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: 'unique_subscription',
    references: {
      model: 'Subscription',
      key: 'SubscriptionID',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  SubscriptionDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  RemainingTokens: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
  OverdueDebt: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00,
    validate: {
      min: 0,
    },
  },
}, {
  tableName: 'MemberSubscription',
  timestamps: false,
});

module.exports = MemberSubscriptionModel;
