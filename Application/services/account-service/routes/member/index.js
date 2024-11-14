const express = require("express");
const router = express.Router();
const MemberController = require("../../micro-services/member/memberController");


// Instantiate Member Contoller/Service/Entity and inject dependency.
const memberController = new MemberController();

// Define routes and use memberController to handle requests.

// Route to read records
router.get("/readRecords", (req, res) => {
  const { searchFields, allFlag } = req.query; // Capture search fields and a flag if all records are to be returned.

  memberController
    .readRecords(searchFields, allFlag)
    .then((members) => {
      res.status(200).json({ message: "Records retrieved successfully", data: members });
    })
    .catch((error) => {
      console.error("Error reading records:", error);
      res.status(500).json({ message: "Failed to retrieve records", error: error.message });
    });
});

// Route to create a record
router.post("/createRecord", (req, res) => {
  const recordValues = req.body; // Capture array of record values from the request body.

  memberController
    .createRecord(recordValues)
    .then((result) => {
      res.status(201).json({ message: "Record created successfully", data: result });
    })
    .catch((error) => {
      console.error("Error creating record:", error);
      res.status(500).json({ message: "Failed to create record", error: error.message });
    });
});

// Route to update a record.
router.put("/updateRecord", (req, res) => {
  const newValues = req.body; // Capture array of update values from the request body.
  
  memberController
    .updateRecord(newValues)
    .then((result) => {
      res.status(200).json({ message: "Record updated successfully", result });
    })
    .catch((error) => {
      console.error("Error updating record:", error);
      res.status(500).json({ message: "Failed to update record", error });
    });
});

// Route to delete a member.
router.delete("/deleteRecord", (req, res) => {
  const { primaryKey } = req.body; // Capture primary key from the request body.

  memberController.deleteRecord(primaryKey)
    .then((result) => {
      if (result.affectedRows > 0) {
        res.status(200).json({ message: "Member deleted successfully", result });
      } else {
        res.status(404).json({ message: "Member not found" });
      }
    })
    .catch((error) => {
      console.error("Error deleting member:", error);
      res.status(500).json({ message: "Failed to delete member", error: error.message });
    });
});



module.exports = router;
