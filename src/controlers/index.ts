import { Request, Response } from "express";
import User from "../models/User";


export const createUser = async (req: Request, res: Response) => {

    try {
        await User.create(req.body);

        res.status(201).json({
            message: 'User registered successfully'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error registering user',
            error: error.message,
        })
    }

}