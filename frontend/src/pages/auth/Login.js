import React, { useRef } from 'react'
import {Link} from 'react-router-dom'
import {baseURL} from '../../constants/url.js'
import { useMutation , useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const Login = () => {

  const queryClient =  useQueryClient();
  
  const emailRef = useRef();
  const passRef = useRef();

  const {mutate : loginFn , isPending , error} = useMutation({
    mutationFn : async(e) => {
      e.preventDefault()
      const data = {
        email : emailRef.current.value,
        password : passRef.current.value
      }
      if(!data.email){
        toast.error('email missing');
        return
      } else if(!data.password){
        toast.error('email missing');
        return
      }
  
      try {
        const res = await fetch(`${baseURL}/api/admin/login`,{
          method : 'POST',
          credentials : 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        })
        const resData = await res.json();
        if(!res.ok){
          throw new Error(resData.error || 'something went worng')
        }
        console.log(resData)
        toast.success('logged in');
    
      }catch(err) {
        toast.error(err.message)
      }
    },
    onSuccess : () => {
      
      queryClient.invalidateQueries({
        queryKey : ['authAdmin']
      })
    }
  });

   

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>
        <form>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              ref={emailRef}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              ref={passRef}
              className="input input-bordered w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 border-none"
            onClick={(e)=> loginFn(e)}
          >
            Login
          </button>
        </form>
        <h3 className='mt-2'>Dont have an account : </h3>
        <Link to='/signup'>
          <button           
            className="btn btn-primary w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 border-none"            
            >Sign Up
          </button>
        </Link>
        
      </div>
    </div>
  )
}

export default Login