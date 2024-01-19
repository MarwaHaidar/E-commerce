import express from 'express';
import upload from '../controllers/imageuploadcontroller.js';
import { createProduct, getproducts, getproduct, updateproduct, deleteproduct ,FeaturedProducts} from '../controllers/productcontroller.js'


const router = express.Router();

router.post('/admin/product', upload.array("images"),  createProduct);
router.get('/products', getproducts);
router.get('/products/:id', getproduct);
router.put('/admin/products/:id', upload.array("images"), updateproduct);
router.delete('/products/:id', deleteproduct);
router.get('/features',FeaturedProducts)

export default router;



