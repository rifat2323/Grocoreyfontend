import React,{useEffect,useState,useRef,useContext} from 'react'
import Carrot from '../assets/carrot.png'
import '../styles/home.css'
import Icon from '@mdi/react';
import { mdiMapMarker } from '@mdi/js';
import { mdiMagnify } from '@mdi/js';
import HomeSlider from '../components/HomeSlider';
import SearchInput from '../components/SearchInput';
import {Link} from 'react-router-dom'
import {getItem} from '../api/api'
import Card from '../components/Card';
import Chicken from '../assets/chicken.png'
import { category } from '../api/category';
import {useNavigate} from 'react-router-dom'
import { DataProvider } from '../context/Context';

const Home = () => {
  const [bestSelling,setBestSelling] = useState([])
  const [exclusive,setExclusive] = useState([])
    const Navigate = useNavigate()
    const {handelChange,handelKeyDown,userCity,handelAddedTocart} = useContext(DataProvider)
   useEffect(()=>{
       const getData = async ()=>{
          const data = await getItem("/product/exclusive")
          setExclusive(data)
       }
   
       getData()
       
   },[]);
   useEffect(()=>{
       const getData = async ()=>{
          const data = await getItem("/product/bestsell")
          setBestSelling(data)
       }
   
       getData()
       
   },[]);

   useEffect(()=>{
    const parentCard = document.querySelectorAll(".cardParent")
    parentCard.forEach((parentCard) => {
      if (parentCard) {
        const scrollIncrement = parentCard.scrollWidth * 0.2; // 20% each time
        let scrollPosition = 0;
        let direction = 1; // 1 for  right, -1 for  left
       
        const scroll = () => {
          scrollPosition += scrollIncrement * direction;
          // Reverse direction if scrolled to the end or beginning
          if (scrollPosition >= parentCard.scrollWidth || scrollPosition <= 0) {
            direction *= -1;
          }
          parentCard.scrollTo({ left: scrollPosition, behavior: "smooth" });
        };

        const interval = setInterval(scroll, 2000); 

        return () => clearInterval(interval);
      }
    });
   },[])
   
  return (
    <div className='homeWrapper'>
      <div className="homeHeader">
        {/*add home lnk here and loading animation like spinning carrot */}
        <img src={Carrot} alt="" title='made by rifat' />
        <div className="locations">
        <Icon path={mdiMapMarker} size={1} />
        <p>{userCity?userCity:"Dhaka"}</p>
        </div>
       <SearchInput none={"flex"} handelKeyDown={handelKeyDown} handelChange={handelChange}/>
      
      </div>
      <div className="heroSlider">
        {/* importing slider from component */}
         <HomeSlider/>
      </div>

      <div className="bestSelling">
        <div className="bestSellingHeader">
          <h1>Exclusive Offer</h1>
          {/* have to create new page */}
          <Link to={'/selling/exclusive'}>see all</Link>

        </div>
        <div className="cardParent">
          {
            exclusive.map(item=>(
              <Card src={item?.ProductImage[0].url} header={item.productName} price={item.price} text={item.Quantity} key={item._id} handleAddedToCart={()=>handelAddedTocart(item._id)} id={item._id}/>

            ))
          }
         
        </div>
 
      </div>
      <div className="bestSelling">
        <div className="bestSellingHeader">
          <h1>Best Selling</h1>
          {/* have to create new page */}
          <Link to={'/selling/bestsell'}>see all</Link>

        </div>
        <div className="cardParent">
          {
            bestSelling.map(item=>(
              <Card src={item?.ProductImage[0].url} header={item.productName} price={item.price} text={item.Quantity} key={item._id} handleAddedToCart={()=>handelAddedTocart(item._id)} id={item._id}/>

            ))
          }
         
        </div>
 
      </div>

      <div className="cetagoryHome">
      <div className="cetagoryHomeHeader">
        <h1>Groceries</h1>
        <Link to={"/explore"}>see all</Link>
      </div>
      <div className="cardParent">
          {
            category.map((item,index)=>(
              <div className="cc" key={index} onClick={()=>Navigate(`/category/${item.cat}`)} style={{background:`linear-gradient(to left,${item.color1} 55%,${item.color2} 40%,${item.color3} 5%)`, cursor:"pointer"}}>
                 <img src={item.Image} alt="" />
                 <h5>{item.title}</h5>
              </div>
            ))
          }
         
        </div>

      </div>

    </div>
  )
}

export default Home