import mongoose from "mongoose";

const shareSchema = new mongoose.Schema({
     post_Desc:{
        type: String,
        required: false,
     },
     post_man:{
        type: String,
        required: false,
     },
     image:{
        type: String,
        required: false,
    }
    }, {
    timestamps: true,
}); 

export const share = mongoose.model("share", shareSchema); 