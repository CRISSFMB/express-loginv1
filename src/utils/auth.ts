
// como se utiliza 


import bcrypt from "bcrypt"

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const scryptPassword = await bcrypt.hash(password, salt);
    return scryptPassword;
}



