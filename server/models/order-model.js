import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    orderId: {
        type: String,
        required: [true, 'Order ID is required'],
        unique: true
    },
    productIds: [{
        type: mongoose.Schema.ObjectId,
        ref: 'product',
    }],
    product_details: {
        name: String,
        Image: Array,
    },
    paymentId: {
        type: String,
        default: ''
    },
    payment_status: {
        type: String,
        default: ''
    },  
    dilivery_address: {
        type: mongoose.Schema.ObjectId,
        ref: 'address',
    },
    subTotalAmt: {
        type: Number,
        required: true
    },
    totalAmt: {
        type: Number,
        required: true
    },
    invoice_reciept: {
        type: String,
        default: ''
    },
}, {
    timestamps: true
});

const OrderModel = mongoose.model('order', orderSchema);
export default OrderModel;
