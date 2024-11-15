const express = require('express');
const router = express.Router();
const path = require('path');

const getController = (resource) => {
    try {
      const controllerPath = path.resolve(__dirname, `../micro-services/${resource}/${resource}Controller.js`);
  
      console.log(`Attempting to load controller from: ${controllerPath}`);
  
      // Dynamically require the controller
      return require(controllerPath);
    } catch (error) {
      console.error(`Failed to load ${resource}Controller:`, error);
      return null;
    }
  };


// Dynamically handle routes. 
const handleRoutes = (resource) => {
    
    const Controller = getController(resource); 

  if (!Controller) {
    throw new Error(`Controller for ${resource} not found`);
  }

  // Instantiate the controller
  const controllerInstance = new Controller();

  // Define CRUD routes dynamically.
  router.get(`/${resource}/readRecords`, async (req, res) => {
    const { searchFields, allFlag } = req.query; 
    try {
      const records = await controllerInstance.readRecords(searchFields, allFlag);
      res.status(200).json({ message: "Records retrieved successfully", data: records });
    } catch (error) {
      console.error("Error reading records:", error);
      res.status(500).json({ message: "Failed to retrieve records", error: error.message });
    }
  });

  router.post(`/${resource}/createRecord`, async (req, res) => {
    const recordValues = req.body;
    try {
      const result = await controllerInstance.createRecord(recordValues); 
      res.status(201).json({ message: "Record created successfully", data: result });
    } catch (error) {
      console.error("Error creating record:", error);
      res.status(500).json({ message: "Failed to create record", error: error.message });
    }
  });

  router.put(`/${resource}/updateRecord`, async (req, res) => {
    const newValues = req.body;
    try {
      const result = await controllerInstance.updateRecord(newValues); 
      res.status(200).json({ message: "Record updated successfully", result });
    } catch (error) {
      console.error("Error updating record:", error);
      res.status(500).json({ message: "Failed to update record", error });
    }
  });

  router.delete(`/${resource}/deleteRecord`, async (req, res) => {
    const { primaryKey } = req.body;
    try {
      const result = await controllerInstance.deleteRecord(primaryKey); 
      if (result.success) {
        res.status(200).json({ message: "Record deleted successfully", result });
      } else {
        res.status(404).json({ message: "Record not found" });
      }
    } catch (error) {
      console.error("Error deleting record:", error);
      res.status(500).json({ message: "Failed to delete record", error: error.message });
    }
  });
}

handleRoutes('member');  


module.exports = router;
