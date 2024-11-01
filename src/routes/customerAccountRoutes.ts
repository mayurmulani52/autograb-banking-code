import express from 'express';
import {
  createAccount,
  getAccountById,
  depositFunds,
  withdrawFunds,
  transferFunds,
  totalBalanceFunds
} from '../controllers/customerAccountController';

const router = express.Router();

router.get('/totalBalance', totalBalanceFunds);                // Get total balance in bank
router.post('/', createAccount);                // Create a new account
router.get('/:id', getAccountById);             // Get account details by ID
router.post('/:id/deposit', depositFunds);      // Deposit funds into account
router.post('/:id/withdraw', withdrawFunds);    // Withdraw funds from account
router.post('/transfer', transferFunds);        // Transfer funds from customer account to another customer account'

export default router;
