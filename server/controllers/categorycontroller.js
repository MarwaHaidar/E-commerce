import slugify from 'slugify';
import Category from '../models/category.js';
import asyncHandler from 'express-async-handler';
import { uploadImage } from "./imageuploadcontroller.js"


//  create a category
const createcategory = asyncHandler(async (req, res) => {
    try {
        const image = await uploadImage(req.file.buffer);
        const name = req.body.name;
        const desc = req.body.desc;
        const category = await Category.create({ name, slug: slugify(name), desc, image });
        res.status(201).json({ data: category });
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export { createcategory };


// Get all categories:
// in this function we will receive all categories in same page , but what if i have 1000 category 
// so we should make pagenation
// const getcategories=asyncHandler(async(req,res)=>{
//     const categories=await Category.find({});
//     res.status(200).json({result:categories.length,data:categories});
// });
// to apply pagenation:
/* desc:  get list of categories
   route: get /api/v1/categories?page & limit=     */
// const getcategories = asyncHandler(async (req, res) => {
//     // const page = req.query.page * 1 || 1;// req.query: take data from url not from req body, *1 to change it from string to number
//     // const limit = req.query.limit * 1 || 5; // in selected page give 5 categories
//     // const skip = (page - 1) * limit
//     const categories = await Category.find({});
//     res.status(200).json({ result: categories.length, page, data: categories });
// });
// export { getcategories };

const getcategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({});
    
    res.status(200).json({ result: categories.length, data: categories });
});

export { getcategories };

// get specific category
/* desc:  get specific category by id 
   route: get /api/v1/categories/:id*/

const getcategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
        res.status(404).json({ msg: `no category for this id ${id}` })
    }
    res.status(200).json({ data: category })
})

export { getcategory };

//update specific category:

const updatecategory = asyncHandler(async (req, res) => {
    try {
        let image;

        if (req.file) {
            image = await uploadImage(req.file.buffer);
        }

        const { id } = req.params;
        const { name, desc } = req.body;

        const category = await Category.findOneAndUpdate(
            { _id: id },
            { name, slug: slugify(name), desc, image },
            { new: true }
        );

        if (!category) {
            return res.status(404).json({ msg: `No category found for the given ID: ${id}` });
        }

        return res.status(200).json({ data: category });
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export { updatecategory };

// delete specific category
const deletecategory = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const category = await Category.findOneAndDelete({ _id: id });
    if (!category) {
        res.status(404).json({ msg: `NO CATEGORY FOR THIS ID ${id}` });

    }
    res.status(200).json({ msg: `the category  was deleted successfully` })
})
export { deletecategory }









