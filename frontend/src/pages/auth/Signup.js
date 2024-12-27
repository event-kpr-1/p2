import React, { useRef } from 'react'
import { Link } from 'react-router-dom';
import {baseURL} from '../../constants/url.js'
import { useQueryClient , useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const Signup = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const queryClient = useQueryClient();

  const {mutate : SignUpFn} = useMutation({
    mutationFn : async(e) => {
      e.preventDefault();
      const data = {
        username : nameRef.current.value,
        email : emailRef.current.value,
        password : passwordRef.current.value
      }

      if(!data.username){
        toast.error('name missing')
        nameRef.current.focus();
        return
    }else if(!data.email){
        toast.error('email missing')
        emailRef.current.focus();
        return        
    }else if(!data.password){
        toast.error('password missing')
        passwordRef.current.focus();
        return
    
    }


      
      try {
        const res = await fetch(`${baseURL}/api/admin/signup`,{
          method : 'POST', 
          credentials : 'include' ,
          headers : {
            'Content-Type': 'application/json',
          },
          body : JSON.stringify(data)
        })
        const resData = await res.json();
        // console.log(resData)
        if(!res.ok){
          throw new Error(resData.error || 'something went wrong');
        }
        toast.success('logged in');
      } catch (err) {
        toast.error(err.message)
        console.log('error : ',err.message)
      }
      
  },
  onSuccess : () => {
    
    queryClient.invalidateQueries({
      queryKey : ['authAdmin']
    });
  }
  });

  
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-green-500 to-teal-600">
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Sign Up</h2>
      <form>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input
            type="text"
            placeholder="username"
            ref={nameRef}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="email"
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
            placeholder="password"
            ref={passwordRef}
            className="input input-bordered w-full"
            required
          />
        </div>
        
        <button
          type="submit"
          className="btn btn-primary w-full bg-gradient-to-r from-teal-500 to-green-600 hover:from-teal-600 hover:to-green-700 border-none"
          onClick={(e) => SignUpFn(e)}
        >
          Sign Up
        </button>
        <h3 className='mt-2'>Alrady have an account : </h3>
        <Link to = '/login'>
          <button
            className="btn btn-primary w-full bg-gradient-to-r from-teal-500 to-green-600 hover:from-teal-600 hover:to-green-700 border-none"
          >Login
          </button>

        </Link>

        
      </form>
    </div>
  </div>
  )
}

export default Signup