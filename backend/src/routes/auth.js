import { Router } from 'express';
import AuthService from '../services/authService.js';

const router = Router();

router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const result = await AuthService.register({
      email,
      password,
      firstName,
      lastName,
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await AuthService.login(email, password);
    res.json(result);
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
});

export default router;
