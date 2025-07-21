
export interface IUser {
    handle: string;
    name: string;
    email: string;
    password: string;
}

import mongoose, { Schema } from 'mongoose';


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    handle: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
});


const User = mongoose.model<IUser>('User', userSchema);

export default User;
