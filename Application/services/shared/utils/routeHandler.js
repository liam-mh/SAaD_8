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

                const { fields, uniqueFlag } = req.query;
                const parsedFields = JSON.parse(fields);
                const parsedUniqueFlag = uniqueFlag === 'true';

                const records = await controllerInstance.readRecords(parsedFields, parsedUniqueFlag);
                res.status(200).json({ message: 'Records retrieved successfully', data: records, status: res.status });
            } catch (error) {
                console.error(`Error reading records for ${resource}:`, error);
                res.status(500).json({ message: 'Failed to retrieve records', error: error.message, status: res.status });
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

        router.get(`/${resource}/autoComplete`, async (req, res) => {
            try {
                // Extract `chars` directly from the query parameters
                const { chars } = req.query;
        
                if (!chars) {
                    return res.status(400).json({ message: 'Missing query parameter: chars' });
                }
        
                const autoCompleteResults = await controllerInstance.autoComplete(chars);
                res.status(200).json({
                    message: 'Autocomplete results retrieved successfully',
                    data: autoCompleteResults,
                    status: res.statusCode // Using `res.statusCode` as the status has already been set
                });
            } catch (error) {
                console.error(`Error fetching autocomplete results for ${resource}:`, error);
                res.status(500).json({ message: 'Failed to retrieve autocomplete results', error: error.message });
            }
        });
        

        //media specific
        router.get(`/${resource}/fetchMediaByTypeAndLimit`, async (req, res) => {
            try {
                const topMedia = await controllerInstance.handleGetTopMediaByTypeAndLimit();
                res.status(200).json({ message: 'Top media retrieved successfully', data: topMedia });
            } catch (error) {
                console.error(`Error fetching top media by type for ${resource}:`, error);
                res.status(500).json({ message: 'Failed to retrieve top media', error: error.message });
            }
        });
    });
};

module.exports = handleRoutes;
