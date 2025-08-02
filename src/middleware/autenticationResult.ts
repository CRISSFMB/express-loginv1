import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const autenticationResult = async (req: Request, res: Response, next: NextFunction) => {
    // manejar errores de expresss validator y con esto recuperamos los errores y detenemos el codigo

    // esta funcion siempre toma el request 
    let errors = validationResult(req);


    // si hay errores, devolvemos un error 400 y el mensaje de error
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }
    next()

}