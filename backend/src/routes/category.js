const express = require("express");
const router = express.Router();
const slugify = require("slugify");
const Category = require("../models/category");
const { isAdmin } = require("../middleware/auth/isAdmin");
const { requireSignIn } = require("../middleware/auth/requireSignIn");

const createCategoryList = (categories, parentId = null) => {
    const categoryList = [];
    let category;
    if (parentId == null) {
        category = categories.filter(cat => cat.parentId == null);
    } else {
        category = categories.filter(cat => cat.parentId == parentId)
    }
    for (cate of category) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            parentId: cate.parentId,
            children: createCategoryList(categories, cate._id)
        });
    }
    return categoryList;
}
router.post("/category/create", requireSignIn, isAdmin, async (req, res) => {
    try {
        const catObj = {
            name: req.body.name,
            slug: slugify(req.body.name),
            parentId: null
        }
        if (req.body.parentId)
            catObj.parentId = req.body.parentId;
        const category = new Category(catObj);
        await category.save();
        res.status(201).send(category);
    } catch (err) {
        res.status(400).send({ message: err });
    }
});

router.get("/category/getcategory", async (req, res) => {
    try {
        let categories = await Category.find({});
        let categoryList = createCategoryList(categories);
        res.status(200).send(categoryList);
    } catch (error) {
        res.status(400).send({ message: error });
    }
});

router.post("/category/update",requireSignIn,isAdmin,async (req, res) => {
    try {
        if(req.body.length===0){
            return res.status(201).send({message:"nothing updated"});
        }
        else if (req.body.length>1) {
            let updatedCategories = [];
            for (let i = 0; i < req.body.length; i++) {
                const category = {
                    name:req.body[i].name,
                    slug:slugify(req.body[i].name)
                };
                if (req.body[i].parentId !== "") {
                    category.parentId = req.body[i].parentId;
                }
                const updatedCategory = await Category.findOneAndUpdate({ _id: req.body[i]._id }, category, { new: true });
                updatedCategories.push(updatedCategory);
            }
            return res.status(201).json( updatedCategories );
        } else {
            const category={
                name:req.body[0].name,
                slug:slugify(req.body[0].name)
            }
            if (req.body[0].parentId !== "") {
                category.parentId = req.body[0].parentId;
            }
            const updatedCategory = await Category.findOneAndUpdate({ _id:req.body[0]._id }, category, { new: true });
            return res.status(201).json( updatedCategory );
        }
    } catch (err) {
        return res.status(400).send({ message: err })
    }
});

module.exports = router;