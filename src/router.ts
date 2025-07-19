import express from 'express';
import User from './models/User';
import { createUser } from './controlers';
const router = express.Router();

router.post('/auth/register', createUser);

export default router;