const ControllerInterface = require("../../../interfaces/controllerInterface");

class PaymentController extends ControllerInterface {
    constructor(paymentService) {
        super(paymentService); // Pass the specific service to the base class
      }
}

module.exports = PaymentController;