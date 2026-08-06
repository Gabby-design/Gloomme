import { Router } from 'express';
import { profiles } from '../data/store.js';

const router = Router();

router.get('/', (_req, res) => {
  res.json(profiles);
});

router.post('/', (req, res) => {
  const profile = {
    id: `profile-${Date.now()}`,
    ...req.body
  };

  profiles.push(profile);
  res.status(201).json(profile);
});

export default router;
