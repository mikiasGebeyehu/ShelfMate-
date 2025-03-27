import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: false,
    },
    DoB:{
        type: String,
        required: false,
    },
    phoneNumber:{
        type: String,
        required: false,
    },
    address:{
        type: String,
        required: false,
    },
    facebook:{
        type: String,
        required: false,
    },
    linkedIn:{
        type: String,
        required: false,
    },
    twitter:{
        type: String,
        required: false,
    },
    bio: {
        type: String,
        required: false,  
    }

    }, {
    timestamps: true,
});

export const user = mongoose.model("user", userSchema);