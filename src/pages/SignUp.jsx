import React,{useState,useEffect,useCallback,useContext} from 'react'
import styled from 'styled-components'
import SignIn from '../assets/signin.svg'
import { Input } from '../slice-component/component'
import {Link,useNavigate} from 'react-router-dom'
import { ButtonComponent } from '../slice-component/component'
import { postItem } from '../api/api'
import {Bars} from 'react-loader-spinner'
import { DataProvider } from '../context/Context'
const Div = styled.div`
width: 100%;
min-height: 100vh;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background: url(${SignIn});
background-position: center;
background-repeat:no-repeat;
background-size:350px 350px;



`
const DIV2 = styled.div`
width: 350px;
height: 550px;
-webkit-backdrop-filter:blur(5px);
backdrop-filter:blur(5px);
border: 1px solid #d6d4d4;
border-radius:10px;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
padding:10px 3%;
gap: 20px;

`
const Header = styled.h2`
 font-weight: 500;
 font-size: 1.8em;
  color: #303130;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;



`
const Bottom = styled.div`
width: 100%;
display: flex;
justify-content: flex-end;
align-items: flex-end;
`

const SignUp = () => {
    const [isChecked,setIsChecked] = useState(false)
    const [username,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const [isloading,setIsloading] = useState(false)
    const [isEmailError,setIsEmailError] = useState(false)
    const [isAlreadyUser,setIsAlreadyUser] = useState(false)
   
    const [country,setCountry] = useState('')
    const [city,setCity] = useState('')
    const [email,setEmail] = useState('')
    const Navigate = useNavigate()
    const {setAccessToken,setUserCity} = useContext(DataProvider)

    const handelSubmit = async()=>{
         const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

         const test = regex.test(email)
         if(!test) return setIsEmailError(true)
        setIsloading(true)
        const user = {
          username:username,
          password:password,
          country:country,
          city:city,
          email:email

        }
         const getData = async ()=>{
          
          const data = await postItem(`/user/signup`,user)
          
          if(data.city){
            setUserCity(data.city)
            setIsloading(false)
            Navigate('/login ')
          }
        if(data.response.status === 406){
            
            setIsAlreadyUser(true)
            setIsloading(false)
          } //403,406
           console.log(data)
           
         
         }
         getData()
        
       }
       useEffect(()=>{
        setIsEmailError(false)
        setIsAlreadyUser(false)
       },[username,email])
        const handelBlur = useCallback(()=>{
          const span = document.querySelector(".userInput")
          
          
          
            if(username.length>0){
              span.classList.add("activeSpan")
           }else if(username.length===0){
            span.classList.remove("activeSpan")
           }
        
         
          
       },[username])
       const handelPasswordBlur =useCallback(()=>{
        const span = document.querySelector(".passwordInput")
        
        
        
          if(password.length>0){
            span.classList.add("activeSpan")
         }else if(password.length===0){
          span.classList.remove("activeSpan")
         }
      
       } ,[password])
      const handelCountryBlur =()=>{
        const span = document.querySelector(".countryInput")
        
        
        
        if(password.length>0){
          span.classList.add("activeSpan")
       }else if(password.length===0){
        span.classList.remove("activeSpan")
       }

      }
      const handelCityBlur =()=>{
        const span = document.querySelector(".cityInput")
        
        
        
        if(password.length>0){
          span.classList.add("activeSpan")
       }else if(password.length===0){
        span.classList.remove("activeSpan")
       }
      }
      const handelEmailBlur =()=>{
        const span = document.querySelector(".emailInput")
        
        
        
        if(password.length>0){
          span.classList.add("activeSpan")
       }else if(password.length===0){
        span.classList.remove("activeSpan")
       }
      }
  return (
    <Div>
      <DIV2>
      <Header>Sign Up</Header>
      <span color='red'>{isEmailError?"email error":isAlreadyUser?"already have an account":""}</span>
      <form action="" onSubmit={(e)=>e.preventDefault()}  style={{display:"flex",flexDirection:"column",width:"100%"}}>
       <Input name={"Name"} handelChange={(e)=>setUserName(e.target.value)} handelBlur={handelBlur}  spanClassName={"userInput"} value={username}/>
       <Input name={"Password"} handelChange={(e)=>setPassword(e.target.value)} handelBlur={handelPasswordBlur} spanClassName={"passwordInput"} value={password}/>
       <Input name={"country"} handelChange={(e)=>setCountry(e.target.value)} handelBlur={handelCountryBlur} spanClassName={"countryInput"} value={country}/>
       <Input name={"City"} handelChange={(e)=>setCity(e.target.value)} handelBlur={handelCityBlur} spanClassName={"cityInput"} value={city}/>
       <Input name={"Email"} handelChange={(e)=>setEmail(e.target.value)} handelBlur={handelEmailBlur} spanClassName={"emailInput"} value={email}/>
       <ButtonComponent type={"submit"} outline={"none"} width={"100%"} Onclick={handelSubmit} > 
       {
        isloading? (<Bars
        height="18"
        width="80"
        color="#fff"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        /> ):("Submit")
       }
       </ButtonComponent  >
       </form>
       <Bottom>
        
        <Link style={{color:"#c5560c"}} to={'/login'}>Log In</Link>
      
       </Bottom>
       <a href="https://www.fiverr.com/s/aL24mK" style={{color:"#163046",fontSize:"1.5em"}}>Order me on fiverr</a>
      </DIV2>
      
      </Div>
  )
}

export default SignUp