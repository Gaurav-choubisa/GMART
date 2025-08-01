import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({ 
    employee_id : {
        type: String,
        unique : true
    },   
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true,'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],},
    avatar: {
        type: String,
        default: ''
    },
    mobile: {
        type: Number,
        default: null,
    },
    refresh_Token: {
        type: String,
        default: '',
    },
    verify_email: {
        type: Boolean,
        default: false,
    },
    last_login_date: {
        type: Date,
        default: "",
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'suspended'],
        default: 'active',
    },
    address_details:[ {
        type: mongoose.Schema.ObjectId, // Reference to Address model or a stringq    
        ref: 'address', // Assuming you have an Address model
    }
    ],
    shopping_cart:[ {
        type: mongoose.Schema.ObjectId, // Reference to Address model or a stringq    
        ref: 'cartProduct', // Assuming you have an Address model
    }
    ],
     orderHistory:[ {
        type: mongoose.Schema.ObjectId, // Reference to Address model or a stringq    
        ref: 'order', // Assuming you have an Address model
    }
  ],
    forgot_password_otp: {
    type: String,
    default: null,
    },
    forgot_password_expiry: {
        type: Date,
        default: "",
    },
    role: {
        type: String,
        enum: ['ADMIN', 'USER','IT-TEAM'],
        default: 'USER',
    },

}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});

const User = mongoose.model('User', userSchema);
export default User;


