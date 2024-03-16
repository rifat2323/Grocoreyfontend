import React,{useState,useEffect,useContext} from 'react'

import { TiTickOutline } from "react-icons/ti";
import {useParams,Link} from "react-router-dom"
import SmallCard from '../components/SmallCard';
import {getItem} from '../api/api'
import {DataProvider} from '../context/Context'






const Success = () => {
  const {refreshtoken} = useContext(DataProvider)
    const [success,setSuccess] = useState(false)
    const {id} = useParams()
     useEffect(()=>{
       const fetchData = async ()=>{
        setSuccess(false)
         try{
          const data = await getItem(`/user/checkoutsuccess?id=${id}`,refreshtoken)
           if(data.success){
            setSuccess(true)
           }
          console.log(data)
        
         }catch(error){
          console.log(error)
         }
        }
       fetchData()
     },[])


  return (
   <SmallCard success={success} spiner={<TiTickOutline size={40} color='#fff'/>} text={"Payment Successful"} bgColor={"#9BCF53"}/>
  )
}

export default Success