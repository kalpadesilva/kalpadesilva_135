import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
    {
        firstname: {
            type: String,
            required: [true, "First name is required"]
        },
        lastname: {
            type: String,
            required: [true, "Last name is required"],
        },
        username: {
            type: String,
            required: [true, "Username is required"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
    },
    {
        timestamps: true,
    }
);


export const User = mongoose.model('User', userSchema);
