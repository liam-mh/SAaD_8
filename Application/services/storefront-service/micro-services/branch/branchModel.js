const { DataTypes } = require('sequelize');
const sequelize = require('../../../../config/sequelize');

const BranchModel = sequelize.define('Branch', {
  BranchID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: "unique_branch",
    autoIncrement: true,
  },
  FirstLineAddress: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  Postcode: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  City: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  OpeningHours: {
    type: DataTypes.STRING(255),  
    allowNull: false,  
  },
}, {
  tableName: 'Branch',
  timestamps: false,
});

module.exports = BranchModel;
