const { DataTypes } = require('sequelize');
const sequelize = require('../../../../config/sequelize');

const PaymentModel = sequelize.define('Payment', {
  PaymentID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  PaymentType: {
    type: DataTypes.ENUM('Card','PayPal','Klarna'),
    allowNull: false,
  },
  PaymentReason: {
    type: DataTypes.ENUM('Subscription', 'OverduePayment', 'Purchase'),
    allowNull: true,
  },
  Date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  MemberID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Member',
      key: 'MemberID',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  Price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  EmployeeID: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Employee',
      key: 'EmployeeID',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
}, {
  tableName: 'Payment',
  timestamps: false,
  // charset: 'utf8mb4',  // Omit if not needed
  // collate: 'utf8mb4_0900_ai_ci', // Omit if not needed
});

module.exports = PaymentModel;
