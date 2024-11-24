const { DataTypes } = require('sequelize');
const sequelize = require('../../../../config/sequelize');

const EmployeeModel = sequelize.define('Employee', {
  EmployeeID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  FirstName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  Surname: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  Password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  FirstLineAddress: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  City: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  Postcode: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  BranchID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Branch',
      key: 'BranchID',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  Role: {
    type: DataTypes.ENUM(
      'Librarian',
      'BranchManager',
      'Administrator',
      'CallCentreOperator',
      'Accountant',
      'PurchaseManager',
      'SystemAdministrator'
    ),
    allowNull: false,
  },
}, {
  tableName: 'Employee',
  timestamps: false,
});

module.exports = EmployeeModel;
