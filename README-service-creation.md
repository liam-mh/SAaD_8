# Service Creation Read Me

## Description
When additional services are needed, such as when new tables are added to the database, new services can be created quickly. These services will include all CRUD functionality straight out of the box.

---

## Step One: Create Derived Classes for the New Resource and Inject Relevant Dependencies.

### Example creating a derived service class

**Note: this is for an internal service layer class not the service itself**

```javascript
const { Service } = require("../../../shared");
const PaymentDbHandler = require("./paymentDbHandler");

class PaymentService extends Service {
  constructor() {
    const dbHandler = new PaymentDbHandler();
    super(dbHandler);
  }
}

module.exports = PaymentService;
```

- Repeat for all other derived classes.

## Step Two: Create the Relevant Model.

### Example

```javascript
const { DataTypes } = require('sequelize');
const sequelize = require('../../../../config/sequelize');

const PaymentModel = sequelize.define('Payment', {
  PaymentID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: "unique_payment",
    autoIncrement: true,
  },
  PaymentType: {
    type: DataTypes.ENUM('Card', 'PayPal', 'Klarna'),
    allowNull: false,
  },
  PaymentReason: {
    type: DataTypes.ENUM('Subscription', 'OverduePayment', 'Purchase'),
    allowNull: true,
  },
  Date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
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
  Price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
    },
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
}, {
  tableName: 'Payment',
  timestamps: false,
});

module.exports = PaymentModel;
```

## Step three: Create an Index Routes File and pass Relevant Resources and Service Name to the Route Handler

### example

```javascript
const express = require('express');
const { handleRoutes } = require("shared");
const router = express.Router();

const resources = ['member', 'employee', 'member-subscription', 'subscription', 'payment'];

handleRoutes(router, 'account-service', resources);

module.exports = router;
```

**New Service will now have all base functionality and can perform CRUD operations its relevant tables in the database**

