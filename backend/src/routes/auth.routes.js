import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { users } from '../data/store.js';

const router = Router();

router.post('/register', async (req, res) => {
  const { email, password, fullName } = req.body;

  if (!email || !password || !fullName) {
    return res.status(400).json({ message: 'Email, password, and fullName are required' });
  }

  const exists = users.some((user) => user.email === email);
  if (exists) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    id: `user-${Date.now()}`,
    email,
    fullName,
    passwordHash
  };

  users.push(user);

  const token = jwt.sign({ sub: user.id, email: user.email }, process.env.JWT_SECRET || 'dev-secret', {
    expiresIn: '7d'
  });

  return res.status(201).json({ token, user: { id: user.id, email: user.email, fullName: user.fullName } });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((entry) => entry.email === email);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ sub: user.id, email: user.email }, process.env.JWT_SECRET || 'dev-secret', {
    expiresIn: '7d'
  });

  return res.json({ token, user: { id: user.id, email: user.email, fullName: user.fullName } });
});

export default router;
