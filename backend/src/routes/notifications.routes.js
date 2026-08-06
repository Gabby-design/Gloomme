import { Router } from 'express';
import { notifications } from '../data/store.js';

const router = Router();

router.get('/', (_req, res) => {
  res.json(notifications);
});

router.patch('/:id/read', (req, res) => {
  const item = notifications.find((entry) => entry.id === req.params.id);
  if (!item) {
    return res.status(404).json({ message: 'Notification not found' });
  }

  item.read = true;
  return res.json(item);
});

export default router;
