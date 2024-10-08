import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    order:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    book:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'books'
    },
    status:{
        type: String,
        defaultValue: 'place order',
        enum:['place order','out for delivery','delivered','cancelled',]
    },
},{timestamps: true})

export default mongoose.model('order', orderSchema)

