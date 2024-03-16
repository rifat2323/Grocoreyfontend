import React,{useState,useEffect,useContext} from 'react'
import { DataProvider } from '../context/Context'
import '../styles/account.css'
import {ButtonComponent} from '../slice-component/component'
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import User from '../assets/user.png'
import { getItem,putItem } from '../api/api'
import { TiTickOutline } from "react-icons/ti";
import { IoIosLogOut } from "react-icons/io";

const Div = styled.div`
  width: 100%;
  height: 100vh;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: flex-start;

`
const LOgOut =styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`
const Head = styled.h1`
    color: #181725;
    font-size: 1.5em;
    font-weight: 600;
    margin-bottom:10px;


`
const Img = styled.img`
   width: 150px;
   min-height: 100px;
   object-fit: contain;
   border: 5px solid #b8b8b8;
   border-radius: 50%;
   margin-top:30px;
   margin-top:-45px;
   aspect-ratio:1/1;
   background: #fff;


`
const Div1 = styled.div`
 background: #f7f7f7d8;
 width: 90%;
 height: 100%;
 margin-top:55px;
 display: flex;
 justify-content: flex-start;
 align-items:center;
 flex-direction: column;
 margin-bottom:20vh;
 @media (max-width:780px) {
   width:95%;
 }

`

function Account() {
  const Navigate = useNavigate()
  const {refreshtoken,setUserCity} = useContext(DataProvider)
 const [username,setUserName]= useState('')
 const [country,setCountry]= useState('')
 const [city,setCity]= useState('')
 const [email,setEmail]= useState('')
 const [padinding,setPainding] = useState(false)
 const [isUpdated,setIsUpdated] = useState(false)
 const[userLogIn,setUserLogIn] = useState(Boolean)
  useEffect(()=>{
    const fetchData = async ()=>{
      const data = await getItem(`/user/account`,refreshtoken)
      setUserName(data.username)
      setCountry(data.country)
      setCity(data.city)
      setEmail(data.email)
      
    }
    fetchData()
  },[])
  useEffect(()=>{
       if(refreshtoken){
        setUserLogIn(true)
       }else{
         setUserLogIn(false)
       }
  },[refreshtoken])
 
  const handelChangeInfo = async ()=>{
    if(isUpdated) return
    setPainding(true)
    
    const info = {
      username,
      country,
      city,
      email
    }
    
         const data = await putItem('/user/accountupdate',info,refreshtoken)
         console.log(data)
         if(data){
          setPainding(false)
          setIsUpdated(true)
          setUserCity(city)
        
         }
  }
  const handelLogOut = async()=>{
    setUserLogIn(false)
   
    const data = await getItem('/user/logout',refreshtoken)
        console.log(data)
         localStorage.removeItem('refreshToken')
  }
  return (
    <Div>
      {
         !userLogIn?(
          <LOgOut >
          <Head>You are currently logged Out</Head>
        <ButtonComponent outline={"none"} width={"300px"} Onclick={()=>Navigate("/login")}>
        Log in
      </ButtonComponent >
        </LOgOut>
         ):(
          <div style={{width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
           <Head>My Details</Head>
           <Div1 className='account'>
           <Img src={User} alt="" />
             <form action="" onSubmit={(e)=>e.preventDefault()}>
               <label htmlFor="username">
                 <span>Name:</span>
                 <input type="text" name="" id="" value={username} disabled="true" style={{cursor:"not-allowed"}} />
               </label>
               <label htmlFor="country">
                 <span>Country:</span>
                 <input type="text" name="" id="" value={country} onChange={(e)=>setCountry(e.target.value)} />
               </label>
               <label htmlFor="City">
                 <span>City:</span>
                 <input type="text" name="" id=""  value={city} onChange={(e)=>setCity(e.target.value)}/>
               </label>
               <label htmlFor="email">
                 <span>Email:</span>
                 <input type="text" name="" id=""  value={email} onChange={(e)=>setEmail(e.target.value)}/>
               </label>
               <ButtonComponent outline={"none"} width={"100%"} Onclick={handelChangeInfo}>
        {padinding?"loading":isUpdated?<TiTickOutline size={20} color='#fff'/>:"submit"}
      </ButtonComponent >
             </form>
             <div  style={{padding:"2% 3%", width:"100%" }}>
             <ButtonComponent outline={"none"} width={"100%"} Onclick={handelLogOut} bgColor={"#dbe0db"} >
              <span style={{color:"#53B175"}}>Log Out</span>
              <IoIosLogOut size={25} color='#53B175'/>
             </ButtonComponent>

             </div>
           
           </Div1>
          
          </div>
         )

      }
    
   
    </Div>
  )
}

export default Account