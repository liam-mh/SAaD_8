const { DataTypes } = require('sequelize');
const sequelize = require('../../../../config/sequelize');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const EmployeeModel = sequelize.define('Employee', {
  EmployeeID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: "unique_employee"
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
    unique: "unique_employee",
    validate: {
      isEmail: true,
    },
  },
  Password: {
    type: DataTypes.STRING(255),
    allowNull: false,
    //Can hash in her with bcrypt
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
    unique: "unique_employee",
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
EmployeeModel.prototype.validatePassword = async function (password) {
  
  return bcrypt.compare(password, this.Password);
};

module.exports = EmployeeModel;
