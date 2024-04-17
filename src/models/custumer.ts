// models/client.ts
import mongoose from 'mongoose';

const custumerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: String,
});

export default mongoose.model('Custumer', custumerSchema);
