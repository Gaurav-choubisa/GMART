import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema({
    name: {
        type: String,
        desfault: '',
    },
    image: {
        type: String,
        default: '',
    },
    category: [{
        type: mongoose.Schema.ObjectId,
        ref: 'category',
        required: true
    }],
}, {
    timestamps: true
});

const SubcategoryModel = mongoose.model('subcategory', subcategorySchema);
export default SubcategoryModel;
