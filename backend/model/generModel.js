import mongoose from "mongoose";

const generSchema = new mongoose.Schema({
     genere_name:{
        type: String,
        required: true,
     },
    genere_description:{
        type: String,
        required: true,
    }
    }, {
    timestamps: true,
}); 

export default mongoose.model('Gener', generSchema);    