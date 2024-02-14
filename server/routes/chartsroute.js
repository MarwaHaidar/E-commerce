import express from 'express';
import  {getProductCount}  from '../controllers/Chartcontrollers.js';
import {getCategoriesCount} from '../controllers/Chartcontrollers.js';
import { getsubcategoryCount } from '../controllers/Chartcontrollers.js';
import { getUserCount } from '../controllers/Chartcontrollers.js';

const router = express.Router();

router.get('/productcount', getProductCount);
router.get('/categoriescount',getCategoriesCount);
router.get('/subcategorycount',getsubcategoryCount);
router.get('/usercount',getUserCount);


export default router;