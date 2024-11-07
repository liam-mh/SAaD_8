// const express = require('express');
// const router = express.Router();
// import MemberController from '../../controllers/memberController';

// // routes
// router.get('/', memberController.getMembers); // Get all members

// module.exports = router;

const express = require('express');
const router = express.Router();
const MemberService = require('../../models/service/memberService');
const MemberController = require('../../controllers/memberController');
const MemberEntity = require('../../models/entity/memberEntity')

// Instantiate Member Contoller/Service/Entity and inject dependency.
// TODO - Could be a function or class and pass in table flag.
const memberEntity = new MemberEntity();
const memberService = new MemberService(memberEntity);
const memberController = new MemberController(memberService);

// Define routes and use memberController to handle requests
debugger;
router.get('/', (req, res) => {
  memberController.readRecords([])
    .then(members => res.json(members))
    .catch(error => res.status(500).json({ error: error.message }));
});

module.exports = router;
