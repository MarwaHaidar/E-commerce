import express from 'express';
import { createsubcategory,getsubcategories,getsubcategory,updatesubcategory,deletesubcategory } from '../controllers/subcategorycontroller.js';

const router = express.Router();

router.post('/admin/subcategories',createsubcategory)
router.put('/admin/subcategories/:id',updatesubcategory)
router.get('/subcategories',getsubcategories)
router.get('/subcategories/:id',getsubcategory)
router.delete('/subcategories/:id',deletesubcategory)


export default router;