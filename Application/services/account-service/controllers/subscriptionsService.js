import ControllerInterface from "../../interfaces/controllerInterface";

class SubscriptionsController extends ControllerInterface {
    constructor(subscriptionsService) {
        super(subscriptionsService); // Pass the specific service to the base class
      }
}

export default SubscriptionsController;
