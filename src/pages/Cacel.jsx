import React,{useState} from 'react'
import SmallCard from '../components/SmallCard'
import { ImCross } from "react-icons/im";

const Cacel = () => {
    const [success,setSuccess] = useState(true)
  return (
    <SmallCard text={"filed to payment"} spiner={<ImCross size={40} color='#fff' />}  bgColor={"#E78895"} success={success}/>
  )
}

export default Cacel