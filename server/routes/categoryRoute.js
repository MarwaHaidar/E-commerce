import express from 'express';
import upload from '../controllers/imageuploadcontroller.js';
import { createcategory, getcategories,getcategory,updatecategory,deletecategory } from '../controllers/categorycontroller.js';
// import subcategoriesRoute from './subcategoryRoute.js';
import { validateToken,validateTokenForAdmin } from '../Middleware/validateTokenHandler.js';


const router = express.Router();

router.post('/admin/categories',validateToken,validateTokenForAdmin,upload.single("image"), createcategory)
router.put('/admin/categories/:id', upload.single("image"), updatecategory)
router.get('/categories',validateToken, getcategories)
router.get('/categories/:id', getcategory)
router.delete('/admin/categories/:id',validateToken,validateTokenForAdmin,deletecategory)
// Assuming createcategory is a function defined in your controllers/categorycontroller.js file
// router.post('/',createcategory);

// router.use('/categories/:id/',subcategoriesRoute) 

export default router;
