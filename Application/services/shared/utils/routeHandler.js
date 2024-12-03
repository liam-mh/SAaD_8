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
        const controllerResource = toCamelCase(resource); // Convert from our route convention to file naming convention.

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
                //204 implement empty
                const read = await controllerInstance.readRecords(parsedFields, parsedUniqueFlag);
                res.status(200).json({ message: 'Records retrieved successfully', data: read, status: res.statusCode});
            } catch (error) {
                console.error(`Error reading records from ${resource}:`, error);
                res.status(500).json({ message: 'Failed to retrieve records', error: error.message, status: res.statusCode});
            }
        });

        router.post(`/${resource}/createRecord`, async (req, res) => {
            try {
                const created = await controllerInstance.createRecord(req.body);
                res.status(201).json({ message: 'Record created successfully', data: created, status: res.statusCode});
            } catch (error) {
                console.error(`Error creating record in ${resource}:`, error);
                res.status(500).json({ message: 'Failed to create record', error: error.message });
            }
        });

        router.post(`/${resource}/createRecords`, async (req, res) => {
            try {
                const created = await controllerInstance.createRecords(req.body);
                res.status(201).json({ message: 'Record created successfully', data: created, status: res.statusCode});
            } catch (error) {
                console.error(`Error creating record in ${resource}:`, error);
                res.status(500).json({ message: 'Failed to create record', error: error.message });
            }
        });

        router.put(`/${resource}/updateRecord`, async (req, res) => {
            try {
                const updated = await controllerInstance.updateRecord(req.body);
                res.status(200).json({ message: 'Record updated successfully', data: updated, status: res.statusCode });
            } catch (error) {
                console.error(`Error updating record in ${resource}:`, error);
                res.status(500).json({ message: 'Failed to update record', error: error.message });
            }
        });

        router.delete(`/${resource}/deleteRecord`, async (req, res) => {
            try {
                const deleted = await controllerInstance.deleteRecord(req.body);
                if (deleted) {
                    res.status(200).json({ message: 'Record deleted successfully', data: deleted, status: res.statusCode});
                } else {
                    res.status(404).json({ message: 'Record not found' });
                }
            } catch (error) {
                console.error(`Error deleting record in ${resource}:`, error);
                res.status(500).json({ message: 'Failed to delete record', error: error.message });
            }
        });

        router.delete(`/${resource}/deleteRecords`, async (req, res) => {
            try {
                const deleted = await controllerInstance.deleteRecords(req.body);
                if (deleted === req.body.length) {
                    res.status(200).json({ message: 'Records deleted successfully', data: deleted, status: res.statusCode});
                } else {
                    res.status(404).json({ message: 'Records not found' });
                }
            } catch (error) {
                console.error(`Error deleting records in ${resource}:`, error);
                res.status(500).json({ message: 'Failed to delete records', error: error.message });
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
                    status: res.statusCode 
                });
            } catch (error) {
                console.error(`Error fetching autocomplete results from ${resource}:`, error);
                res.status(500).json({ message: 'Failed to retrieve autocomplete results', error: error.message });
            }
        });
        

        //media specific
        router.get(`/${resource}/fetchMediaByTypeAndLimit`, async (req, res) => {
            try {
                const carouselMedia = await controllerInstance.handleMediaByTypeAndLimit();
                res.status(200).json({ message: 'Carousel media retrieved successfully', data: carouselMedia, status: res.statusCode});
            } catch (error) {
                console.error(`Error fetching carousel media from ${resource}:`, error);
                res.status(500).json({ message: 'Failed to retrieve carousel media', error: error.message });
            }
        });

        router.get(`/${resource}/fetchTopFive`, async (req, res) => {
            try {
                const topFive = await controllerInstance.handleMediaTopFive();
                res.status(200).json({ message: 'Top five media retrieved successfully', data: topFive, status: res.statusCode});
            } catch (error) {
                console.error(`Error fetching top five media from ${resource}:`, error);
                res.status(500).json({ message: 'Failed to retrieve top five media', error: error.message });
            }
        });

    });
};

module.exports = handleRoutes;
