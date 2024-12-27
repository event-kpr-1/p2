import React from 'react'
import { useMutation , useQueryClient , useQuery } from '@tanstack/react-query'
import { baseURL } from '../constants/url'
import {Link} from 'react-router-dom'
import toast from 'react-hot-toast'



const HomePage = () => {
  const queryClient = useQueryClient();
  const {data : authAdmin} = useQuery({queryKey : ['authAdmin']})

  const {mutate : logoutFn , isPending , error} = useMutation({
    mutationFn : async() => {
      try {
        const res = await fetch(`${baseURL}/api/admin/logout`,{
          method : 'POST',
          credentials : 'include',
          headers : {
            'Content-Type' : 'application/json'
          }
        })
        const resData = await res.json();
        if(!res.ok){
					throw new Error(resData.error || "something went wrong")
				}
      } catch (err) {
        console.log('error in homepage.js : ',err.message)
        
      }
    },
    onSuccess : () =>{
      toast.success('logged out');
      queryClient.invalidateQueries({
        queryKey : ['authAdmin']
      })
    
    }
  })
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-green-500 to-teal-600">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Welcome {authAdmin.username}</h2>

        
          <Link to="/create">
            <button className="btn btn-primary text-white w-full mt-4 bg-gradient-to-r from-teal-500 to-green-600 hover:from-teal-600 hover:to-green-700 border-none">
              + Create Event
            </button>
          </Link>
          <Link to="/allevents">
            <button className="btn btn-primary text-white w-full mt-4 bg-gradient-to-r from-teal-500 to-green-600 hover:from-teal-600 hover:to-green-700 border-none">
              Events
            </button>
          </Link>
        

        <button
          className="btn btn-primary text-white w-full mt-4 bg-gradient-to-r from-teal-500 to-green-600 hover:from-teal-600 hover:to-green-700 border-none"
          onClick={logoutFn}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default HomePage