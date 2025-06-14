import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    address_line: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true
});

const AddressModel = mongoose.model('address', addressSchema);   
export default AddressModel;
