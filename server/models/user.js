
import {Schema,model} from 'mongoose';


const userSchema = new Schema({
  first_name: { type: String, 
                required: true },
  last_name: { type: String, 
               required: true },
  address: { type: String, 
              },
  email: { type: String,
           required: true, 
           unique: true, 
           lowercase: true, 
           trim: true, 
           match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
           'Please enter a valid email address']},
  password: { type: String,
             required: true},
             
  // gender: { type: String, 
  //           enum: ['Male', 'Female', 'Prefer not to say'] },
  // age: { type: Number, 
  //        min: 0 },
  phone_number: { type: String, 
                  match: /^[0-9]{10,15}$/ },//numbers from 0 to 9 and length min:11 max:15;
  role: { type: String, 
          enum: ['user', 'admin'], 
          default: 'user' },
  access_token: { type: String },
  
  },{timestamps:true});

const User = model('User', userSchema);
export default User;