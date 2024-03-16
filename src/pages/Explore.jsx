import React,{useContext} from 'react'
import SearchInput from '../components/SearchInput'
import '../styles/explore.css'
import { category } from '../api/category'
import { useNavigate } from "react-router-dom";
import { DataProvider } from '../context/Context';
const Explore = () => {
  const Navigate = useNavigate()
  const {handelChange,handelKeyDown} = useContext(DataProvider)
  return (
    <div className='Explore'>
         <h1>Explore and find product</h1>
         <SearchInput  handelChange={handelChange} handelKeyDown={handelKeyDown} none={"flex"}/>
         <div className="exploreParent">
        {
            category.map((item,index)=>(
              <div className="exploreChild" onClick={()=>Navigate(`/category/${item.cat}`)} key={index} style={{background:` radial-gradient(${item.color1} ,${item.color2} )`,border:` 1px solid ${item.color1}`}}>
               <img src={item.Image} alt="" />
               <h5>{item.title}</h5>
              </div>
        

             ) )
        }


         </div>
        
        </div>
  )
}

export default Explore