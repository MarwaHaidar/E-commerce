import Order from "../models/order.js";
import asyncHandler from 'express-async-handler';



// create order
const createOrder = asyncHandler(async(req,res)=>{
    const userId = req.body.userId;
    const productDetails = req.body.productDetails;
    const totalAmount = req.body.totalAmount;
    const status = req.body.status;

    
    const order = await Order.create({userId,productDetails,totalAmount,status});
    res.status(201).json({data:order});
    
    });
    export { createOrder };


    // get all oders
const getorders = asyncHandler(async(req,res)=>{

    const orders= await Order.find({});
    res.status(200).json({data:orders});
    
    });
    
    
    export { getorders };


    // get specific order

const getorder = asyncHandler(async(req,res)=>{
    const { id } = req.params;
    const order = await Order.findById(id);
    if(!order){
     res.status(404).json({msg:`no order for this id ${id}`})
    }
    res.status(200).json({data:order})
    });
    export {  getorder };
    



    // update specific order

const updateorder = asyncHandler(async(req,res)=>{
    const { id } = req.params;
    const {userId}=req.body;
    const {productDetails}=req.body;
    const {totalAmount}= req.body;
    const {status} = req.body;
   
      const order = await Order.findOneAndUpdate(
        { _id: id },
        { userId, productDetails, totalAmount, status},
        { new: true }
      );
    
        if(!order){
            res.status(404).json({msg:`no order for this is ${id}`})
        }
        res.status(200).json({data:order})
    })
    export { updateorder };



    
// delete specific order

const deleteorder = asyncHandler(async(req,res) =>{

    const {id} = req.params;
    const order = await Order.findOneAndDelete({_id:id});
    if(!order){
        res.status(404).json({msg:`NO order FOR THIS ID ${id}`});

    }
    res.status(200).json({msg: `the order  was deleted successfully`})
}) 
export {deleteorder}
