import { useState,lazy,Suspense } from 'react'
import {ButtonComponent} from './slice-component/component'
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import './App.css'
import Navbar from './pages/Navbar'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Explore from './pages/Explore'
import Category from './pages/Category'
import Exclusive from './pages/ExclusiveBest'
import SearchPage from './pages/SearchPage'
import Context from './context/Context.jsx'
import Account from './pages/Account.jsx'
 const Login = lazy(()=>import('./pages/Login.jsx'))
 const SignUp = lazy(()=>import('./pages/SignUp.jsx'))
 import ProductDeteils from './pages/ProductDeteils.jsx'
 import Success from './pages/Success.jsx'
 import Cacel from './pages/Cacel.jsx'
 
function App() {
 

  return (
    <>
     <BrowserRouter >
     <Context>
     <Routes>

      
    
      <Route path='/' element={ <>
       <Navbar/>
       <Home/>
      
      </>}/>
      <Route path='*' element={<Navigate  to='/' />}/>


      <Route path='/cart' element={<>
     <Navbar/>
     <Cart/>
      </>}/>
      <Route path='/explore' element={<>
     <Navbar/>
     <Explore/>
      </>}/>
      <Route path='/category/:name' element={<>
     <Navbar/>
     <Category/>
      </>}/>

      <Route path='/selling/:extra' element={<>
     <Navbar/>
     <Exclusive/>
      </>}/>
      <Route path='/search/:term' element={<>
     <Navbar/>
     <SearchPage/>
      </>}/>
      <Route path='/account' element={<>
     <Navbar/>
     <Account/>
      </>}/>
      <Route path='/singleproduct/:id' element={<>
     <Navbar/>
     <ProductDeteils/>
      </>}/>
      <Route path='/success/:id' element={<>
     <Navbar/>
     <Success/>
      </>}/>
      <Route path='/cancel' element={<>
     <Navbar/>
     <Cacel/>
      </>}/>


      <Route path='/login' element={ <Suspense fallback="loading...">
        <Login/>
      </Suspense>
    
     
      }/>
   
    <Route path='/signup' element={<Suspense fallback="loading...">
        <SignUp/>
      </Suspense>}/>
     </Routes>
     </Context>
     </BrowserRouter>
    </>
  )
}

export default App
