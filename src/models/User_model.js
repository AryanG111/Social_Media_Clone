import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
   { username: {
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
    firstName: {
        type: String,
        required: true,
        unique: false, 
        trim: true,
    },
    lastName: {
        type: String,
        required: false,
        unique: false, 
        trim: true,
    },
    password: {
        type: String,
        required: true,
        unique: false, 
        trim: true
    }
},
    {
        timestamps: true,
    }
);

export default mongoose.model("User", UserSchema);

