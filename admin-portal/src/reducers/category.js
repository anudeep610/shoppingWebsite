import { categoryConstants } from "../actions/constants";
import axios from "../axios";

let obtainedCategories=[];

const getAllCategories = async ()=>{
    const res = await axios.get("category/getcategory");
    return res.data;
}

const initialState={
    loading:false,
    categories:obtainedCategories,
    error:""
}

getAllCategories().then(result=>{
    initialState.categories=result;
});

const buildNewCategories = (parentId, categories, category) => {
    let myCategories = [];
    if(parentId === undefined){
        return [
            ...categories,
            {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                children: []
            }
        ];
    }
    for(let cat of categories){
        if(cat._id === parentId){
            myCategories.push({
                ...cat,
                children: cat.children ? buildNewCategories(parentId, [...cat.children, {
                    _id: category._id,
                    name: category.name,
                    slug: category.slug,
                    parentId: category.parentId,
                    children: category.children
                }], category) : []
            });
        }else{
            myCategories.push({
                ...cat,
                children: cat.children ? buildNewCategories(parentId, cat.children, category) : []
            });
        }
    }
    return myCategories;
}

const categoryReducer = (state = initialState, action) => {
    switch(action.type){
        case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
        state = {
            ...state,
            loading: true
        }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
            state={
                ...initialState
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
            const category = action.payload.category;
            const updatedCategories = buildNewCategories(category.parentId, state.categories, category);
            console.log('updated categoires', updatedCategories);
            state = {
                ...state,
                categories: updatedCategories,
                loading: false,
            }
            break;
    }
    return state;
}

export default categoryReducer;
