import React,{useState,useEffect,useContext} from 'react'

import {useParams} from 'react-router-dom'
import {getItem} from '../api/api'
import styled from 'styled-components'
import { FlexParentComponent } from '../slice-component/component'
import Card from '../components/Card'
import Carrot from '../assets/carrot.png'
import { DataProvider } from '../context/Context'
import CategoryCard from '../components/CategoryCard'

const Category = () => {
  const [data, setData] = useState([])
  const {name} = useParams()
  const [short,setShort] = useState(Number)
    const {handelChange,handelKeyDown} = useContext(DataProvider)
  useEffect(()=>{
   const data = async ()=>{
     const getData = await getItem(`/product/category?category=${name}&sort=${short}`)
     setData(getData)
   }
   data()
  },[name,short])
  const handelSort =(e)=>{
    setShort(parseInt(e.target.value))
  }

  return (
    <CategoryCard data={data} title={"Explore your product"} isHide={"none"} handelSort={handelSort} none={"flex"}
    handelChange={handelChange} handelKeyDown={handelKeyDown}
  
    
    />
  )
}

export default Category