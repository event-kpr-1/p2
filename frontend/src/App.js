import React from 'react'
import {Navigate, Route , Routes} from 'react-router-dom'
import {useQuery} from '@tanstack/react-query'
import {Toaster} from 'react-hot-toast'

// PAGES
import Login from './pages/auth/Login.js'
import Signup from './pages/auth/Signup.js'
import Home from './pages/HomePage.js'
import EventCreateion from './pages/event/EventCreateion.js'
import { baseURL } from './constants/url.js'
import AllEventsList from './pages/event/AllEventsList.js'

const App = () => {
  const {data : authAdmin , isLoading ,error} = useQuery({
    queryKey : ['authAdmin'],
    queryFn : async() => {
      try {
        const res = await fetch(`${baseURL}/api/admin/me`,{
          method : 'GET',
          credentials : 'include',
          headers : {
            'Content-Type' : 'application/json'
          }
          
        })
        const resData = await res.json();
        
        if(!res.ok){
          throw new Error (resData.error || 'something went wrong')
        }
        return resData
      } catch (err) {
        console.log('error in app.js :' , err.message)
        return null;
        
      }
    },
    retry : false
  });
  if(error){
    console.log('ERROR GOT : ',error )
  }
  console.log('WE GOT: ',authAdmin)

  return (
    <div>
      
      <Routes>
        <Route path='/login' element={!authAdmin ? <Login/> : <Navigate to='/'/> }/>
        <Route path='/signup' element={!authAdmin ? <Signup/> : <Navigate to='/'/>}/>
        <Route path='/create' element={authAdmin ? <EventCreateion/> : <Navigate to='/login'/>}/>
        <Route path='/allevents' element={authAdmin ? <AllEventsList/> : <Navigate to='/login'/>}/>
        <Route path='/' element={ authAdmin ? <Home/> : <Navigate to='/login'/>}/>

        {/* <Route path='/create1' element={<EventCreateion/> }/> */}
      </Routes>
      <Toaster
        toastOptions={{
          duration: 1000, // All toasts will now have a duration of 3 seconds
        }}
      />
    </div>
  )
}

export default App