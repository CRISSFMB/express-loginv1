import { Request, Response } from "express";
import User from "../models/User";
import { validationResult } from "express-validator"
import { hashPassword } from "../utils/auth";


export const createUser = async (req: Request, res: Response) => {

    // manejar errores de expresss validator y con esto recuperamos los errores y detenemos el codigo

    // esta funcion siempre toma el request 
    let errors = validationResult(req);

    console.log(errors)

    // si hay errores, devolvemos un error 400 y el mensaje de error
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }




    // recibimos el email y la contraseña del body de la peticion
    const { email, password } = req.body;



    // usamos findOne para buscar si el usuario ya existe en la base de datos
    const userExist = await User.findOne({ email })


    // validamos el email 
    if (userExist) {
        const error = new Error('El email ya existe');
        return res.status(400).json({
            message: error.message
        });
    }

    const scryptPassword = await hashPassword(password)
    // hasheamos la contraseña

    try {
        const user = new User(req.body);

        user.password = scryptPassword;
        // guardamos el usuario en la base de datos
        await user.save();

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