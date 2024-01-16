import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import multer from "multer";
dotenv.config();



cloudinary.config({
  cloud_name: process.env.CLOUD,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});



const upload = multer({ storage: multer.memoryStorage() });



const uploadImage = async (imageBuffer) => {
  try {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'your-folder', tags: 'your-tags' },
        (error, result) => {
          if (error) {
            reject(error.message);
          } else {
            resolve(result.secure_url);
          }
        }
      ).end(imageBuffer);
    });
  } catch (error) {
    throw new Error(`Error uploading image: ${error.message}`);
  }
};


export { uploadImage };
export default  upload ;
