const { DataTypes } = require('sequelize');
const sequelize = require('../../../../config/sequelize'); 
const bcrypt = require('bcrypt');

/**
 * Member model
 * @author Guy Nicklin
 */

const SALT_ROUNDS = 10;

const MemberModel = sequelize.define('Member', {
  MemberID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: "unique_member",
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
    unique: "unique_member", 
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
    unique: "unique_member",
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
  hooks: {
    // Hash on create.
    beforeCreate: async (member) => {
      if (member.Password) {
        const hashedPassword = await bcrypt.hash(member.Password, SALT_ROUNDS);
        member.Password = hashedPassword;
      }
    },
    // Hash on update.
    beforeUpdate: async (member) => {
      if (member.Password) {
        const hashedPassword = await bcrypt.hash(member.Password, SALT_ROUNDS);
        member.Password = hashedPassword;
      }
    },
  },
});

// Hashed password validation.
MemberModel.prototype.validatePassword = async function (password) {
  
  return bcrypt.compare(password, this.Password);
};

module.exports = MemberModel;
