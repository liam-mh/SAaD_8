const ControllerInterface = require("../../../interfaces/controllerInterface");

class UserSubscriptionsController extends ControllerInterface {
  constructor(userSubscriptionsService) {
    super(userSubscriptionsService); // Pass the specific service to the base class
  }
}

module.exports = UserSubscriptionsController;
