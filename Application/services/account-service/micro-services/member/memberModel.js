const { DataTypes } = require('sequelize');
const sequelize = require('../../../../config/sequelize'); // Import sequelize instance

// Data object for Member table

const Member = sequelize.define('Member', {
  MemberID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  FirstName: DataTypes.STRING(100),
  Surname: DataTypes.STRING(100),
  Email: {
    type: DataTypes.STRING(255),
    validate: {
      isEmail: true,
    },
  },
  Password: DataTypes.STRING(255),
  FirstLineAddress: DataTypes.STRING(255),
  City: DataTypes.STRING(100),
  Postcode: DataTypes.STRING(20),
  BranchID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Branch',
      key: 'BranchID',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  RegisterDate: DataTypes.DATE,
}, {
  tableName: 'Member',
  timestamps: false,
});

module.exports = Member;