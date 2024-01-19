import Order from "../models/order.js";
import asyncHandler from 'express-async-handler';
import OrderItem from '../models/orderItems.js';



//total Status whith  delivery order
function TotalFu(TotalAmount) {
    if (TotalAmount > 100) {
        return TotalAmount;
    } else {
        return TotalAmount + 10;
    }
}
// create order
    const createOrder = asyncHandler(async(req,res)=>{

// --------------function to return only the ids of products in array orderItems in the collection order  ---------------//
    const orderItemsIds= Promise.all(req.body.orderItems.map(async orderitem=>{ // Promise.all is for merge the ids
        let newOrderItem = new OrderItem({
        product: orderitem.product ,
        quantity: orderitem.quantity
        })

        newOrderItem = await newOrderItem.save();

        return newOrderItem._id;
    }));
    const orderItemsIdsResolved = await orderItemsIds;

    //EX: orderItemsIdsResolved is array of Ids
    //[
    //     new ObjectId('65a93857d4c4a1d967c607da'),
    //     new ObjectId('65a93857d4c4a1d967c607db')
    //   ]


    // console.log(orderItemsIdsResolved);

// -----------------------------//
const TotalAmount = await Promise.all(orderItemsIdsResolved.map(async orderItemsId =>{ 
    const orderItem = await OrderItem.findById(orderItemsId)
    .populate('product')
    // console.log(orderItem);
    // res.json(orderItem);

    const price = orderItem.product.price; // get price 
    const quantity = orderItem.quantity; // get quantity

    const totalAmount = price * quantity
    // console.log(totalAmount);
    return totalAmount;
}))

// console.log(TotalAmount);

const sumTotalAmount = TotalAmount.reduce((a,b)=>a+b,0); // sum of all values in array TotalAmount
// console.log(sumTotalAmount);

 // -----------------------------//
 const subTotalStatus = TotalFu(sumTotalAmount);
//  console.log(subTotalStatus);

// -----------------------------//
    const userId = req.body.userId;
    const orderItems = orderItemsIdsResolved;
    const totalAmount = sumTotalAmount;
    const status = req.body.status;
    const TotalStatus = subTotalStatus;

    
    const order = await Order.create({userId,orderItems,totalAmount,TotalStatus,status});
    res.status(201).json({data:order});
    });
    export { createOrder };


    // get all oders
const getorders = asyncHandler(async(req,res)=>{

    const orders= await Order.find()
    .populate({path:'orderItems'}) // get all product in the order
    .populate({        // get the first and last name of th user in order
        path: 'userId',
        select: ['first_name','last_name'],
    }).sort({ dateOrdered: -1 }); // 1 for ascending order, -1 for descending order
    res.status(200).json({data:orders});
    
    });
    
    
    export { getorders };


   
     // get specific order

 const getorder = asyncHandler(async(req,res)=>{
    const { id } = req.params;

    const order = await Order.findById(id)
    .populate({path:'orderItems'}) // get all product in the order
    .populate({        // get the first and last name of th user in order
        path: 'userId',
        select: ['first_name','last_name'],
    }).sort({ dateOrdered: -1 }); // 1 for ascending order, -1 for descending order


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



    
// delete specific order and their orderItems

const deleteorder = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const order = await Order.findOne({ _id: id });
    if (!order) {
        return res.status(404).json({ msg: `No order for this ID ${id}` });
    }
    // Delete the associated orderItems
    const orderItemIds = order.orderItems; //This line retrieves the orderItems field from the order
    await OrderItem.deleteMany({ _id: { $in: orderItemIds } }); //delete multiple documents from the OrderItem collection

    // Now, delete the order itself
    await Order.findOneAndDelete({ _id: id });

    res.status(200).json({ msg: `The order and its associated orderItems were deleted successfully` });
});

export { deleteorder };




 // get getorderInDetails order

 const getorderInDetails = asyncHandler(async(req,res)=>{
    const { id } = req.params;

    const order = await Order.findById(id)
    .populate({
        path: 'orderItems',select:'-_id-__v',
        populate: {
            path: 'product',
            select: 'name-_id',
            populate: {
                path: 'subcategory',
                select: 'name-_id'
            }
        }
    })
    .populate({        // get the first and last name of th user in order
        path: 'userId',
        select: ['first_name','last_name'],
    }).sort({ dateOrdered: -1 }); // 1 for ascending order, -1 for descending order;



    if(!order){
     res.status(404).json({msg:`no order for this id ${id}`})
    }
    res.status(200).json({data:order})
    });
    export {  getorderInDetails };



     // get history orders of specific  user

 const getHistoryOrderUser = asyncHandler(async(req,res)=>{
    const { id } = req.params;
    const order = await Order.find({ userId: id }) // id of user 
    .populate({path:'orderItems'}) // get all product in the order
    .populate({        // get the first and last name of th user in order
        path: 'userId',
        select: ['first_name','last_name'],
    }).sort({ dateOrdered: -1 }); // 1 for ascending order, -1 for descending order

    if(!order){
     res.status(404).json({msg:`no order for this id ${id}`})
    }
    res.status(200).json({data:order})
    });

    export {  getHistoryOrderUser };

 