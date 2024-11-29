const { DataTypes } = require('sequelize');
const sequelize = require('../../../../config/sequelize');

const MediaHistoryModel = sequelize.define('MediaHistory', {
  HistoryID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: "unique_media_history",
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
    allowNull: true,
    references: {
      model: 'Employee',
      key: 'EmployeeID',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL', 
  },
  Active: {
    type: DataTypes.TINYINT(1),
    allowNull: false,
    defaultValue: 1,  
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
