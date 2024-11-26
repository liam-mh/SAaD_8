const { DataTypes } = require('sequelize');
const sequelize = require('../../../../config/sequelize');

const MediaHistoryModel = sequelize.define('MediaHistory', {
  HistoryID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  MediaID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Media',
      key: 'MediaID',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  BranchID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Branch',
      key: 'BranchID',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  EmployeeID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Employee',
      key: 'EmployeeID',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL', // assuming employee can be removed but history remains
  },
  Active: {
    type: DataTypes.TINYINT(1),
    allowNull: false,
    defaultValue: 1,  // Assuming '1' for active and '0' for inactive
  },
  RentStart: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  RentEnd: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  ActualReturn: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'MediaHistory',
  timestamps: false,
});

module.exports = MediaHistoryModel;
