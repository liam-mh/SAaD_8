const Service = require('../../base-classes/service'); 
const DbHandler = require('../../base-classes/dbHandler');  

// Mock the DbHandler class
jest.mock('../../base-classes/dbHandler'); 

/**
 * @author guy Nicklin
 */
describe('Service', () => {
  let dbHandlerMock;
  let service;

  beforeEach(() => {
    // Mocking the DbHandler methods
    dbHandlerMock = {
      createByQuery: jest.fn(),
      createMultipleByQuery: jest.fn(),
      readByQuery: jest.fn(),
      autoComplete: jest.fn(),
      updateByQuery: jest.fn(),
      deleteByQuery: jest.fn(),
      deleteMultipleByQuery: jest.fn(),
    };

    // Initialize the service with the mocked DbHandler
    service = new Service(dbHandlerMock);
  });

  // ------------------------------------- Create Methods ---------------------------------------------------
  describe('createRecordByQuery', () => {
    it('should create a new record', async () => {
      const record = { name: 'Test' };
      const createdRecord = { id: 1, name: 'Test' };
      dbHandlerMock.createByQuery.mockResolvedValue(createdRecord);

      const result = await service.createRecordByQuery(record);

      expect(dbHandlerMock.createByQuery).toHaveBeenCalledWith(record);
      expect(result).toEqual(createdRecord);
    });
  });

  describe('createRecordsByQuery', () => {
    it('should create multiple records', async () => {
      const records = [{ name: 'Test1' }, { name: 'Test2' }];
      const createdRecords = [
        { id: 1, name: 'Test1' },
        { id: 2, name: 'Test2' },
      ];
      dbHandlerMock.createMultipleByQuery.mockResolvedValue(createdRecords);

      const result = await service.createRecordsByQuery(records);

      expect(dbHandlerMock.createMultipleByQuery).toHaveBeenCalledWith(records);
      expect(result).toEqual(createdRecords);
    });
  });

  // ------------------------------------- Read Methods ---------------------------------------------------
  describe('readRecordsByQuery', () => {
    it('should read records based on field identifiers', async () => {
      const fieldIdentifiers = { name: 'Test' };
      const rawRecords = [{ id: 1, name: 'Test', date: '2023-01-01' }];
      dbHandlerMock.readByQuery.mockResolvedValue(rawRecords);

      const result = await service.readRecordsByQuery(fieldIdentifiers);

      expect(dbHandlerMock.readByQuery).toHaveBeenCalledWith(fieldIdentifiers, false);
      expect(result).toEqual(rawRecords);
    });
  });

  describe('autoComplete', () => {
    it('should return auto-complete results based on user input', async () => {
      const chars = 'Test';
      const results = ['Test1', 'Test2'];
      dbHandlerMock.autoComplete.mockResolvedValue(results);

      const result = await service.autoComplete(chars);

      expect(dbHandlerMock.autoComplete).toHaveBeenCalledWith(chars);
      expect(result).toEqual(results);
    });
  });

  // ------------------------------------- Update Methods ---------------------------------------------------
  describe('updateRecordByQuery', () => {
    it('should update a record', async () => {
      const newValues = { name: 'Updated Name' };
      const updatedRecord = { id: 1, name: 'Updated Name' };
      dbHandlerMock.updateByQuery.mockResolvedValue(updatedRecord);

      const result = await service.updateRecordByQuery(newValues);

      expect(dbHandlerMock.updateByQuery).toHaveBeenCalledWith(newValues, false);
      expect(result).toEqual(updatedRecord);
    });
  });

  describe('updateRecordsByQuery', () => {
    it('should update multiple records', async () => {
      const primaryKeys = [1, 2];
      const columns = [['name'], ['name']];
      const newValues = [['Updated Name 1'], ['Updated Name 2']];
      const updatedRecords = [
        { id: 1, name: 'Updated Name 1' },
        { id: 2, name: 'Updated Name 2' },
      ];
      dbHandlerMock.updateByQuery.mockResolvedValue(updatedRecords);

      const result = await service.updateRecordsByQuery(primaryKeys, columns, newValues);

      expect(dbHandlerMock.updateByQuery).toHaveBeenCalledWith(primaryKeys, columns, newValues);
      expect(result).toEqual(updatedRecords);
    });
  });

  // ------------------------------------- Delete Methods ---------------------------------------------------
  describe('deleteRecordByQuery', () => {
    it('should delete a single record', async () => {
      const uniqueKey = { id: 1 };
      dbHandlerMock.deleteByQuery.mockResolvedValue(1); // 1 record deleted

      const result = await service.deleteRecordByQuery(uniqueKey);

      expect(dbHandlerMock.deleteByQuery).toHaveBeenCalledWith(uniqueKey);
      expect(result).toEqual(1); // 1 record deleted
    });
  });

  describe('deleteRecordsByQuery', () => {
    it('should delete multiple records', async () => {
      const uniqueKeys = [{ id: 1 }, { id: 2 }];
      dbHandlerMock.deleteMultipleByQuery.mockResolvedValue(2); // 2 records deleted

      const result = await service.deleteRecordsByQuery(uniqueKeys);

      expect(dbHandlerMock.deleteMultipleByQuery).toHaveBeenCalledWith(uniqueKeys);
      expect(result).toEqual(2); // 2 records deleted
    });
  });
});
