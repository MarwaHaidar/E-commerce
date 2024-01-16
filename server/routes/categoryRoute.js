import express from 'express';
import upload from '../controllers/imageuploadcontroller.js';
import { createcategory, getcategories, getcategory, updatecategory, deletecategory } from '../controllers/categorycontroller.js';

const router = express.Router();

router.post('/admin/categories', upload.single("image"), createcategory)
router.put('/admin/categories/:id', upload.single("image"), updatecategory)
router.get('/categories', getcategories)
router.get('/categories/:id', getcategory)
router.delete('/categories/:id', deletecategory)

export default router;
