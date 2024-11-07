const EntityInterface = require("../../../interfaces/entityInterface");

class MemberEntity extends EntityInterface {
  constructor() {
    super("member");
  }
}

module.exports = MemberEntity;
