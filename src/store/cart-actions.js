import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData=()=>{
    return async(dispatch)=>{
        const fetchData=async()=>{
            const res=await fetch('https://react-http-916a4-default-rtdb.firebaseio.com/cart.json');
            if(!res.ok){
                throw new Error("Could not fetch cart data");
            }
            const data=res.json();
            return data;
        }
        try{
           const cartData=await fetchData();
           dispatch(cartActions.replaceCart({
                            items:cartData.items||[],
                            totalQuantity:cartData.totalQuantity,
                        }));
        }catch(error){
            dispatch(uiActions.showNotification({
                status:'error',
                title:'Error!',
                message:'Fetching  cart data failed!',
              }))
        }
    }
}

export const sendCartData=(cart)=>{
    return  async(dispatch)=>{
      dispatch(uiActions.showNotification({
        status:'pending',
        title:'sending',
        message:'sending cart data!',
      }));
  
      const sedRequest=async()=>{
        const res=await fetch('https://react-http-916a4-default-rtdb.firebaseio.com/cart.json',{
          method: "PUT",
          body:JSON.stringify({
            items:cart.items,
            totalQuantity:cart.totalQuantity}),
        })
        if(!res.ok){
          throw new Error("seding Data failed");
      }
  
      }
      try{
        await sedRequest();
        dispatch(uiActions.showNotification({
          status:'success',
          title:'Success!',
          message:'Sent cart data! successfully',
        }))
      }catch(error){
        dispatch(uiActions.showNotification({
          status:'error',
          title:'Error!',
          message:'sending cart data failed!',
        }))
      }
  
      
    }
  }