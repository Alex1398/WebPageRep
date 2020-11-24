import mongoose from 'mongoose'

const orderSchema = mongoose.Schema(
{
    user: {  // Create relationship between user and order
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }, 
    orderItems: [
        {
            name: { type: String, required: true },
            qty: { type: Number, required: true },  //quantity
            image: { type: String, required: true },
            price: { type: Number, required: true },
            prpduct: {  // bind of which product was ordered
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            }
        }
    ],
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    paymentResult: { // this is gonna come from paypal
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String },
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    paidAt: {
        type: Date,
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false
    },
    delivredAt: {
        type: Date,
    },
  
}, {
    timestamps: true  // Mongoose schemas have a timestamps option that tells Mongoose to automatically manage createdAt and updatedAt properties on your documents.
})

const Order = mongoose.model('Order', orderSchema)

export default Order