import ControllerInterface from "../../interfaces/controllerInterface";

class PaymentController extends ControllerInterface {
    constructor(paymentService) {
        super(paymentService); // Pass the specific service to the base class
      }
}

export default PaymentController;