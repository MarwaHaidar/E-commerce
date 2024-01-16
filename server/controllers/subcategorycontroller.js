import Subcategory from '../models/subcategory.js';
import slugify from 'slugify';
import asyncHandler from 'express-async-handler';

const createsubcategory = asyncHandler(async(req,res) =>{
    if(!req.body.category)
    req.body.category =req.params.id; // if the category doesn't exist in body , get the the id of category from params in put in the body category

    // console.log(req.body.category);
    const name = req.body.name;
    const category=req.body.category;
    const desc=req.body.desc;
    const subcategory = await Subcategory.create({name,slug:slugify(name),category,desc});
    res.status(201).json({data: subcategory});

})

export { createsubcategory };


// to apply pagenation:
/* desc:  get list subcategory 
   route: get /api/v1/subcategories?page & limit=     */
   const getsubcategories=asyncHandler(async(req,res)=>{
    const page=req.query.page*1 || 1;// req.query: take data from url not from req body, *1 to change it from string to number
    const limit=req.query.limit*1 || 5; // in selected page give 5 categories
    const skip=(page-1)*limit

     let filterObject = {};
     if(req.params.id)
        filterObject = { // get the id of category from params
            category:req.params.id
        }
        // console.log(req.params.id)
        const subcategories=await Subcategory.find(filterObject) // if have req.params filter the subcategory for this category req.params 
        .skip(skip)
        .limit(limit)
        // .populate({path:'category',select:'name-_id'});// select the name from category -_id mean remove the select id
        res.status(200).json({result:subcategories.length,page,data:subcategories});
    });


export {getsubcategories};



// get specific subcategory
/* desc:  get specific subcategory by id 
   route: get /api/v1/subcategories/:id*/

   const getsubcategory=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    const subcategory=await Subcategory.findById(id)
    // .populate({path:'category',select:'name-_id'});// select the name from category -_id mean remove the select id;
    if(!subcategory){
        res.status(404).json({msg:`no category for this id ${id}`})
    }
    res.status(200).json({data:subcategory})
   })

   export {getsubcategory};


   //update specific category:

const updatesubcategory=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    const {name}=req.body;
    const {desc}=req.body;
    const subcategory=await Subcategory.findOneAndUpdate(
        {_id:id},
        {name,slug:slugify(name),desc},
        {new:true})// return update it category after update
        if(!subcategory){
            res.status(404).json({msg:`no category for this is ${id}`})
        }
        res.status(200).json({data:subcategory})
   
})
export {updatesubcategory}


// delete specific category
const deletesubcategory = asyncHandler(async(req,res) =>{

    const {id} = req.params;
    const subcategory = await Subcategory.findOneAndDelete({_id:id});
    if(!subcategory){
        res.status(404).json({msg:`NO CATEGORY FOR THIS ID ${id}`});

    }
    res.status(200).json({msg: `the category  was deleted successfully`})
}) 
export {deletesubcategory}
