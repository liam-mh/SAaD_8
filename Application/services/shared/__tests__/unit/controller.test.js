const Controller = require('../../base-classes/controller'); 

/**
 * @author Guy Nicklin
 */
describe('Controller', () => {
  let serviceMock;
  let controller;

  beforeEach(() => {
    // Create a mock service object
    serviceMock = {
      createRecordByQuery: jest.fn(),
      createRecordsByQuery: jest.fn(),
      readRecordsByQuery: jest.fn(),
      autoComplete: jest.fn(),
      readFieldsByQuery: jest.fn(),
      updateRecordByQuery: jest.fn(),
      updateRecordsByQuery: jest.fn(),
      updateFieldByQuery: jest.fn(),
      deleteRecordByQuery: jest.fn(),
      deleteRecordsByQuery: jest.fn(),
    };

    // Initialize the controller with the mock service
    controller = new Controller(serviceMock);
  });

  // ------------------------------------- Create Methods ---------------------------------------------------
  describe('createRecord', () => {
    it('should create a record', async () => {
      const record = { name: 'Test' };
      const createdRecord = { id: 1, name: 'Test' };
      serviceMock.createRecordByQuery.mockResolvedValue(createdRecord);

      const result = await controller.createRecord(record);

      expect(serviceMock.createRecordByQuery).toHaveBeenCalledWith(record);
      expect(result).toEqual(createdRecord);
    });
  });

  describe('createRecords', () => {
    it('should create multiple records', async () => {
      const records = [{ name: 'Test1' }, { name: 'Test2' }];
      const createdRecords = [{ id: 1, name: 'Test1' }, { id: 2, name: 'Test2' }];
      serviceMock.createRecordsByQuery.mockResolvedValue(createdRecords);

      const result = await controller.createRecords(records);

      expect(serviceMock.createRecordsByQuery).toHaveBeenCalledWith(records);
      expect(result).toEqual(createdRecords);
    });
  });

  // ------------------------------------- Read Methods ---------------------------------------------------
  describe('readRecords', () => {
    it('should read records without formatting', async () => {
      const fieldIdentifiers = { name: 'Test' };
      const uniqueFlag = false;
      const rawRecords = [{ id: 1, name: 'Test', date: '2023-01-01' }];
  
      serviceMock.readRecordsByQuery.mockResolvedValue(rawRecords);
  
      const result = await controller.readRecords(fieldIdentifiers, uniqueFlag);
  
      expect(serviceMock.readRecordsByQuery).toHaveBeenCalledWith(fieldIdentifiers, uniqueFlag);
      expect(result).toEqual(rawRecords);
    });
  });

  describe('autoComplete', () => {
    it('should return auto-complete results', async () => {
      const chars = 'Te';
      const results = ['Test1', 'Test2'];
      serviceMock.autoComplete.mockResolvedValue(results);

      const result = await controller.autoComplete(chars);

      expect(serviceMock.autoComplete).toHaveBeenCalledWith(chars);
      expect(result).toEqual(results);
    });
  });

  describe('readFields', () => {
    it('should read specified fields', async () => {
      const primaryKey = 1;
      const columns = ['name', 'date'];
      const fields = { name: 'Test', date: '2023-01-01' };
      serviceMock.readFieldsByQuery.mockResolvedValue(fields);

      const result = await controller.readFields(primaryKey, columns);

      expect(serviceMock.readFieldsByQuery).toHaveBeenCalledWith(primaryKey, columns);
      expect(result).toEqual(fields);
    });
  });

  // ------------------------------------- Update Methods ---------------------------------------------------
  describe('updateRecord', () => {
    it('should update a record', async () => {
      const newObject = { name: 'Updated Name' };
      const updatedRecord = { id: 1, name: 'Updated Name' };
      serviceMock.updateRecordByQuery.mockResolvedValue(updatedRecord);

      const result = await controller.updateRecord(newObject);

      expect(serviceMock.updateRecordByQuery).toHaveBeenCalledWith(newObject, false);
      expect(result).toEqual(updatedRecord);
    });
  });

  describe('updateRecords', () => {
    it('should update multiple records', async () => {
      const primaryKeys = [1, 2];
      const columns = [['name'], ['name']];
      const newValues = [['Updated Name 1'], ['Updated Name 2']];
      const updatedRecords = [
        { id: 1, name: 'Updated Name 1' },
        { id: 2, name: 'Updated Name 2' },
      ];
      serviceMock.updateRecordsByQuery.mockResolvedValue(updatedRecords);

      const result = await controller.updateRecords(primaryKeys, columns, newValues);

      expect(serviceMock.updateRecordsByQuery).toHaveBeenCalledWith(primaryKeys, columns, newValues);
      expect(result).toEqual(updatedRecords);
    });
  });

  // ------------------------------------- Delete Methods ---------------------------------------------------
  describe('deleteRecord', () => {
    it('should delete a single record', async () => {
      const uniqueKey = { id: 1 };
      serviceMock.deleteRecordByQuery.mockResolvedValue(1); // 1 record deleted

      const result = await controller.deleteRecord(uniqueKey);

      expect(serviceMock.deleteRecordByQuery).toHaveBeenCalledWith(uniqueKey);
      expect(result).toEqual(1); // 1 record deleted
    });
  });

  describe('deleteRecords', () => {
    it('should delete multiple records', async () => {
      const uniqueKeys = [{ id: 1 }, { id: 2 }];
      serviceMock.deleteRecordsByQuery.mockResolvedValue(2); // 2 records deleted

      const result = await controller.deleteRecords(uniqueKeys);

      expect(serviceMock.deleteRecordsByQuery).toHaveBeenCalledWith(uniqueKeys);
      expect(result).toEqual(2); // 2 records deleted
    });
  });
});
