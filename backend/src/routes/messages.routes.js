import { Router } from 'express';
import { messages } from '../data/store.js';

const router = Router();

router.get('/', (_req, res) => {
  res.json(messages);
});

router.post('/', (req, res) => {
  const message = {
    id: `msg-${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...req.body
  };

  messages.push(message);
  res.status(201).json(message);
});

export default router;
