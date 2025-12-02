import { Router } from 'express';
import { body } from 'express-validator';
import { register, login } from '../controllers/authController';

const router = Router();

router.post('/register',
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  body('displayName').notEmpty(),
  register
);

router.post('/login',
  body('email').isEmail(),
  body('password').notEmpty(),
  login
);

export default router;
