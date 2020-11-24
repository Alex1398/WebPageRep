import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema({
    name: { type: String, required: true },
    rating: { type: Number, required: true }, // rating of one review
    comment: { type: String, required: true }
}, {
    timestamps: true
})

const productSchema = mongoose.Schema(
{
    user: {  // Create relationship between user and product
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }, 
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    reviews: [reviewSchema],
    rating: { // Average of all reviews ratings
        type: Number,
        required: true,
        default: 0
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true  // Mongoose schemas have a timestamps option that tells Mongoose to automatically manage createdAt and updatedAt properties on your documents.
})

const Product = mongoose.model('Product', productSchema)

export default Product