import mongoose from 'mongoose';
import {Schema,model} from 'mongoose';


// const categoryModel=require('./category').schema;

const subcategorySchema = new Schema({
    name: { type: String, 
             required: true,
            unique: [true,'name must be unique'],
            minlength:[2,'name too short'],
            maxlength:[32,'name too long']
         },
    slug: {type: String,
           lowercase: true},
    desc: { type: String },
    image:{type: String},
    category: { type: Schema.Types.ObjectId, 
                ref: 'Category', 
                 required: true },
                // [categoryodel],
  },{timestamps:true});
  
  const Subcategory = mongoose.model('Subcategory', subcategorySchema);
  export default Subcategory;
  