import express from 'express';
import upload from '../controllers/imageuploadcontroller.js';
import { filterSortProducts, searchProducts } from '../controllers/searchfiltercontroller.js';
import { createProduct, getproducts, getproduct, updateproduct, deleteproduct ,FeaturedProducts} from '../controllers/productcontroller.js'



const router = express.Router();

router.post('/admin/product', upload.array("images"),  createProduct);
router.put('/admin/products/:id', upload.array("images"), updateproduct);
router.get('/products/search', searchProducts); 
router.get('/products/filter', filterSortProducts); 
router.get('/products/:id', getproduct);
router.get('/products', getproducts);
router.delete('/products/:id', deleteproduct);
router.get('/features',FeaturedProducts);



export default router;



