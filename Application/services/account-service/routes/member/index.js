const express = require("express");
const router = express.Router();
const MemberController = require("../../micro-services/member/memberController");


// Instantiate Member Contoller/Service/Entity and inject dependency.
const memberController = new MemberController();

// Define routes and use memberController to handle requests
debugger;
router.get("/", (req, res) => {
  memberController
    .readRecords([])
    .then((members) => res.json(members))
    .catch((error) => res.status(500).json({ error: error.message }));
});

module.exports = router;
