import express from 'express';
const router = express.Router();

router.post('/auth/register', (req, res) => {
    res.status(201).json({ message: 'Usuario recibido', data: req.body });
});

export default router;