import express from 'express';
import upload from '../controllers/imageuploadcontroller.js';
import { createsubcategory, getsubcategories, getsubcategory, updatesubcategory, deletesubcategory } from '../controllers/subcategorycontroller.js';
import productRoute from './productRoute.js';
import {
    validateToken,
    validateTokenForAdmin,
  } from "../Middleware/validateTokenHandler.js";

const router = express.Router({mergeParams: true }); //mergeParms allow to acces parameters on other router

router.post('/admin/subcategories', validateToken,
validateTokenForAdmin, upload.single("image"), createsubcategory)

router.put('/admin/subcategories/:id',  validateToken,
  validateTokenForAdmin, upload.single("image"), updatesubcategory)

router.delete('/admin/subcategories/:id',
validateToken,
validateTokenForAdmin,
 deletesubcategory)
 
router.get('/subcategories', getsubcategories)
router.get('/subcategories/:id', getsubcategory)


router.use("/subcategories/:id/", productRoute );

export default router;