import React,{createContext,useEffect,useState} from 'react'
import { useNavigate } from "react-router-dom";
 export const DataProvider = createContext()
 import { getItem,putItem } from '../api/api';
const Context = ({children}) => {

    const [inputSearch,setInputSearch] = useState('')
    const [accessToken,setAccessToken] = useState('')
    const [userCity,setUserCity] = useState('')
    const [alreadyCartError,setAlreadyCartError] = useState(false)
    const [cartItemId,setCartItemId] = useState([])
    const Navigate = useNavigate()
     const refreshtoken = localStorage.getItem('refreshToken')
     
  
     useEffect(()=>{
      if(refreshtoken){
          const fetchData = async ()=>{
            const data = await getItem('/user/refresh',refreshtoken)

             if(data.accessToken){
              setAccessToken(data.accessToken)
              setUserCity(data.city)
             }
              if(data.response){
                if(data.response.status === 403){
                  Navigate("/login")
                }
              }
            
           
             
          }
          fetchData()
      } 
   },[]) 
   useEffect(()=>{
   
    if(refreshtoken){
      const fetchId = async ()=>{
        const data = await getItem('/user/getCartid',refreshtoken)
        setCartItemId(data.cart)
       
      }
      fetchId()
    }
   },[refreshtoken])

    const handelChange =(e)=>{  
        setInputSearch(e.target.value);

        
      }
     const handelKeyDown =(e)=>{
       if(e.key==="Enter"){
        Navigate(`/search/${inputSearch}`)
       }
     } 
     //addding to cart
     const handelAddedTocart = async(id)=>{
      if(refreshtoken){
        const data = await getItem(`/user/addcart?id=${id}`,refreshtoken)
     
        if (data.response && data.response.status === 408) {
          setAlreadyCartError(true);
        
       
          setTimeout(() => {
              setAlreadyCartError(false); // Reset to false after 10 seconds
          }, 3000);
      } else {
          setAlreadyCartError(false); // Ensure it's set to false if the status is not 408
      }
     
         const newCat= {
          productId:id,
          quantity:1
         }
         setCartItemId((prev)=>[...prev,newCat])
        console.log(data)
      }
         
     }
   
  return (
    <DataProvider.Provider value={{handelChange,handelKeyDown,setAccessToken,setUserCity,userCity,accessToken,refreshtoken,
      handelAddedTocart,cartItemId,Navigate,alreadyCartError
    }}>

        {children}

    </DataProvider.Provider>
  )
}

export default Context