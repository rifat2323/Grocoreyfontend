import React,{useEffect,useState,useContext} from 'react'
import CategoryCard from '../components/CategoryCard'

import {useParams} from 'react-router-dom'
import Carrot from '../assets/carrot.png'
import axios from 'axios'
import { DataProvider } from '../context/Context'

const SearchPage = () => {
  const [data, setData] = useState([])
  const [pading,setPading] = useState(false)
  const [sort,setSort] = useState(Number)
  const [cat,setCat] = useState(Array)
   const baseurl = import.meta.env.VITE_BASE_URL
  const {term} = useParams()
  const {handelChange,handelKeyDown} = useContext(DataProvider)
   useEffect(()=>{
    
   const fetchData = async()=>{
    setPading(true)
      try{
      const {data} = await axios.get(`${baseurl}/product/search?query=${term}&sort=${sort}&cat=${cat}`,{withCredentials:true})
       setData(data)
       if(data){
        setPading(false)
       }
      }catch(e){
       console.log(e)
      }

   }
   fetchData()
   },[term,sort,cat,baseurl])




  const handelShort=(e)=>{
    setSort(parseInt(e.target.value))
  }
 
const handelCheck =(value,isChecked)=>{
if(isChecked){
  setCat((prev)=>[...prev,value])
}else{
   setCat(prev=>prev.filter(item=>item !==value))
}

}
 
  return (
    <>
    
 
  
    {
      pading ? (
       <img src={Carrot} alt=""  className='LoadingAnimationSearch'/>
      ):(
        <CategoryCard data={data} title={"Explore a wide range of items"} handelSort={handelShort} handelCheck={handelCheck}
        handelChange={handelChange} none={"flex"}
        handelKeyDown={handelKeyDown}
        />
      )
}
    </>
  )
}

export default SearchPage