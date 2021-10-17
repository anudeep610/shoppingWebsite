import axios from "../axios";
import { categoryConstants } from "./constants";

const getAllCategory = () => {
    return async dispatch => {
        dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQUEST });
        const res = await axios.get(`category/getcategory`);
        const {error}=res;
        if (res.status === 200) {
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories: res.data }
            });
        } else {
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
                payload: { error }
            });
        }


    }
}
export const addCategory = (form) => {
    return async dispatch => {
        dispatch({ type: categoryConstants.ADD_NEW_CATEGORY_REQUEST });
        const res = await axios.post("category/create", {
            name:form.name,
            parentId:form.parentID
        });
        const {error}=res;
        if(res.status === 201){
            dispatch({
                type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
                payload:{ category: res.data} 
            });
            return true;
        }else{
            dispatch({
                type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
                payload: {error}
            });
            return false;
        }
    }
}

export const updateCategories = (form) => {
    return async dispatch => {
        dispatch({type:categoryConstants.UPDATE_CATEGORY_REQUEST});
        const res = await axios.post("category/update", form);
        const {error}=res;
        if(res.status === 201){
            dispatch({type:categoryConstants.UPDATE_CATEGORY_SUCCESS});
            dispatch(getAllCategory());
        }else{
            dispatch({
                type:categoryConstants.UPDATE_CATEGORY_FAILURE,
                payload:{error}
            })
        }
    }
}

export const deleteCate=(toBeDeletedIds)=>{
    return async dispatch =>{
        dispatch({type:categoryConstants.DELETE_CATEGORY_REQUEST});
        const res = await axios.post("category/delete",{toBeDeletedIds});
        const {error}=res;
        if(res.status===201){
            dispatch({type:categoryConstants.DELETE_CATEGORY_SUCCESS});
            dispatch(getAllCategory());
        }else{
            dispatch({
                type:categoryConstants.DELETE_CATEGORY_FAILURE,
                payload:{error}
            })
        }
    }
}

export{
    getAllCategory
}