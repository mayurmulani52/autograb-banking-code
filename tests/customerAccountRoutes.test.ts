import request from 'supertest';
import app from '../src/app'; // Import the app

// Mock data to use in tests
const newAccount = { customerName: "Mayur Mulani", balance: 500 };
let accountId: number;

describe(' Autograb Bank API Endpoints', () => {

  // Test for creating a new account
  it('POST /api/customerAccounts - Create a new account', async () => {
    const res = await request(app).post('/api/customerAccounts').send(newAccount);
    expect(res.statusCode).toBe(201);
    expect(res.body.customerName).toBe(newAccount.customerName);
    expect(res.body.balance).toBe(newAccount.balance);
    accountId = res.body.id; // Save account ID for other tests
  });

  // Test for fetching account by ID
  it('GET /api/customerAccounts/:id - Get account by ID', async () => {
    const res = await request(app).get(`/api/customerAccounts/${accountId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.customerName).toBe(newAccount.customerName);
    expect(res.body.balance).toBe(newAccount.balance);
  });

  // Test for depositing funds
  it('POST /api/customerAccounts/:id/deposit - Deposit funds into account', async () => {
    const res = await request(app)
      .post(`/api/customerAccounts/${accountId}/deposit`)
      .send({ amount: 200 });
    expect(res.statusCode).toBe(200);
    expect(res.body.balance).toBe(newAccount.balance + 200);
  });

  // Test for withdrawing funds
  it('POST /api/customerAccounts/:id/withdraw - Withdraw funds from account', async () => {
    const res = await request(app)
      .post(`/api/customerAccounts/${accountId}/withdraw`)
      .send({ amount: 100 });
    expect(res.statusCode).toBe(200);
    expect(res.body.balance).toBe(newAccount.balance + 200 - 100);
  });

  // Test for transferring funds between accounts
  it('POST /api/customerAccounts/transfer - Transfer funds between accounts', async () => {
    // Create a second account to transfer funds
    const receiverRes = await request(app).post('/api/customerAccounts').send({ name: "Mayur Mulani", balance: 300 });
    const receiverId = receiverRes.body.id;

    const transferAmount = 50;
    const res = await request(app)
      .post('/api/customerAccounts/transfer')
      .send({ fromAccountId: accountId, toAccountId: receiverId, amount: transferAmount });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Transfer successful');
    expect(res.body.senderAccount.balance).toBe(newAccount.balance + 200 - 100 - transferAmount);
    expect(res.body.receiverAccount.balance).toBe(300 + transferAmount);
  });

  // Test for checking total balance in bank
  it('GET /api/customerAccounts/totalBalance - Get total balance in bank', async () => {
    const res = await request(app).get('/api/customerAccounts/totalBalance');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('totalBalance');
  });
});
