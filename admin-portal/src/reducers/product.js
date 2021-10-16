import axios from "../axios"
import { productConstants } from "../actions/constants";


const getAllProducts = async()=>{
    const res = await axios.get(`product/getproducts`);
    return res.data;
}
const initialState={
    loading:false,
    products:[],
    error:""
}
getAllProducts().then(result=>{
    initialState.products=result;
});
const buildUpdatedProducts=(product,products)=>{
    console.log(product)
    return [
        ...products,
        {
            _id:product._id,
            name:product.name,
            price:product.price,
            description:product.description,
            quantity:product.quantity,
            pictures:product.pictures,
            category:{_id:product.category._id,name:product.category.name},
            createdBy:product.createdBy,
            createdAt:product.createdAt,
            slug:product.slug,
            updatedAt:product.updatedAt
        }
    ]
}
const productReducer =(state=initialState,action)=>{
    switch(action.type){
        case productConstants.ADD_NEW_PRODUCT_REQUEST:
            state={
                ...state,
                loading:true
            };
            break;
        case productConstants.ADD_NEW_PRODUCT_SUCCESS:
            const product=action.payload.product;
            const updatedProducts=buildUpdatedProducts(product,state.products);
            state={
                ...state,
                loading:false,
                products:updatedProducts
            }
            break;
        case productConstants.ADD_NEW_PRODUCT_FAILURE:
            state={
                ...state,
                loading:false,
                error:action.payload
            };
            break;
        default:
    }
    return state;
}

export default productReducer