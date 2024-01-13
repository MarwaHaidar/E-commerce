import mongoose from 'mongoose';
import {Schema,model} from 'mongoose';
// const categoryModel=require('./category').schema;

const subcategorySchema = new Schema({
    title: { type: String, 
             required: true },
    description: { type: String },
    category: { type: Schema.Types.ObjectId, 
                ref: 'Category', 
                required: true },
                // [categoryodel],
  });
  
  const Subcategory = mongoose.model('Subcategory', subcategorySchema);
  