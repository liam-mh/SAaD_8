const EntityInterface = require('../../../interfaces/entityInterface');
const config = require('../../../../azure-db/config/dbConfig');

class MemberEntity extends EntityInterface {
    constructor() {
        super(config, 'member'); 
    }

    async createByQuery(memberData) {
        await this.create(memberData);
    }

    async readByQuery() {
        const members = await this.read();
        console.log('ENTITY: ',members);
        return members.length > 0 ? members : null;
    }

    async getMemberById(memberId) {
        const members = await this.read('WHERE MemberID = ?', [memberId]);
        return members.length > 0 ? members[0] : null;
    }

    async getMemberByName(memberName) {
        const members = await this.read('WHERE FirstName = ?', [memberName]);
        return members.length > 0 ? members[0] : null;
    }

    async updateMember(memberId, updateData) {
        await this.update(updateData, 'MemberID = ?', [memberId]);
    }

    async deleteMember(memberId) {
        await this.delete('MemberID = ?', [memberId]);
    }
}

module.exports = MemberEntity;