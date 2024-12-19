const DbHandler = require("../../base-classes/dbHandler");
const { Op } = require("sequelize");
const sequelize = require("../../../../config/sequelize");

// Mock Sequalise instance.
jest.mock("../../../../config/sequelize", () => {
  const SequelizeMock = {
    authenticate: jest.fn().mockResolvedValue(),
    sync: jest.fn().mockResolvedValue(),
    define: jest.fn().mockReturnValue({
      destroy: jest.fn().mockResolvedValue(1),
    }),
  };
  return SequelizeMock;
});

global.console = {
    error: jest.fn(),
    log: jest.fn(),
  };

// Mock Sequelize model.
const modelMock = {
  create: jest.fn(),
  bulkCreate: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
  rawAttributes: {
    id: { unique: true },
    name: { unique: false },
    email: { unique: true },
  }
};

// Create an instance of DbHandler with the mocked model
const dbHandler = new DbHandler(modelMock);

/**
 * @author Guy Nicklin
 */
describe("DbHandler", () => {
  describe("createByQuery", () => {
    it("should create a record successfully", async () => {
      const record = { name: "Test" };
      modelMock.create.mockResolvedValue(record);

      const result = await dbHandler.createByQuery(record);

      expect(modelMock.create).toHaveBeenCalledWith(record);
      expect(result).toEqual(record);
    });
  });

  describe("readByQuery", () => {
    it("should read records based on query", async () => {
      const dataObject = { name: "Test" };
      const mockResult = [{ id: 1, name: "Test" }];
      modelMock.findAll.mockResolvedValue(mockResult);

      const queryOptions = { where: { name: "Test" } };

      const result = await dbHandler.readByQuery(dataObject);

      expect(modelMock.findAll).toHaveBeenCalledWith(queryOptions);
      expect(result).toEqual(mockResult);
    });
  });

  describe("deleteByQuery", () => {
    it("should delete a record successfully", async () => {
      const uniqueKey = { id: 1 };
      
      modelMock.destroy.mockResolvedValue(1);

      const result = await dbHandler.deleteByQuery(uniqueKey);

      expect(modelMock.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(1); // number of records deleted
    });
      
  });

  describe("updateByQuery", () => {
    it("should update a record successfully without returning updated data", async () => {
        const dataObject = { id: 1, name: "Updated Name" };
        modelMock.update.mockResolvedValue([1]); // Mocking affected count
    
        const [affectedRow, affectedCount] = await dbHandler.updateByQuery(
          dataObject
        );
    
        expect(modelMock.update).toHaveBeenCalledWith(dataObject, {
          validate: true,
          where: { id: 1 },
          returning: true,
        });
        expect(affectedRow).toBeNull(); // shouldReturn is false
        expect(affectedCount).toBe(1); // Number of affected rows
      });

    it("should update a record successfully and return updated data when shouldReturn is true", async () => {
      const dataObject = { id: 1, name: "Updated Name",};
      const mockUpdatedRow = { id: 1, name: "Updated Name" };

      modelMock.primaryKeyAttribute = 'id';

      modelMock.update.mockResolvedValue([1]); // Mocking affected count
      modelMock.findOne = jest.fn().mockResolvedValue(mockUpdatedRow);

      const [affectedRow, affectedCount] = await dbHandler.updateByQuery(
        dataObject,
        true
      );

      expect(modelMock.update).toHaveBeenCalledWith(dataObject, {
        validate: true,
        where: { id: 1 },
        returning: true,
      });
      expect(modelMock.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(affectedRow).toEqual(mockUpdatedRow);
      expect(affectedCount).toBe(1); // Number of affected rows
    });

    it('should handle errors during the update process', async () => {
        const dataObject = { id: 1, name: 'Updated Name' };
        const errorMessage = 'Some error occurred';
    
        modelMock.update.mockRejectedValue(new Error(errorMessage));
    
        await expect(dbHandler.updateByQuery(dataObject)).rejects.toThrow(
          `An unexpected error occurred: ${errorMessage}`
        );
      });
  });


});
