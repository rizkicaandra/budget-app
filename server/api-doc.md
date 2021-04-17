# KOPROK-IN
  
List of available endpoints:
- `POST /budgets`
- `GET /incomes`
- `GET /expenses`
- `GET /budgets/:id`
- `PUT /budgets/:id`
- `DELETE /budgets/:id`
- `GET /balance`


### POST /budgets

Add new data

Request:

- data:

```json
{
  "name": "string",
  "category": "string",
  "amount": "integer"
}
```
Response:

- status 201

```json
{
    "id": "integer",
    "name": "string",
    "category": "string",
    "amount": "integer",
    "updatedAt": "date",
    "createdAt": "date"
}
```

Error Response:
- 400 bad request
- 500 internal server error

### GET /incomes

get all income data

Request:

- data:

```json
no needed
```
Response:

- status 200

```json
[
  {
    "id": "integer",
    "name": "string",
    "category": "string",
    "amount": "integer",
    "updatedAt": "date",
    "createdAt": "date"
  },
  {
    ....
  }
]
```

Error Response:
- 500 internal server error

### GET /expenses

get all expenses data

Request:

- data:

```json
no needed
```
Response:

- status 200

```json
[
  {
    "id": "integer",
    "name": "string",
    "category": "string",
    "amount": "integer",
    "updatedAt": "date",
    "createdAt": "date"
  },
  {
    ....
  }
]
```

Error Response:
- 500 internal server error

### GET /budgets/:id

get data search by id

Request:

- params

```json
{
  "id": "integer"
}
```

- data:

```json
no needed
```
Response:

- status 200

```json
{
    "id": "integer",
    "name": "string",
    "category": "string",
    "amount": "integer",
    "updatedAt": "date",
    "createdAt": "date"
}
```

Error Response:
- 404 error not found
- 500 internal server error

### PUT /budgets/:id

Edit data search by id

Request:

- params

```json
{
  "id": "integer"
}
```

- data:

```json
{
  "name": "string",
  "category": "string",
  "amount": "integer"
}
```
Response:

- status 200

```json
{
    "id": "integer",
    "name": "string",
    "category": "string",
    "amount": "integer",
    "updatedAt": "date",
    "createdAt": "date"
}
```

Error Response:
- 400 bad request
- 404 error not found
- 500 internal server error

### DELETE /budgets/:id

delete data

Request:

- params

```json
{
  "id": "integer"
}
```

- data:

```json
no needed
```
Response:

- status 200

```json
{
    "message" : "string"
}
```

Error Response:
- 404 error not found
- 500 internal server error

### GET /balance

get balance data

Request:

- data:

```json
no needed
```
Response:

- status 200

```json
{
    "balance": "integer"
}
```

Error Response:
- 500 internal server error

### ERROR RESPONSE DETAIL

- 400 Bad Request / Validation Error

```json
{
    "error": [
        <"information about validation error">
    ]
}
```

- 404 Error Not Found

```json
{
  "error": "Error Not Found"
}
```
- 500 Internal Server Error

```json
{ 
    "error": "Internal Server Error"
}
```