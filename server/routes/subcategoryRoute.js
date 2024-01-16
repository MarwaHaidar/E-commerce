import express from 'express';
import upload from '../controllers/imageuploadcontroller.js';
import { createsubcategory, getsubcategories, getsubcategory, updatesubcategory, deletesubcategory } from '../controllers/subcategorycontroller.js';

const router = express.Router();

router.post('/admin/subcategories', upload.single("image"), createsubcategory)
router.put('/admin/subcategories/:id', upload.single("image"), updatesubcategory)
router.get('/subcategories', getsubcategories)
router.get('/subcategories/:id', getsubcategory)
router.delete('/subcategories/:id', deletesubcategory)

export default router;