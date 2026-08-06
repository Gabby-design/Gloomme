import { Router } from 'express';
import { reviews } from '../data/store.js';

const router = Router();

router.get('/', (_req, res) => {
  res.json(reviews);
});

router.post('/', (req, res) => {
  const review = {
    id: `review-${Date.now()}`,
    ...req.body
  };

  reviews.push(review);
  res.status(201).json(review);
});

export default router;
