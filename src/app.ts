import express from 'express';
import bodyParser from 'body-parser';
import accountRoutes from './routes/customerAccountRoutes';

const app = express();

app.use(bodyParser.json()); // Parses JSON request bodies
app.use('/api/customerAccounts', accountRoutes); // Base path for account routes

export default app;
