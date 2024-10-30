import mongoose from "mongoose";

const servicesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        secure_url: { type: String, required: true },
        public_id: { type: String, required: true, unique: true },
        folder_id: { type: String, unique: true, required: true }
    }
},
{ timestamps: true });

export const serviceModel = mongoose.models.Service || mongoose.model('Service', servicesSchema);
