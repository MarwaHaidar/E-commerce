import mongoose from 'mongoose';
import {Schema,model} from 'mongoose';

const categorySchema = new Schema({
    title: { type: String, 
             required: true },
    description: { type: String },
  });
  
  const Category = mongoose.model('Category', categorySchema);
  export default Category;