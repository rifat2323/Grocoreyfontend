import React from 'react'
import styled from 'styled-components'
import { InfinitySpin } from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import {ButtonComponent} from '../slice-component/component'
const Div = styled.div`
 width: 350px;
 height: 300px;
 border: 1px solid #ddd;
 border-radius:15px;
 box-shadow:0px 17px 15px -3px rgba(0,0,0,0.2);
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
 gap: 10px;

`
const Div1 = styled.div`
 width: 100%;
 height: 100vh;

display: flex;
flex-direction:column;
justify-content: center;
align-items: center;


`
const P = styled.p`
color:#211C6A;
 font-size: 1.3em;
 font-weight: 400;

`
const SmallCard = ({success,spiner,text,bgColor}) => {
  return (
    <Div1>


    <Div>{!success?
       <InfinitySpin
       visible={true}
       width="200"
       color="#4fa94d"
       ariaLabel="infinity-spin-loading"
       />:(
        <>
       
         <div style={{background:bgColor,width:"50px",
         height:"50px",aspectRatio:"1/1", borderRadius:"50%",display:"flex",justifyContent:"center",alignItems:"center"}}>
          {spiner}
         </div>
         <P>{text}</P>
         <Link to={"/"}><ButtonComponent outline={"none"}>Home</ButtonComponent></Link>
         </>
       )
}
      </Div>
        </Div1>
  )
}

export default SmallCard