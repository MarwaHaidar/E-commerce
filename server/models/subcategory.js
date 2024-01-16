import { Schema, model } from "mongoose";

const subcategorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Subcategory required"],
      unique: [true, "name must be unique"],
      minlength: [2, "name too short"],
      maxlength: [32, "name too long"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    desc: { type: String },
    image: {
      type: String,
      required: [true, " subcategory Image required"],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    // [categoryodel],
  },
  { timestamps: true }
);

const Subcategory = model("Subcategory", subcategorySchema);
export default Subcategory;
