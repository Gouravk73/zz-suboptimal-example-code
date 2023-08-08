import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from'./components/UI/Notification'
import { uiActions } from './store/ui-slice';
let isInitial = true;
function App() {
  const dispatch=useDispatch();

  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const notification = useSelector((state) => state.ui.notification);
  const cart= useSelector((state)=> state.cart);

  useEffect(() => {
    const SendCartData=async()=>{
      dispatch(uiActions.showNotification({
        status:'pending',
        title:'sending',
        message:'sending cart data!',
      }))
      const res=await fetch('https://react-http-916a4-default-rtdb.firebaseio.com/cart.json',{
      method: "PUT",
      body:JSON.stringify(cart)
    })
    if(!res.ok){
      throw new Error("seding Data failed");
    }
     dispatch(uiActions.showNotification({
      status:'success',
      title:'Success!',
      message:'Sent cart data! successfully',
    }))
    }
    if(isInitial){
      isInitial=false;
      return
    }
    SendCartData().catch(error=>{
      dispatch(uiActions.showNotification({
        status:'error',
        title:'Error!',
        message:'sending cart data failed!',
      }))
    })
  }, [cart,dispatch]);
  return (
    <>
    {notification&&<Notification 
          status={notification.status} 
          title={notification.title} 
          message={notification.message}  />}
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
    </>
  );
}

export default App;
