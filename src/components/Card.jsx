import React,{useContext} from 'react'
import styled from 'styled-components'
import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';
import { DataProvider } from '../context/Context';
import { TiTickOutline } from "react-icons/ti";

const Div = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
width: 300px;
padding: 10px 2%;
height: 350px;
background: #ffff;
border-radius: 8%;
border: 1px solid #1817252d;
transition: 200ms linear;
&:hover{

   box-shadow: 0px 0px 10px 0px rgba(0,0,0,.2) ;

   
}
@media (max-width:750px) {
    width: 200px;
    height: 250px;
}

`
const Img =styled.img`
     width: 100%;
     flex: 1 0 40%;
     height: 60%;
     object-fit: contain;
     cursor: pointer;
   
`
const Head = styled.h1`
color: #181725;
font-size: clamp(1.5em,2.1vw,2em);
padding-left:3%;
font-weight: 600;
cursor: pointer;
&:hover{
  text-decoration: underline;
  text-decoration-thickness:2px;
}
`
const Text = styled.p`
color: #7C7C7C;
font-weight: 300;
padding-left:3%;
font-size: 1rem;
margin-top:5px;
cursor: pointer;
`
const Child = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
`
const Price =styled.h2`
color: #181725;
font-weight: 400;
font-size: clamp(1.2em,2.2vw,1.5em);
padding-left:3%;
`
const Button = styled.button`
width: 45px;
height: 45px;
border-radius: 15px;
background:#53B175;
border: none;
cursor: pointer;
transition: 200ms linear;
&:hover{
background: #35B162;
}
`
const Card = ({src,header,text,price,handleAddedToCart,id}) => {
  const {cartItemId,Navigate} = useContext(DataProvider)
    const handelSingalePage= ()=>{
      Navigate(`/singleproduct/${id}`)
    }
   
  return (
    <Div>
       <Img src={src} alt='product picture' onClick={handelSingalePage}/>
        <Head onClick={handelSingalePage}>{header}</Head>
        <Text onClick={handelSingalePage}>{text}</Text>
       <Child>
      <Price>${price}</Price>
        <Button onClick={handleAddedToCart}>{cartItemId.some(item=>item.productId===id)?  <TiTickOutline color='#fff' size={22}/>:    <Icon path={mdiPlus} size={1} color={"#fff"} />}</Button> 
      

       </Child>
        
    </Div>
  )
}

export default Card