const EntityInterface = require("../../../interfaces/entityInterface");

class MemberEntity extends EntityInterface {
  constructor() {
    super("member");
    console.log("Member Entity")
  }
}

module.exports = MemberEntity;
