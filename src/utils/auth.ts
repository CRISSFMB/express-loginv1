


import bcrypt from "bcrypt"

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const scryptPassword = await bcrypt.hash(password, salt);
    return scryptPassword;
}

export const checkpassword = async (password: string, passwordDb: string) => {
    console.log(password)
    const result = await bcrypt.compare(password, passwordDb);
    return result;
}



