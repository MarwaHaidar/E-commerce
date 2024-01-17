import Currency from '../models/currency.js'
import asyncHandler from 'express-async-handler';


// create Currency
const createCurrency = asyncHandler(async(req,res)=>{
    const code = req.body.code;
    const symbol = req.body.symbol;

    const currency = await Currency.create({code,symbol});
    res.status(201).json({data:currency});
    
    });
    export { createCurrency };


 // get all Currencies
const getcurrencies = asyncHandler(async(req,res)=>{
    const currency= await Currency.find({});
    res.status(200).json({data:currency});
    });
     
    export { getcurrencies };


    // get specific currency

const getcurrency = asyncHandler(async(req,res)=>{
    const { id } = req.params;
    const currency = await Currency.findById(id);
    if(!currency){
     res.status(404).json({msg:`no currency for this id ${id}`})
    }
    res.status(200).json({data:currency})
    });
    export { getcurrency };
    


    // update specific currency 

const updatecurrency  = asyncHandler(async(req,res)=>{
    const { id } = req.params;
    const {code}=req.body;
    const {symbol}=req.body;

      const currency = await Currency.findOneAndUpdate(
        { _id: id },
        { code,symbol },
        { new: true }
      );
    
        if(!currency){
            res.status(404).json({msg:`no currency for this is ${id}`})
        }
        res.status(200).json({data:currency})
    })
    export { updatecurrency };




    // delete specific currency 

const deletecurrency  = asyncHandler(async(req,res) =>{

    const {id} = req.params;
    const currency = await Currency.findOneAndDelete({_id:id});
    if(!currency){
        res.status(404).json({msg:`NO currency FOR THIS ID ${id}`});

    }
    res.status(200).json({msg: `the currency  was deleted successfully`})
}) 
export {deletecurrency}

    