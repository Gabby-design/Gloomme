import { Router } from 'express';
import { opportunities } from '../data/store.js';

const router = Router();

router.get('/', (_req, res) => {
  res.json(opportunities);
});

router.post('/', (req, res) => {
  const opportunity = {
    id: `opp-${Date.now()}`,
    ...req.body
  };

  opportunities.push(opportunity);
  res.status(201).json(opportunity);
});

export default router;
