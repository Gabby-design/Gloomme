import { Router } from 'express';
import { connections } from '../data/store.js';

const router = Router();

router.get('/', (_req, res) => {
  res.json(connections);
});

router.post('/', (req, res) => {
  const connection = {
    id: `conn-${Date.now()}`,
    ...req.body
  };

  connections.push(connection);
  res.status(201).json(connection);
});

export default router;
