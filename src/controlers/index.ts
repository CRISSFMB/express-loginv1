import { Request, Response } from "express";
import User from "../models/User";

import { checkpassword, hashPassword } from "../utils/auth";


export const createUser = async (req: Request, res: Response) => {


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


export const login = async (req: Request, res: Response) => {


    // recibimos el email y la contraseña del body de la peticion
    const { email, password } = req.body;


    // usamos findOne para buscar si el usuario ya existe en la base de datos
    const user = await User.findOne({ email })


    // usamos findOne para buscar si el usuario ya existe en la base de datos
    const passwordUser = await User.findOne({ password })

    console.log(passwordUser)

    // validamos el email 
    if (!user) {
        const error = new Error('user does not exist');
        return res.status(404).json({
            message: error.message
        });
    }


    const check = await checkpassword(password, user.password)


    if (!check) {
        const error = new Error('La contraseña es incorrecta');
        return res.status(401).json({
            message: error.message
        });
    }

    res.send("Login successful")

}

