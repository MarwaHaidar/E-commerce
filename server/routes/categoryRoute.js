import express from 'express';
import { createcategory, getcategories,getcategory,updatecategory,deletecategory } from '../controllers/categorycontroller.js';
import subcategoriesRoute from './subcategoryRoute.js'

const router = express.Router();

// Assuming createcategory is a function defined in your controllers/categorycontroller.js file
// router.post('/',createcategory);
router.post('/admin/categories',createcategory)
router.put('/admin/categories/:id',updatecategory)
router.get('/categories',getcategories)
router.get('/categories/:id',getcategory)
router.delete('/categories/:id',deletecategory)


router.use('/categories/:id/',subcategoriesRoute) 

export default router;
