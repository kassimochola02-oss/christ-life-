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

// 2. Handle Donation Confirmations
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
  
  // Here you would normally integrate with a payment gateway like Flutterwave or Yo! Payments
  console.log(`[CLB BACKEND] New donation received: ${amount} UGX from ${phone}`);

  res.status(201).json({
    status: 'success',
    message: 'Donation recorded successfully',
    data: newDonation
  });
});

// 3. Community Group Messages
app.get('/api/groups/:groupId/messages', (req: Request, res: Response) => {
  const { groupId } = req.params;
  // Mock messages
  res.json([
    { id: '1', sender: 'Admin', text: `Welcome to the ${groupId} group!` },
  ]);
});

// 4. Live Stream Status
app.get('/api/stream/status', (req: Request, res: Response) => {
  res.json({
    isLive: false,
    viewerCount: 0,
    nextStream: '2023-10-29T10:00:00Z'
  });
});

app.listen(PORT, () => {
  console.log(`[CLB SERVER] Running on http://localhost:${PORT}`);
});
