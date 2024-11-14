// Define an interface-like class using an abstract class

class ObjectInterface {
    // Method that should be implemented in subclasses
    createObjectFromArray(arr) {
      throw new Error("Method 'createObjectFromArray' must be implemented by subclass.");
    }
}

module.exports = ObjectInterface;
