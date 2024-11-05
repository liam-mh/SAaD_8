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
const memberEntity = require('../../entity/memberEntity')

// Instantiate MemberService and pass it to MemberController
const memberService = new MemberService(memberEntity);
const memberController = new MemberController(memberService);

// Define routes and use memberController to handle requests
router.get('/', (req, res) => {
  memberController.readRecords([])
    .then(members => res.json(members))
    .catch(error => res.status(500).json({ error: error.message }));
});

module.exports = router;
