
/**
 * Christ Life Bweyogerere (CLB) Backend
 * Built with Express.js and TypeScript
 */

import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mock Data
let announcements = [
  { id: '1', title: 'Sunday Service', description: 'Exploring Hebrews 11' },
  { id: '2', title: 'Youth Overnight', description: 'Prayer and worship' }
];

let donations: any[] = [];

/**
 * ROUTES
 */

// 1. Fetch Announcements
app.get('/api/announcements', (req: Request, res: Response) => {
  res.json({
    status: 'success',
    data: announcements
  });
});

// 2. Initiate Payment (Simulates STK Push / USSD Generation)
app.post('/api/payments/initiate', (req: Request, res: Response) => {
  const { amount, phone, provider, purpose } = req.body;

  if (!amount || !phone || !provider) {
    return res.status(400).json({ error: 'Missing payment details' });
  }

  const mtnMerchant = '726123';
  const airtelMerchant = '4380286';

  let ussdString = '';
  if (provider === 'MTN') {
    // Standard MTN Uganda Pay Merchant USSD logic
    ussdString = `*165*3*${mtnMerchant}*${amount}#`;
  } else if (provider === 'AIRTEL') {
    // Standard Airtel Uganda Pay Merchant USSD logic
    ussdString = `*185*9*${airtelMerchant}*${amount}#`;
  }

  const transactionId = `CLB-TX-${Date.now()}`;
  
  console.log(`[PAYMENT SERVER] Initiating ${provider} payment for ${amount} UGX`);
  console.log(`[PAYMENT SERVER] Target: ${phone} | Purpose: ${purpose}`);
  console.log(`[PAYMENT SERVER] USSD Instruction: ${ussdString}`);

  // In a production environment, you would call a gateway like Yo! Payments or Flutterwave here
  // to trigger a real STK Push (the popup that asks for a PIN).
  
  res.json({
    status: 'initiated',
    transactionId,
    ussdInstruction: ussdString,
    message: `Payment request sent to ${phone}. If the prompt doesn't appear, dial ${ussdString}`
  });
});

// 3. Handle Donation Confirmations (Callback/Webhook simulation)
app.post('/api/donations', (req: Request, res: Response) => {
  const { amount, phone, type, donorName } = req.body;
  
  const newDonation = {
    id: Date.now().toString(),
    amount,
    phone,
    type,
    donorName,
    status: 'pending',
    timestamp: new Date()
  };

  donations.push(newDonation);
  console.log(`[CLB BACKEND] New donation recorded: ${amount} UGX from ${phone}`);

  res.status(201).json({
    status: 'success',
    message: 'Donation recorded successfully',
    data: newDonation
  });
});

app.listen(PORT, () => {
  console.log(`[CLB SERVER] Running on http://localhost:${PORT}`);
});
