class Object {
  /**
   * Maps properties from the input object to the instance properties.
   * @param {Object} fields - Object with properties to map to the class instance.
   */
  mapObject(fields) {
    for (const key in fields) {
      if (this.hasOwnProperty(key)) {
        this[key] = fields[key];
      }
    }
  }
}

module.exports = Object;
