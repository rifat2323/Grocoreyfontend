import React from 'react'
import styled  from 'styled-components'
import { mdiMagnify } from '@mdi/js';
import Icon from '@mdi/react';

const SearhBox = styled.div`
        
width: 700px ;

justify-content: center;
align-items: center;
background: #F2F3F2;
border-radius: 15px;
padding: 10px;
height: 51px;
position: relative;
@media (max-width:768px) {

width: 300px;


}
`
const Input = styled.input`
flex: 1 0 300px;
height: inherit;
border-radius: inherit;
background: transparent;
color: #7C7C7C;
font-size: 1em;
border: none;
font-family: sans-serif;
outline: none;
border-radius: 0px 30px 30px 0px ;
caret-color: #53B175;
@media (max-width:768px) {
flex: 1 0 120px;
}
`
const SearchInput = ({none,handelChange,handelKeyDown}) => {
   

   
  return (
    <SearhBox className="serchBox" style={{display:`${none}`}}>
    <Icon path={mdiMagnify} size={1.2}  color={"#181B19"}/>
    <Input type="text"  placeholder='search store' onChange={handelChange} onKeyDown={handelKeyDown} />
    </SearhBox>
  )
}

export default SearchInput