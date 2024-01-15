
import {Schema,model} from 'mongoose';

const currencySchema = new Schema({
  code: { type: String, required: true, unique: true }, // Currency code (e.g., USD, EUR)
  symbol: { type: String, required: true }, // Currency symbol (e.g., $, €)
//   name: { type: String, required: true }, // Currency name (e.g., US Dollar, Euro)
});

const Currency = model('Currency', currencySchema);

export default Currency;