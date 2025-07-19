import express from 'express';
import User from './models/User';
const router = express.Router();

router.post('/auth/register', async (req, res) => {
    try {
        await User.create(req.body);

        res.status(202).json({
            message: 'User registered successfully',
            user: req.body.name
        })
    } catch (error) {
        console.log(error.message);
    }
});

export default router;