import { Router } from 'express';

const router = Router();

router.get('/metrics', (_req, res) => {
  res.json({
    users: 12,
    activeConnections: 8,
    opportunities: 15,
    reviews: 4
  });
});

export default router;
