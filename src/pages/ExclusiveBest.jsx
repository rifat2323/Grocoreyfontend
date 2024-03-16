import React,{useState,useEffect} from 'react'
import CategoryCard from '../components/CategoryCard'
import {getItem} from '../api/api'
import {useParams} from 'react-router-dom'

const Exclusive = () => {
    const [data, setData] = useState([])
    const {extra} = useParams()
    const [sort,setSort] = useState(Number)
    const [cat,setCat] = useState(Array)
    useEffect(()=>{
        const getData = async ()=>{
         const response = await getItem(`/product/${extra}?sort=${sort}&cat=${cat}`)
         setData(response)
        }
        getData()
    },[extra,sort,cat])
   const handelSort=(e)=>{
      setSort(parseInt(e.target.value))
    }

 const handelCheck =(value,isChecked)=>{
  if(isChecked){
    setCat((prev)=>[...prev,value])
  }else{
     setCat(prev=>prev.filter(item=>item !==value))
  }
 
 }
 console.log(cat)
  return (
   <CategoryCard data={data} title={extra ==='exclusive'?"Exclusive Offer for you":"Best-selling this month"}
   handelSort={handelSort}
   handelCheck={handelCheck}
   none={"none"}
   />
  )
}

export default Exclusive