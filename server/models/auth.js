import {Schema,model} from 'mongoose';

const authorSchema=new Schema({
    first_name: { type: String, 
                  required: true },
    last_name: { type: String, 
                 required: true },
    
    email: { type: String,
            required: true, 
            unique: true, 
            lowercase: true, 
            trim: true, 
            match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            'Please enter a valid email address']},
    password:{type: String,
           required: true,
        //    validate: {
        //       validator: value => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value),
        //       message: 'Password must include at least one letter and one number, and be at least 6 characters long.' }},
    },
    role: { type: String, 
             enum: ['user', 'admin'], 
             default: 'user' },
// verify_token: { type: String },
// verify_status: { type: Boolean, 
//            default: false },
},{timestamps:true});

  
  const Author = model('Author', authorSchema);
  export default Author;