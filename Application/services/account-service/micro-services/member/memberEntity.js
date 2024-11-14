const EntityInterface = require("../../../interfaces/entityInterface");

class MemberEntity extends EntityInterface {
  constructor() {
    super("member", "memberID");
  }
}

module.exports = MemberEntity;
