import type { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import User, { IUser } from "../models/User";



// para que pueda req.user en el middleware

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}

export const autenticationToken = async (req: Request, res: Response, next: NextFunction) => {

    // obtenemos token del header de la peticion
    const bearer = req.headers.authorization;

    // validamos que el token exista en la peticion

    if (!req.headers.authorization) {
        const error = new Error('No token provided');
        return res.status(401).json({
            message: error.message
        });
    }

    const [, token] = bearer.split(" ");

    if (!token) {
        const error = new Error('No token provided');
        return res.status(401).json({
            message: error.message
        });
    }
    try {


        // verificamos el token

        const result = jwt.verify(token, process.env.JWT_SECRET);

        // si el token es valido, obtenemos el id del usuario
        // y buscamos el usuario en la base de datos
        if (typeof result === 'object' && result.id) {
            const user = await User.findById(result.id)

            if (!user) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }

            req.user = user;
            next();
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Invalid token',
        });

    }



}
