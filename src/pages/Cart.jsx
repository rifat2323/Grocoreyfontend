import React,{useEffect,useState,useContext} from 'react'
import { getItem,deleteItem} from '../api/api'
import '../styles/cart.css'
import { DataProvider } from '../context/Context'
import Carrot from '../assets/carrot.png'
import { ButtonComponent } from '../slice-component/component'
import { FaPlus } from "react-icons/fa";
import { FiMinus } from "react-icons/fi";
import { TbArrowsCross } from "react-icons/tb";
import {Link} from 'react-router-dom'
import {loadStripe} from '@stripe/stripe-js';

const Cart = () => {
  const [cartItem, setCartItem] = useState([])
  const [total, setTotal] = useState('')
  const [isloading, setIsLoading] = useState(false)
  const [useNotLogIn,setUserNotLogIn] = useState(false)
  const {refreshtoken} = useContext(DataProvider)

  useEffect(()=>{
     const fetchData = async ()=>{
      setIsLoading(true)
      const data = await getItem('/user/getCart',refreshtoken)
        if(data.cart && data.total){
          setCartItem(data.cart)
          setTotal(data.total)
          setIsLoading(false)
        }
         if(data.response && data.response.status === 403){
          setUserNotLogIn(true)
          setIsLoading(false)
         }
   

     }
     fetchData()
  },[refreshtoken])
  useEffect(()=>{
     const totalReduce = cartItem.reduce((a,b)=>a+(b.productId.price*b.quantity),0)
      setTotal(totalReduce)

  },[cartItem])


  const handelDecriseQuantity = async(id)=>{
      const item = cartItem.map(item=>{

         if(item.productId._id ===id){
          if(item.quantity <1){
            return{...item, quantity:1}
          }else{
            return{...item, quantity:item.quantity-1}
          }
      
         }
         return item
      })
      setCartItem(item)
       
        const data = await getItem(`/user/decrisequantity?id=${id}`,refreshtoken)
        console.log(data)
      
    

  }
  const handelIncriseQuantity = async (id)=>{
  
    const item = cartItem.map(item=>{

      if(item.productId._id ===id){
       
       return{...item,quantity:item.quantity+1}
       
   
      }
      return item
   })

   setCartItem(item)
   
    const data = await getItem(`/user/incrisequantity?id=${id}`,refreshtoken)
    console.log(data)
   
 
   
   
     
    
   
   
  }
  const handelRemoveItem = async(id)=>{
    const data = await deleteItem(`/user/removeitem?id=${id}`,refreshtoken)
    console.log(data)

   const filterItem = cartItem.filter(item=>item._id !==id)
   setCartItem(filterItem
    )


  }

 const handelcheckout = async()=>{
  const strip =  await loadStripe('pk_test_51OooNgIfpG0m17PKJV3g9lCbfGe882NLrDrBfpZI7JCeW5Es8t5VL9JrrsFcNlldg4IcPEjOOMixvFqHZMIk48Qe003jlYi7ZO')
        const data = await getItem('/user/checkout',refreshtoken)
       
    const redir = strip.redirectToCheckout({sessionId:data.id})
    

 }
 if(cartItem.length === 0) return <div style={{width:"100%",
height:"100vh", fontSize:"3em",color:"#333",fontWeight:"500"}}>No items</div>
  return (

    <div className='CartParent'>
      <div className="cartHeader">
      <h1>My cart</h1>
      <hr />
      </div>
      {
      isloading? (
         <img src={Carrot} className='LoadingAnimationSearch'/>

        ):useNotLogIn ?(
           <h1>You are not log in, please <Link color='#181725' style={{textDecoration:"underline"}} to={'/login'}>Log in</Link></h1>
        ):cartItem.map((item)=>(
          <div className="cartItem" key={item._id}>
          <div className="imgLeft">
            <img src={item.productId?.ProductImage[0].url} alt="" />
          </div>
          <div className="middleInfo">
            <h3>{item.productId?.productName}</h3>
            <p>{item.productId?.Quantity}</p>
           <div className="count">
             <ButtonComponent bgColor={"#E2E2E2"} outline={"1px solid #B3B3B3"} width={"50px"} Onclick={()=>handelDecriseQuantity(item.productId._id)} >
               <FiMinus color='#B3B3B3'/>
             </ButtonComponent>
             <p>{item.quantity}</p>
             <ButtonComponent bgColor={"#E2E2E2"} outline={"1px solid #B3B3B3"} width={"50px"} Onclick={()=>handelIncriseQuantity(item.productId._id)}>
               <FaPlus color='#53B175'/>
             </ButtonComponent>
           </div>
          </div>
          <div className="lastInfo">
              <TbArrowsCross onClick={()=>handelRemoveItem(item._id)}/>
              <p>{item.productId?.price}$</p>
          </div>
  
         
  
        </div>
        ))
      }
     <div className="checkboutButtonParentCart">

   
     <ButtonComponent outline={"none"} width={"300px"} gap={"10px"} className={"goCheckout"} Onclick={handelcheckout}>
        Go to Checkout <span>{total}$</span>
     </ButtonComponent>
     </div>

    </div>
  )
}

export default Cart