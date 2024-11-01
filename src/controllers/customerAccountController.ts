import { Request, Response } from 'express';
import { customerAccounts, CustomerAccount } from '../models/customerAccount';

// Create Account
export const createAccount = (req: Request, res: Response): void => {
  const { customerName, balance } = req.body;
  const newAccount: CustomerAccount = { id: Date.now(), customerName, balance: balance || 0 };
  customerAccounts.push(newAccount);
  res.status(201).json(newAccount);
};

// Get Account by ID
export const getAccountById = (req: Request, res: Response): void => {
  const account = customerAccounts.find(a => a.id === parseInt(req.params.id));
  if (account) {
    res.json(account);
  } else {
    res.status(404).send('Account not found');
  }
};

// Deposit Funds
export const depositFunds = (req: Request, res: Response): (void) => {
  const account = customerAccounts.find(a => a.id === parseInt(req.params.id));
  const { amount } = req.body;
  let validation: boolean = true;

  if (!account) {
       validation = false;
       res.status(404).send('Account not found');
  }

  if (amount <= 0) {
       validation = false;
       res.status(400).send('Amount must be greater than zero');
  }

  account!=null && validation? account.balance += amount: null;
  res.json(account);
};

// Withdraw Funds
export const withdrawFunds = (req: Request, res: Response): void => {
  const account = customerAccounts.find(a => a.id === parseInt(req.params.id));
  const { amount } = req.body;
  let validation: boolean = true;

  if (!account) {
    validation = false;
     res.status(404).send('Account not found');
  }

  if (amount <= 0) {
     validation = false;
      res.status(400).send('Amount must be greater than zero');
  }

  if (account!=null && amount > account.balance) {
      validation = false;
      res.status(400).send('Insufficient funds');
  }

  account!=null && validation? account.balance -= amount:null;
  res.json(account);
};


export const transferFunds = (req: Request, res: Response): void => {
  const { fromAccountId, toAccountId, amount } = req.body;

  // Find sender and receiver accounts
  const senderAccount = customerAccounts.find(a => a.id === fromAccountId);
  const receiverAccount = customerAccounts.find(a => a.id === toAccountId);
  let validation: boolean = true;

  // Check if both accounts exist
  if (!senderAccount || !receiverAccount) {
     validation = false;
     res.status(404).send('One or both accounts not found');
  }

  // Check if the amount is valid
  if (amount <= 0) {
    validation = false;
     res.status(400).send('Transfer amount must be greater than zero');
  }

  // Check if sender has enough balance
  if (senderAccount!=null && senderAccount.balance < amount) {
    validation = false;
     res.status(400).send('Insufficient funds in sender’s account');
  }

  // Process the transfer
  senderAccount!=null && validation?senderAccount.balance -= amount:null;
  receiverAccount!=null && validation?receiverAccount.balance += amount:null;

   res.json({
    message: 'Transfer successful',
    senderAccount,
    receiverAccount,
  });
  };

  export const totalBalanceFunds = (req: Request, res: Response): void => {
    const totalBalance = customerAccounts.reduce((sum, customerAccount) => sum + customerAccount.balance, 0);
    res.json({ totalBalance });
  };