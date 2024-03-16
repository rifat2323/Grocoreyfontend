import React,{useEffect,useState,useContext} from 'react'
import {ButtonComponent} from '../slice-component/component'
import {getItem} from '../api/api'
import {useParams} from 'react-router-dom'
import '../styles/deteils.css'
import { DataProvider } from '../context/Context'
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import {Rating} from '@mui/material'
import { TiTickOutline } from "react-icons/ti";
import { mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';


const ProductDeteils = () => {
  const {id} = useParams()
  const [painding,setPainding] = useState(false)
  const [data,setData] = useState({})
  const [activeProduct,setActiveProduct] = useState(0)
    const {handelAddedTocart,cartItemId,refreshtoken} = useContext(DataProvider)
    const [isTextVisiable,setIsTextVisiable] = useState(false)
    const [review,setReview] = useState(1)
   
    useEffect(()=>{
     const slideParent = document.querySelector(".imgsDiv")
       const totalScroll = slideParent.scrollWidth;
        const eachTimeScroll = totalScroll/data?.ProductImage?.length
         const activeScroll = eachTimeScroll*activeProduct
         slideParent.scrollTo({left:activeScroll,behavior:"smooth"})
    },[activeProduct,data])
  useEffect(()=>{
   const fetchData = async ()=>{
      try{
        const data = await getItem(`/product/getoneitem/${id}`)
        setData(data)
        
        setReview(data.Review)
      }catch(error){
        console.log(error)
      }
   
   } 
   fetchData()
  },[id])

  const handelReviws =async (value,id)=>{
    setReview(value)
   const data = await getItem(`/product/reviews?id=${id}&number=${value}`,refreshtoken)
   console.log(data)
  }


  return (
    <div className='productDtetilsParent'>
      <div className='productDetelisParensK'>
         < div className="imgsParents">

       
         <div className="imgsDiv">
          {
            data?.ProductImage?.map(item=>(
              <img src={item.url} alt="" key={item.publicId}  width={50}/>
            ))
          }
      
         </div>
         
        <FaArrowLeft size={50} color='#222' className='leftArrow' onClick={()=>setActiveProduct((prev)=>(prev-1+data?.ProductImage?.length)%data?.ProductImage?.length)}/>
        <FaArrowRight size={50} color='#222' className='rightArrow' onClick={()=>setActiveProduct((prev)=>(prev+1)%data?.ProductImage?.length)}/>
         
         </div>

         <div className='productInfoDiv'>
          <div className="productName">
            <h1>{data.productName}</h1>
            <p>{data.Quantity}</p>
            <p>{data.price}$</p>
          </div>
          <div className="productextraDetalis">
             <div className="toggleDetalis" onClick={()=>setIsTextVisiable((prev)=>!prev)}>
             <h5>product details</h5>
             {
              isTextVisiable?    <IoIosArrowUp size={20}/>:  <FaChevronDown size={20}/> 
             }
           
            
             </div>
             <p style={{display:`${isTextVisiable?"block":"none"}`}}>{data.ProductDetails}</p>
          </div>
           <div className="reviw">
            <p>Review:</p>
             <Rating style={{fontSize:"30px"}} defaultValue={1} value={review} onChange={(e)=>handelReviws(e.target.value,data._id)} precision={0.5} />
           </div>
         <ButtonComponent width={"250px"} outline={"none"} Onclick={()=>handelAddedTocart(data._id)}>{cartItemId.some(item=>item.productId===data._id)?<TiTickOutline color='#fff' size={22}/>:<Icon path={mdiPlus} size={1} color={"#fff"} />}   </ButtonComponent>
         </div>
      </div>
    </div>
  )
}

export default ProductDeteils