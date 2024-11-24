const { DataTypes } = require('sequelize');
const sequelize = require('../../../../config/sequelize'); 

const MemberSubscriptionModel = sequelize.define('Member', {
  MemberID: {
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
    allowNull: true, 
  },
  RegisterDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, 
  },
}, {
  tableName: 'Member',
  timestamps: false, 
});

module.exports = MemberSubscriptionModel;
