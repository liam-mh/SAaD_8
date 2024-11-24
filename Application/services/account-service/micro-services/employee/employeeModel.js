const Employee = sequelize.define('Employee', {
    EmployeeID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    FirstName: DataTypes.STRING(100),
    Surname: DataTypes.STRING(100),
    Email: {
        type: DataTypes.STRING(255),
        allowNull: false, 
        unique: true, 
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
      allowNull: true,
    },
  }, {
    tableName: 'Employee',
    timestamps: false,
  });
  
  module.exports = Employee;
  