const { DataTypes } = require('sequelize');
const sequelize = require('../../../../config/sequelize');

const WishlistModel = sequelize.define('Wishlist', {
  WishlistID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: "unique_wishlist",
    autoIncrement: true,
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
  DateTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  WishType: {
    type: DataTypes.ENUM('Wishlist', 'Reservation'),
    allowNull: false,
  },
}, {
  tableName: 'Wishlist',
  timestamps: false,
});

module.exports = WishlistModel;
