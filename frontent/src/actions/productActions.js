import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
 } from '../constants/productConstatnts' 
 import axios from 'axios'

//Fetch products from backend
// and dispatch that action to reducer
// listProducts for all products
 export const listProducts = () => async (dispatch) => {
    try{
        dispatch({ type: PRODUCT_LIST_REQUEST }) // call action from reducers/productReducers csae: PRODUCT_LIST_REQUEST

        const { data } = await axios.get('/api/products') // get data from backend

        dispatch({  // call action from reducers/productReducers csae: PRODUCT_LIST_SUCCESS
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    } catch(error) {
        dispatch({ // call action from reducers/productReducers csae: PRODUCT_LIST_FAIL
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
 }

// listProductDetails for a specific product
 export const listProductDetails = (id) => async (dispatch) => {
    try{
        dispatch({ type: PRODUCT_DETAILS_REQUEST }) 

        const { data } = await axios.get(`/api/products/${id}`) 

        dispatch({  
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data,
        })
    } catch(error) {
        dispatch({ 
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
 }