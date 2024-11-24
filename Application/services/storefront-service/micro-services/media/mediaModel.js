const { DataTypes } = require('sequelize');
const sequelize = require('../../../../config/sequelize');

const MediaModel = sequelize.define('Media', {
  MediaID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  Type: {
    type: DataTypes.ENUM(
      'Book',
      'Journal',
      'CD',
      'Periodical',
      'DVD',
      'Game'
    ),
    allowNull: false,
  },
  Description: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  PublishDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  Author: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  Genre: {
    type: DataTypes.ENUM(
      'Fiction',
      'Non-Fiction',
      'Action',
      'Fantasy',
      'Biography',
      'Thriller',
      'History',
      'Educational',
      'Entertainment',
      'Art & Culture'
    ),
    allowNull: true,
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
}, {
  tableName: 'Media',
  timestamps: false,
});

module.exports = MediaModel;
