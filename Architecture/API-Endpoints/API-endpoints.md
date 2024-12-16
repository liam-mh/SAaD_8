# API Endpoints for Microservices Architecture

This document provides the API endpoint structure and examples based on the architecture described. The services involved include:

- **Frontend**: Running on `localhost:3000`
- **API Gateway**: Running on `localhost:4000`
- **Backend Services**:
  - `account-service`: Running on `localhost:4001`
  - `storefront-service`: Running on `localhost:4004`
  - `notification-service`: Also on `localhost:4001`

---

# Dynamic Read Records API Documentation

## **Account Service or Storefront Service**

**Endpoints**: `GET /api/account/{resource}/readRecords` `GET /api/storefront/{resource}/readRecords`
**Description**: Fetches records dynamically based on the specified resource (table) within the `account-service` or `storefront-service`.

**Headers**:

- `Content-Type`: application/json

**Path Parameters**:

- `{resource}` (type: string, required): The injected resource name corresponding to the table being accessed. For example, `member`, `media`, or `employee`.

**Query Parameters**:

- `fields` (type: string, optional can be empty): JSON string representing an object of the fields to fetch. If empty fetch all.
- `uniqueFlag` (type: boolean, optional): Whether to fetch unique items by disregarding the primary key. All other fields match (mainly for media).

**Example Request**:

```plaintext
GET /api/account/employee/readRecords?fields=%7B%22Email%22%3A%22whatthefigma%40aml.com%22%2C%22Password%22%3A%22Hashme1!%22%7D&uniqueFlag=false


Translates to:

GET /api/account/employee/readRecords?fields={"Email":"whatthefigma@aml.com","Password":"Hashme1!"}&uniqueFlag=false

```

```json
{
  "fields": {
    "Email": "whatthefigma@aml.com",
    "Password": "Hashme1!"
  },
  "uniqueFlag": false
}
```

**Responses**:

**_200 ok (successfull fetch)_**

```json
{
  "message": "Records retrieved successfully",
  "data": [
    {
      "Email": "whatthefigma@aml.com"
    }
  ],
  "status": 200
}
```

**_204 ok (no content)_**

```json
{
  "message": "No records matching request",
  "data": [],
  "status": 204
}
```

**_400 (Bad Request)_**

```json
{
  "message": "Failed to read records",
  "error": "Invalid request data",
  "status": 400
}
```

**_500 (internal server error)_**

```json
{
  "message": "Failed to retrieve records",
  "error": "Error message details",
  "status": 500
}
```

# Dynamic Create Records API Documentation

## **Account Service or Storefront Service**

**Endpoints**: `POST /api/account/{resource}/createRecord` `POST /api/storefront/{resource}/createRecord`  
**Description**: Creates a new record dynamically in the specified resource. (table) within the `account-service` or `storefront-service`.

**Headers**:

- `Content-Type`: application/json

**Path Parameters**:

- `{resource}` (type: string, required): The injected resource name corresponding to the table being accessed. For example, `member`, `media`, or `employee`.

**Request Body**:

- The request body should contain a JSON object representing the new record to be created.

## **Example Request**

```plaintext
POST /api/account/member/createRecord
```

```json
{
  "FirstName": "test",
  "Surname": "test",
  "Email": "test@example.com",
  "Password": "HashMe1!",
  "FirstLineAddress": "a",
  "City": "a",
  "Postcode": "a",
  "BranchID": 2,
  "RegisterDate": "2024-12-10"
}
```

**Responses**:

**_201 (Succesfull Create)_**

```json
{
  "message": "Record created successfully",
  "data": {
    "MemberID": 92,
    "FirstName": "test",
    "Surname": "test",
    "Email": "test@example.com",
    "FirstLineAddress": "a",
    "City": "a",
    "Postcode": "a",
    "BranchID": 2,
    "RegisterDate": "2024-12-10T00:00:00.000Z"
  },
  "status": 201
}
```

**_400 (Bad Request)_**

```json
{
  "message": "Failed to create record",
  "error": "Invalid request data",
  "status": 400
}
```

**_500 (internal server error)_**

```json
{
  "message": "Failed to create record",
  "error": "Error message details",
  "status": 500
}
```

# Dynamic Create Multiple Records API Documentation

## **Account Service or Storefront Service**

**Endpoints**: `POST /api/account/{resource}/createRecords` `POST /api/storefront/{resource}/createRecords`  
**Description**: Creates multiple new records dynamically in the specified resource (table) within the `account-service` or `storefront-service`.

**Headers**:

- `Content-Type`: application/json

**Path Parameters**:

- `{resource}` (type: string, required): The injected resource name corresponding to the table being accessed. For example, `member`, `media`, or `employee`.

**Request Body**:

- The request body should contain a JSON array of objects, with each object representing a record to be created.

## **Example Request**

```plaintext
POST /api/account/member/createRecords
```

```json
[
  {
    "FirstName": "test1",
    "Surname": "test1",
    "Email": "test@example.com",
    "Password": "HashMe1!",
    "FirstLineAddress": "a",
    "City": "a",
    "Postcode": "a",
    "BranchID": 2,
    "RegisterDate": "2024-12-10"
  },
  {
    "FirstName": "test2",
    "Surname": "test2",
    "Email": "test2@example.com",
    "Password": "HashMe2!",
    "FirstLineAddress": "b",
    "City": "b",
    "Postcode": "b",
    "BranchID": 1,
    "RegisterDate": "2024-12-10"
  }
]
```

**Responses**:

**_201 (Successful Create)_**

```json
{
  "message": "Records created successfully",
  "data": [
    {
      "FirstName": "test1",
      "Surname": "test1",
      "Email": "test@example.com",
      "FirstLineAddress": "a",
      "City": "a",
      "Postcode": "a",
      "BranchID": 2,
      "RegisterDate": "2024-12-10"
    },
    {
      "FirstName": "test2",
      "Surname": "test2",
      "Email": "test2@example.com",
      "Password": "HashMe2!",
      "City": "b",
      "Postcode": "b",
      "BranchID": 1,
      "RegisterDate": "2024-12-10"
    }
  ],
  "status": 201
}
```

**_400 (Bad Request)_**

```json
{
  "message": "Failed to create records",
  "error": "Invalid request data",
  "status": 400
}
```

**_500 (internal server error)_**

```json
{
  "message": "Failed to create records",
  "error": "Error message details",
  "status": 500
}
```

# Dynamic Update Record API Documentation

## **Account Service or Storefront Service**

**Endpoints**:
`PUT /api/account/{resource}/updateRecord` `PUT /api/storefront/{resource}/updateRecord`

**Description**: Updates an existing record dynamically in the specified resource (table) within the `account-service` or `storefront-service`.

---

**Headers**:

- `Content-Type`: application/json

---

**Path Parameters**:

- `{resource}` (type: string, required):  
  The injected resource name corresponding to the table being accessed.  
  For example: `member`, `media`, or `employee`.

---

**Request Body**:

The request body should contain a JSON object representing the updated fields for the existing record. Include the unique identifier of the record to be updated (e.g., `HistoryID`, `MemberID`, `MediaID`, etc.).

**Example Request**:

```plaintext
PUT /api/account/member/updateRecord
```

```json
{
  "MemberID": 92,
  "FirstName": "UpdatedFirstName",
  "Surname": "UpdatedSurname",
  "Email": "updatedemail@example.com",
  "City": "UpdatedCity"
}
```

**responses**

**_200 (Succesfull Update)_**

```json
{ "message": "Record updated successfully", "data": [null, 1], "status": 200 }
```

**_400 (Bad Request)_**

```json
{
  "message": "Failed to update record",
  "error": "Invalid request data",
  "status": 400
}
```

**_500 (internal server error)_**

```json
{
  "message": "Failed to update record",
  "error": "Error message details",
  "status": 500
}
```

# Dynamic Delete Record API Documentation

## **Account Service or Storefront Service**

**Endpoints**:  
`DELETE /api/account/{resource}/deleteRecord`  
`DELETE /api/storefront/{resource}/deleteRecord`

**Description**: Deletes a specified record dynamically within the `account-service` or `storefront-service`.

---

### **Headers**:

- `Content-Type`: application/json

---

### **Path Parameters**:

- `{resource}` (type: string, required): The injected resource name corresponding to the table being accessed, such as `member`, `media`, or `employee`.

---

### **Request Body**:

The request body should contain a JSON object specifying the identifier(s) of the record to delete.

---

## **Example Request**

```plaintext
DELETE /api/account/member/deleteRecord
```

```json
{
  "MemberID": 92
}
```

**Responses**

**_204 No content (Record Deleted Successfully)_**

```json
{
  "message": "Record deleted successfully",
  "data": {
    "MemberID": 92
  },
  "status": 200
}
```

**_404 (Not Found)_**

```json
{
  "message": "Record not found",
  "status": 404
}
```

**_500 (Internal Server Error)_**

```json
Copy code
{
  "message": "Failed to delete record",
  "error": "Error message details",
  "status": 500
}
```

# Dynamic Delete Records API Documentation

## **Account Service or Storefront Service**

**Endpoints**:  
`DELETE /api/account/{resource}/deleteRecords`  
`DELETE /api/storefront/{resource}/deleteRecords`

**Description**: Deletes specified records dynamically within the `account-service` or `storefront-service`.

---

### **Headers**:

- `Content-Type`: application/json

---

### **Path Parameters**:

- `{resource}` (type: string, required): The injected resource name corresponding to the table being accessed, such as `member`, `media`, or `employee`.

---

### **Request Body**:

The request body should contain a JSON array specifying the identifiers of the records to delete.

---

## **Example Request**

```plaintext
DELETE /api/account/member/deleteRecords
```

```json
[{ "MemberID": 92 }, { "MemberID": 93 }]
```

**Responses**

**_204 No content (Records Deleted Successfully)_**

```json
{
  "message": "Records deleted successfully",
  "data": {
    "MemberID": 92
  },
  "status": 200
}
```

**_404 (Not Found)_**

```json
{
  "message": "Records not found",
  "status": 404
}
```

**_500 (Internal Server Error)_**

```json
Copy code
{
  "message": "Failed to delete records",
  "error": "Error message details",
  "status": 500
}
```

# Dynamic Autocomplete API Documentation

## **Account Service or Storefront Service**

**Endpoints**:  
`GET /api/account/{resource}/autoComplete`  
`GET /api/storefront/{resource}/autoComplete`

**Description**: Retrieves autocomplete results dynamically based on the `chars` query parameter. Will search for records like the `chars` query parameter in the specified resource (table) within the `account-service` or `storefront-service`.

---

### **Headers**:

- `Content-Type`: application/json

---

### **Path Parameters**:

- `{resource}` (type: string, required): The injected resource name corresponding to the table being accessed, such as `member`, `media`, or `employee`.

---

### **Query Parameters**:

- `chars` (type: string, required): A string parameter representing the search characters for the autocomplete feature.

---

## **Example Request**

```plaintext
GET /api/storefront/media/autoComplete?chars=Hob
```

```json
{
  "chars": "Hob"
}
```

**_Responses_**

**_200 ok (successfull fetch)_**

```json
{
  "message": "Autocomplete results retrieved successfully",
  "data": [
    {
      "Title": "The Hobbit",
      "Type": "Book",
      "Description": "A fantastical journey in Middle-earth featuring Bilbo Baggins.",
      "PublishDate": "1937-09-21",
      "Author": "J.R.R. Tolkien",
      "Genre": "Fantasy"
    }
  ],
  "status": 200
}
```

**_204 ok (no content)_**

```json
{
  "message": "No records matching request",
  "data": [],
  "status": 204
}
```

**_400 (Bad Request)_**

```json
{
  "message": "Failed to read records",
  "error": "Invalid request data",
  "status": 400
}
```

**_500 (internal server error)_**

```json
{
  "message": "Failed to retrieve records",
  "error": "Error message details",
  "status": 500
}
```

# Fetch Media by Type and Limit API Documentation

## **Storefront Service**

**Endpoint**: `GET /api/storefront/media/fetchMediaByTypeAndLimit`  
**Description**: Retrieves media items based on the specified type, and limits the returned records to the 3 most recent releases from the given type.

**Headers**:

- `Content-Type`: application/json

**Path Parameters**:

- na

**Example Request**:

```plaintext
GET /api/storefront/media/fetchMediaByTypeAndLimit
```

**Responses**

**_200 ok (successfull fetch)_**

```json
{
  "message": "Carousel media retrieved successfully",
  "data": [
    {
      "Title": "Memory's Legion",
      "Author": "James S.A. Corey",
      "Genre": "Fiction",
      "PublishDate": "2022-03-15"
    },
    {
      "Title": "Leviathan Falls",
      "Author": "James S.A. Corey",
      "Genre": "Fiction",
      "PublishDate": "2021-11-30"
    },
    {
      "Title": "Project Hail Mary",
      "Author": "Andy Weir",
      "Genre": "Fiction",
      "PublishDate": "2021-05-04"
    },
    {
      "Title": "IEEE Transactions on Computers",
      "Author": "Various",
      "Genre": "Educational",
      "PublishDate": "2010-05-01"
    },
    {
      "Title": "Journal of Finance",
      "Author": "Various",
      "Genre": "Educational",
      "PublishDate": "2006-01-01"
    },
    {
      "Title": "Science",
      "Author": "Various",
      "Genre": "Educational",
      "PublishDate": "2001-07-03",
      "Type": "Journal"
    },
    {
      "Title": "Thriller",
      "Author": "Michael Jackson",
      "Genre": "Entertainment",
      "PublishDate": "1982-11-30"
    },
    {
      "Title": "Back in Black",
      "Author": "AC/DC",
      "Genre": "Entertainment",
      "PublishDate": "1980-07-25"
    },
    {
      "Title": "Hotel California",
      "Author": "Eagles",
      "Genre": "Entertainment",
      "PublishDate": "1976-12-08"
    },
    {
      "Title": "National Geographic Kids",
      "Author": "Various",
      "Genre": "Educational",
      "PublishDate": "1975-09-01"
    },
    {
      "Title": "Rolling Stone",
      "Author": "Various",
      "Genre": "Art & Culture",
      "PublishDate": "1967-11-09"
    },
    {
      "Title": "Sports Illustrated",
      "Author": "Various",
      "Genre": "Art & Culture",
      "PublishDate": "1954-08-16"
    },
    {
      "Title": "Inception",
      "Author": "Christopher Nolan",
      "Genre": "Fiction",
      "PublishDate": "2010-07-16"
    },
    {
      "Title": "Avatar",
      "Author": "James Cameron",
      "Genre": "Fiction",
      "PublishDate": "2009-12-18",
      "Type": "DVD"
    },
    {
      "Title": "The Dark Knight",
      "Author": "Christopher Nolan",
      "Genre": "Action",
      "PublishDate": "2008-07-18"
    },
    {
      "Title": "Cyberpunk 2077",
      "Author": "CD Projekt",
      "Genre": "Action",
      "PublishDate": "2020-12-10"
    },
    {
      "Title": "Call of Duty: Modern Warfare",
      "Author": "Infinity Ward",
      "Genre": "Action",
      "PublishDate": "2019-10-25"
    },
    {
      "Title": "Apex Legends",
      "Author": "Respawn Entertainment",
      "Genre": "Action",
      "PublishDate": "2019-02-04"
    }
  ],
  "status": 200
}
```

**_204 ok (no content)_**

```json
{
  "message": "No records matching request",
  "data": [],
  "status": 204
}
```

**_400 (Bad Request)_**

```json
{
  "message": "Failed to read records",
  "error": "Invalid request data",
  "status": 400
}
```

**_500 (internal server error)_**

```json
{
  "message": "Failed to retrieve records",
  "error": "Error message details",
  "status": 500
}
```

# Fetch Top Five Media API Documentation

## **Account Service or Storefront Service**

**Endpoint**: `GET /api/storefront/media/fetchTopFive`  
**Description**: Retrieves the top five media items from the `storefront-service`.

---

### **Headers**

- `Content-Type`: application/json

---

### **Path Parameters**

- na

---

### **Responses**

#### **200 OK (Successful Retrieval)**

```json
{
  "message": "Top five media retrieved successfully",
  "data": [
    {
      "Title": "Memory's Legion",
      "Author": "James S.A. Corey",
      "Genre": "Fiction",
      "PublishDate": "2022-03-15"
    },
    {
      "Title": "Leviathan Falls",
      "Author": "James S.A. Corey",
      "Genre": "Fiction",
      "PublishDate": "2021-11-30"
    },
    {
      "Title": "Project Hail Mary",
      "Author": "Andy Weir",
      "Genre": "Fiction",
      "PublishDate": "2021-05-04"
    },
    {
      "Title": "IEEE Transactions on Computers",
      "Author": "Various",
      "Genre": "Educational",
      "PublishDate": "2022-02-01"
    },
    {
      "Title": "Journal of Finance",
      "Author": "Various",
      "Genre": "Educational",
      "PublishDate": "1946-01-01"
    }
  ],
  "status": 200
}
```

**_204 ok (no content)_**

```json
{
  "message": "No records matching request",
  "data": [],
  "status": 204
}
```

**_400 (Bad Request)_**

```json
{
  "message": "Failed to read records",
  "error": "Invalid request data",
  "status": 400
}
```

**_500 (internal server error)_**

```json
{
  "message": "Failed to retrieve records",
  "error": "Error message details",
  "status": 500
}
```

# Fetch Emails API Documentation

## **Account Service**

**Endpoint**: `GET /api/account/member/fetchEmails`  
**Description**: Retrieves email addresses based on the provided member IDs from the `account-service`.

---

### **Headers**

- `Content-Type`: application/json

---

### **Query Parameters**

- `fields` (type: string, required): A JSON string representing the member IDs whose email addresses are to be fetched. For example, `{"memberIDs": [89, 90]}`.

---

### **Responses**

#### **200 OK (Successful Retrieval)**

````json
{
  "message": "Records retrieved successfully",
  "data": [
    "user1@example.com",
    "user2@example.com"
  ],
  "status": 200
}

**_204 ok (no content)_**

```json
{
  "message": "No records matching request",
  "data": [],
  "status": 204
}
````

**_400 (Bad Request)_**

```json
{
  "message": "Failed to read records",
  "error": "Invalid request data",
  "status": 400
}
```

**_500 (internal server error)_**

```json
{
  "message": "Failed to retrieve records",
  "error": "Error message details",
  "status": 500
}
```
