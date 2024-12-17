const { DataTypes } = require('sequelize');
const sequelize = require('../../../../config/sequelize');

/**
 * New media request model.
 * @author Guy Nicklin
 */
const NewMediaRequestModel = sequelize.define('NewMediaRequest', {
  RequestID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: "unique_new_media_request",
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
      'Periodical',
      'CD',
      'DVD',
      'Game'
    ),
    allowNull: false,
  },
  Reason: {
    type: DataTypes.STRING(255),
    allowNull: true,  
  },
  Date: {
    type: DataTypes.DATE,
    allowNull: false, 
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
}, {
  tableName: 'NewMediaRequest',
  timestamps: false,
});

module.exports = NewMediaRequestModel;
