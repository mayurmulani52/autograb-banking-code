
Here’s a `README.md` file for the bank API project. This guide includes instructions on setting up, running, and testing the API.

---

# Autograb Bank API

This project is a RESTful API for a banking system. It allows managing customer accounts with features for creating accounts, transferring funds, depositing and withdrawing funds, and checking the total balance of the bank.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [API Endpoints](#api-endpoints)
- [Running the API](#running-the-api)
- [Running Tests](#running-tests)
- [Example Usage](#example-usage)

## Features

- **Account Management**: Create, View customer accounts.
- **Fund Management**: Deposit to and withdraw funds from customer accounts.
- **Transfer Funds**: Transfer funds between customer accounts.
- **Total Balance**: View the total balance across all customer accounts.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express**: Web framework for building REST APIs.
- **TypeScript**: JavaScript superset for type safety.
- **Jest**: Testing framework.
- **Supertest**: Library for testing HTTP endpoints.

## Setup and Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/bank-api.git
   cd bank-api
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure TypeScript**:
   Ensure `tsconfig.json` is properly configured for the project.

4. **Start the Server**:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3000` by default.

## API Endpoints

### Account Management

- **Create Account**: `POST /api/customerAccounts`
  - Request Body: `{ "customerName": "string", "balance": number }`
- **Get Account by ID**: `GET /api/customerAccounts/:id`

### Fund Management

- **Deposit Funds**: `POST /api/customerAccounts/:id/deposit`
  - Request Body: `{ "amount": number }`
- **Withdraw Funds**: `POST /api/customerAccounts/:id/withdraw`
  - Request Body: `{ "amount": number }`

### Transfer Funds

- **Transfer Funds**: `POST /api/customerAccounts/transfer`
  - Request Body: `{ "fromAccountId": number, "toAccountId": number, "amount": number }`

### Bank Management

- **Get Total Balance**: `GET /api/customerAccounts/totalBalance`

## Running the API

1. Start the server with:
   ```bash
   npm start
   ```
2. The API will be available at `http://localhost:3000`.

## Running Tests

This project includes unit tests for all endpoints using **Jest** and **Supertest**.

1. Run tests with:
   ```bash
   npm test
   ```
2. Jest will report test results and any failures directly in the console.

## Example Usage

### Create an Account

```bash
curl -X POST http://localhost:3000/api/accounts -H "Content-Type: application/json" -d '{"name": "John Doe", "balance": 500}'
```

### Transfer Funds

```bash
curl -X POST http://localhost:3000/api/accounts/transfer -H "Content-Type: application/json" -d '{"fromAccountId": 1, "toAccountId": 2, "amount": 100}'
```

### Get Total Bank Balance

```bash
curl -X GET http://localhost:3000/api/accounts/total-balance
```


---

This README file provides a clear overview of the project, setup instructions, available API endpoints, and testing guidelines, which should be helpful to anyone looking to run or contribute to the project.