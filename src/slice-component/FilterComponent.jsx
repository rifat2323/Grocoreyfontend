import React from 'react'
import styled from 'styled-components'
import { category } from '../api/category'

const Div = styled.div`
    width: 300px;
    height: 100vh;
    box-shadow: -10px 0px 12px 0px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  
    background: #F2F3F2;
    position: absolute;
    right: -100%;
    
    z-index: 5;
    border-radius: 10px 10px 0 0;
    transform: translateX();
    transition:250ms ease-in;
`
export const FilterComponent = ({children,className,Ishide}) => {
  return (
    <Div className={className} style={{transform:`translateX(${Ishide ? "100vh":"0"})`}}>
        {children}
    </Div>
  )
}

const Select =styled.select`
    width: 90%;
    height: 50px;
    border: 1px solid #4C4F4D;
    border-radius: 10px;
    background: #F2F3F2;
    color: #4C4F4D;
    padding-inline-start:10px;
    margin-top:20px;
   
`
const Option =styled.option`
    color: #181725;
    font-size: 1em;

`

export const DropDownSelect = ({getOption})=>{

 return(
  <Select onChange={getOption}>
   <Option value={'0'}>Best match</Option>
   <Option value={'101'}>Low to High</Option>
   <Option value={'102'}>High to low</Option>
  </Select>


 )
 

}
const Ul = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-top:30px;

   
`
export const CheckBox = ({handelCheck,isHide})=>{

return(

    <Ul style={{display:`${isHide}`}}>
    {
        category.map((item,index)=>(
            <label htmlFor="Input" key={index}  style={{marginBottom:"10px"}}>
             <input type="checkbox" value={item.cat}  onChange={(e)=>handelCheck(e.target.value,e.target.checked)} style={{accentColor:"#53B175"}} /> <span style={{color:"#181725",fontSize:"1.1em",fontWeight:"400"}}>{item.title}</span>
            </label>
            
        ))
    }

    </Ul>
)

}