import express from 'express';
import  {getProductCount}  from '../controllers/Chartcontrollers.js';
import {getCategoriesCount} from '../controllers/Chartcontrollers.js';
import { getsubcategoryCount } from '../controllers/Chartcontrollers.js';
import { getUserCount } from '../controllers/Chartcontrollers.js';
import {getUserCountByYear} from '../controllers/Chartcontrollers.js';
import {getOrdersByYear} from '../controllers/Chartcontrollers.js';
import {getUsersbyCountry} from '../controllers/Chartcontrollers.js';

const router = express.Router();

router.get('/productcount', getProductCount);
router.get('/categoriescount',getCategoriesCount);
router.get('/subcategorycount',getsubcategoryCount);
router.get('/usercount',getUserCount);
router.get('/usercountbyyear',getUserCountByYear);
router.get('/ordercountbyyear',getOrdersByYear);
router.get('/userscountbycountry',getUsersbyCountry);


export default router;