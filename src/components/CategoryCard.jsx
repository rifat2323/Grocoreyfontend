import React,{useState,useEffect,useContext} from 'react'
import styled from 'styled-components'
import { FlexParentComponent } from '../slice-component/component'
import Card from '../components/Card'
import Carrot from '../assets/carrot.png'
import Icon from '@mdi/react';
import { mdiTuneVariant } from '@mdi/js';
import { MdOutlineTune } from "react-icons/md";
import { FilterComponent,DropDownSelect,CheckBox } from '../slice-component/FilterComponent'
import SearchInput from './SearchInput'
import { DataProvider } from '../context/Context'


const Div = styled.div`
  width: 100%;
  min-height: 100vh;
  margin-bottom:15vh;
  display: flex;
  flex-direction: column;
  
  align-items: center;
  padding:2% 5%;
`
const Div2 = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10vh;
`

const CategoryCard = ({data,title,isHide,handelSort,handelCheck,none,handelChange,handelKeyDown,id,handleAddedToCart,handelSingalePage}) => {
  const [hideFilter,setHideFilter] = useState(true)
   const {handelAddedTocart,Navigate} = useContext(DataProvider)
   

  return (
   <Div >
      <Div2>
      <h1 style={{color:"#181725",fontSize:"1.8em",fontWeight:"500"}}>{title}</h1>
       <div className="rightDiv" style={{position:"relative"}}>
       <MdOutlineTune size={25} color='#181725' onClick={()=>setHideFilter((prev)=>!prev)} style={{cursor:"pointer"}}/>

       <FilterComponent Ishide={hideFilter}>
        <DropDownSelect getOption={handelSort}/>
        <CheckBox handelCheck={handelCheck} isHide={isHide} />
      </FilterComponent>
       </div>
   
   
      </Div2>
      <SearchInput none={none} handelChange={handelChange} handelKeyDown={handelKeyDown}/>

      <FlexParentComponent Height={"auto"} flexWrap={"wrap"} >
       
         {
          data.length>0? data.map(item=>(
            <Card key={item._id} src={item.ProductImage[0].url} header={item.productName} price={item.price} text={item.Quantity} 
            
            
             handleAddedToCart={()=>handelAddedTocart(item._id)}
              id={item._id}
             handelSingalePage={()=>Navigate(`/singleproduct/${item._id}`)}
            />
          )):(
            <>
          
            <img src={Carrot} alt="" style={{width:"100px",height:"100px",objectFit:"contain"}} />
            <h1 style={{color:"#181725",fontSize:"1.8em",fontWeight:"500"}}>Opppps, Maybe we are out of stock at this moment </h1>
            </>
          )
         }

      </FlexParentComponent>
      
      
    </Div>
  )
}

export default CategoryCard