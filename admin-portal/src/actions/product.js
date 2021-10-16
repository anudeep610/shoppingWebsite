import axios from "../axios"
import { productConstants } from "./constants";

export const addProduct=(productDetails)=>{
    return async dispatch=>{
        dispatch({type:productConstants.ADD_NEW_PRODUCT_REQUEST});
        const res=await axios.post("product/create",productDetails);
        if(res.status===201){
            dispatch({
                type:productConstants.ADD_NEW_PRODUCT_SUCCESS,
                payload:{product:res.data}
            });
        }else{
            dispatch({
                type:productConstants.GET_ALL_PRODUCTS_FAILURE,
                payload:res.data.error
            });
        }
    }
}