import React,{useState,useEffect} from 'react'
import HomeVeg from '../assets/homeSlider.png'
import Drink from '../assets/drink.png'
import Chicken from '../assets/chicken.png'
import './styles/homeSlider.css'
const HomeSlider = () => {
    const [activeIndex,setActiveIndex] = useState(0)

    

    useEffect(()=>{
        const handelSlide =()=>{
            const sliderParent = document.querySelector(".sliderParent");
            const slidChild =document.querySelectorAll(".sliderChild")
    
            const totalSlidesWidth = sliderParent.scrollWidth;
    
            const eachScroll = activeIndex * (totalSlidesWidth/slidChild.length)
    
            sliderParent.scrollTo({left:eachScroll,behavior:"smooth"})
          /*   console.log(eachScroll) */
        }
        handelSlide()
        
     
    },[activeIndex])

    useEffect(()=>{
        const slidChild =document.querySelectorAll(".sliderChild")
        const interval =setInterval(() => {
             setActiveIndex((prev)=>(prev+1)%slidChild.length)
        }, 4000);

        return ()=>clearInterval(interval)
    },[])
  return (
    <div className="sliderParentWrapper">

   
    <div className='sliderParent'>
       <div className="sliderChild" >
        <img src={HomeVeg}  />
        <div className="sliderChildrenText">
            <h5>Fresh vegetable</h5>
            <p>get 30% off today</p>
        </div>
       </div>
       <div className="sliderChild" >
       <img src={Drink}  />
        <div className="sliderChildrenText">
            <h5>Soft drinks</h5>
            <p>get 5% off today</p>
        </div>
       </div>
       <div className="sliderChild" >
       <img src={Chicken}  />
        <div className="sliderChildrenText">
            <h5> Fresh chicken </h5>
            <p>get 20% off today</p>
        </div>
       </div>
     

    </div>
    <ul>
        <li onClick={()=>{setActiveIndex(0)
         
        }} className={activeIndex===0?"activeLi":{}}></li>
        <li onClick={()=>{setActiveIndex(1)
         }}  className={activeIndex===1?"activeLi":{}}></li>
        <li onClick={()=>{setActiveIndex(2)
             }}  className={activeIndex===2?"activeLi":{}}></li>
      </ul>
    </div>
  )
}

export default HomeSlider