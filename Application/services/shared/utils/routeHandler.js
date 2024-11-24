const path = require('path');

/**
 * Converts kebab-case to camelCase.
 * @param {String} resource - The resource name.
 * @returns {String} The resource name in camelCase.
 */
const toCamelCase = (resource) =>
    resource.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());

/**
 * Dynamically loads a controller based on the resource.
 * @param {String} resource - The resource name.
 * @param {String} serviceName - The name of the service.
 * @returns {Object} Controller class.
 */
const getController = (resource, serviceName) => {
    try {
        const controllerResource = toCamelCase(resource); // Convert to camelCase
        console.log("dirname", __dirname);
        console.log('THIS IS A PATH : ', `../../${serviceName}/micro-services/${resource}/${controllerResource}Controller.js`)

        const controllerPath = path.resolve(
            __dirname,
            `../../${serviceName}/micro-services/${resource}/${controllerResource}Controller.js`
        );

        return require(controllerPath);
    } catch (error) {
        console.error(`Failed to load ${resource}Controller:`, error);
        throw new Error(`Controller for ${resource} not found`);
    }
};

/**
 * Registers CRUD routes for a given resource.
 * @param {Object} router - Express router instance.
 * @param {String} serviceName - The service name.
 * @param {Array} resources - Array of resource names.
 */
const handleRoutes = (router, serviceName, resources) => {
    resources.forEach((resource) => {
        const Controller = getController(resource, serviceName);
        const controllerInstance = new Controller();

        router.get(`/${resource}/readRecords`, async (req, res) => {
            try {
                const { fields, allFlag } = req.query;
                const parsedFields = JSON.parse(fields);
                const parsedAllFlag = allFlag === 'true';
                const records = await controllerInstance.readRecords(parsedFields, parsedAllFlag);
                res.status(200).json({ message: 'Records retrieved successfully', data: records });
            } catch (error) {
                console.error(`Error reading records for ${resource}:`, error);
                res.status(500).json({ message: 'Failed to retrieve records', error: error.message });
            }
        });

        router.post(`/${resource}/createRecord`, async (req, res) => {
            try {
                const result = await controllerInstance.createRecord(req.body);
                res.status(201).json({ message: 'Record created successfully', data: result });
            } catch (error) {
                console.error(`Error creating record for ${resource}:`, error);
                res.status(500).json({ message: 'Failed to create record', error: error.message });
            }
        });

        router.put(`/${resource}/updateRecord`, async (req, res) => {
            try {
                const result = await controllerInstance.updateRecord(req.body);
                res.status(200).json({ message: 'Record updated successfully', result });
            } catch (error) {
                console.error(`Error updating record for ${resource}:`, error);
                res.status(500).json({ message: 'Failed to update record', error: error.message });
            }
        });

        router.delete(`/${resource}/deleteRecord`, async (req, res) => {
            try {
                const { primaryKey } = req.body;
                const result = await controllerInstance.deleteRecord(primaryKey);
                if (result.success) {
                    res.status(200).json({ message: 'Record deleted successfully', result });
                } else {
                    res.status(404).json({ message: 'Record not found' });
                }
            } catch (error) {
                console.error(`Error deleting record for ${resource}:`, error);
                res.status(500).json({ message: 'Failed to delete record', error: error.message });
            }
        });
    });
};

module.exports = handleRoutes;
