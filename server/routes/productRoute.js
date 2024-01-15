import express from 'express';
import {createProduct ,getproducts,getproduct,updateproduct,deleteproduct} from '../controllers/productcontroller.js'


const router = express.Router();

router.post('/admin/product',createProduct);
router.get('/products',getproducts);
router.get('/products/:id',getproduct);
router.put('/admin/products/:id',updateproduct);
router.delete('/products/:id',deleteproduct);


export default router;