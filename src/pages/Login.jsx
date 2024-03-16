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
   height: 100vh;
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
   height: 350px;
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
  justify-content: space-between;
  align-items: center;
`
const InputCheckBox = styled.input`
  accent-color: #53B175;
`

const Login = () => {

  const [isChecked,setIsChecked] = useState(false)
  const [username,setUserName] = useState('')
  const [password,setPassword] = useState('')
  const [isloading,setIsloading] = useState(false)
  const [isNameError,setIsNameError] = useState(false)
  const [isPasswordError,setIsPasswordError] = useState(false)
  const Navigate = useNavigate()
  const {setAccessToken,setUserCity} = useContext(DataProvider)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(!user) return;
   
      setUserName(user.username|| '' )
      setPassword(user.password || '')
     
     
    
    
    
     
  },[])
 const handelSubmit = async()=>{
  setIsloading(true)
  const user = {
    username:username,
    password:password
  }
   const getData = async ()=>{
    
    const data = await postItem(`/user/login`,user)
     if(data.refreshToken){
      localStorage.setItem('refreshToken',data.refreshToken)
      setAccessToken(data.refreshToken)
      setUserCity(data.city)
      setIsloading(false)
      Navigate('/')
     }else if(data?.response){
       if( data.response.status === 405){
        setIsPasswordError(true)
        setIsloading(false)
       }else if(data.response.status === 406){
        setIsNameError(true)
        setIsloading(false)
       }
     }
     
   
   }
   getData()
   if(isChecked){
      localStorage.setItem("user",JSON.stringify(user))
   }
 }
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
 useEffect(() => {
  // Call handleBlur and handlePasswordBlur whenever username or password changes
  handelBlur();
  handelPasswordBlur();
  setIsNameError(false)
  setIsPasswordError(false)
}, [username, password, handelBlur, handelPasswordBlur]);
 


  return (
    <Div>
      <DIV2>
      <Header>Sign in</Header>
      <span color='red'>{isNameError?"invalid name":isPasswordError?"invalid password":""}</span>
      <form action="" onSubmit={(e)=>e.preventDefault()}  style={{display:"flex",flexDirection:"column",width:"100%"}}>
       <Input name={"Name"} handelChange={(e)=>setUserName(e.target.value)} handelBlur={handelBlur}  spanClassName={"userInput"} value={username}/>
       <Input name={"Password"} handelChange={(e)=>setPassword(e.target.value)} handelBlur={handelPasswordBlur} spanClassName={"passwordInput"} value={password}/>
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
        /> ):("loading")
       }
       </ButtonComponent  >
       </form>
       <Bottom>
        <label htmlFor="" style={{display:"flex",alignItems:"center"}}>
        <InputCheckBox type='checkbox' onChange={(e)=>setIsChecked(e.target.checked)}/>
        <span>Remember me</span>
        </label>
        <Link style={{color:"#c5560c"}} to={'/signup'}>sign up</Link>
      
       </Bottom>
       <a href="https://www.fiverr.com/s/aL24mK" style={{color:"#163046",fontSize:"1.5em"}}>Order me on fiverr</a>
      </DIV2>
      
      </Div>
  )
}

export default Login