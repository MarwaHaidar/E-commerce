import { Schema, model } from 'mongoose';





const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Category required'],
    unique: [true, 'Category must be unique'],
    minlength: [3, 'Too short category name'],
    maxlength: [32, 'Too long category name'],
    
  },
  slug: {
    type: String,
    lowercase: true
  },
  image: {
    type: String,
    required: [true, 'Categroy Image required'],
  },
  desc: { type: String },
}, { timestamps: true });

const Category = model('Category', categorySchema);

export default Category;