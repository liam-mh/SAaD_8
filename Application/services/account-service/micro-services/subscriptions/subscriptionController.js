const ControllerInterface = require("../../../interfaces/controllerInterface");

class SubscriptionsController extends ControllerInterface {
  constructor(subscriptionsService) {
    super(subscriptionsService); // Pass the specific service to the base class
  }
}

module.exports = SubscriptionsController;
