import mongoose from "mongoose";

const cartProductSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        default: 1,
    },
     userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
}, {
    timestamps: true
});

const CartProductModel = mongoose.model('CartProduct', cartProductSchema);
export default CartProductModel;
