import express from 'express';
import upload from '../controllers/imageuploadcontroller.js';
import { filterSortProducts, searchProducts } from '../controllers/searchfiltercontroller.js';
import { createProduct, getproducts, getproduct, updateproduct, deleteproduct ,FeaturedProducts} from '../controllers/productcontroller.js'
import { validateToken,validateTokenForAdmin } from '../Middleware/validateTokenHandler.js';



const router = express.Router({mergeParams: true }); //mergeParms allow to acces parameters on other router


router.post('/admin/product',
validateToken,validateTokenForAdmin ,
 upload.array("images"),  createProduct);

router.put('/admin/products/:id',
validateToken,validateTokenForAdmin ,
 upload.array("images"),
  updateproduct);

  router.delete('/admin/products/:id',
  // validateToken,validateTokenForAdmin,
   deleteproduct);

   
router.get('/products/search', searchProducts); 
router.get('/products/filter', filterSortProducts); 
router.get('/products/:id', getproduct);
router.get('/products', getproducts);

router.get('/features',FeaturedProducts);



export default router;



