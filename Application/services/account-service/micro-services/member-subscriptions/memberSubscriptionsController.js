const ControllerInterface = require("../../../interfaces/controllerInterface");


class MemberSubscriptionsController extends ControllerInterface {
  constructor(memberSubscriptionsService) {
    super(userSubscriptionsService); // Pass the specific service to the base class
  }
}

module.exports = UserSubscriptionsController;
