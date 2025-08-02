import express from 'express';
import { body } from 'express-validator';
import { createUser, getuser, login } from './controlers';
import { autenticationResult } from './middleware/autenticationResult';
import { autenticationToken } from './middleware/autenticationToken';
const router = express.Router();

// express validator : vamos a validar el body con la funcion que nos proporciona


router.post('/auth/register',
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("email is required"),
    body("password").isLength({ min: 8 }).withMessage("password is required and must be between 8 characters"),
    autenticationResult,
    createUser);



router.post("/auth/login",
    body("email").isEmail().withMessage("email is required"),
    body("password").notEmpty().withMessage("password is required"),
    autenticationResult,
    login)

router.get("/getuser", autenticationToken, getuser)
export default router;