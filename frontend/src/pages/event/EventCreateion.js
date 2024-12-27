import React ,{useRef} from 'react'
import {baseURL} from '../../constants/url.js'
import {useMutation} from '@tanstack/react-query'
import toast from 'react-hot-toast'
// icons
import { GrTableAdd } from "react-icons/gr";


const EventCreateion = () => {
    const eventNameRef = useRef();
    const eventDetailsRef = useRef();
  
    const {mutate : createEvent} = useMutation({
        mutationFn : async(e) => {
            e.preventDefault();
            
            const data = {
              eventName : eventNameRef.current.value,
              eventDetails : eventDetailsRef.current.value,
    
            }
            if(!data.eventName){
                toast.error('event name missing')
                return
            }else if(!data.eventDetails){
                toast.error('event details missing')
                return
            }
            console.log('Data being sent:', JSON.stringify(data));
    
            try {
              const res = await fetch(`${baseURL}/api/event/create`,{
                method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials : 'include',
                    body: JSON.stringify(data)
              })
              const resData = await res.json();
    
              if(!res.ok){
                throw new Error(res.error || 'something went worng')
              }
              toast.success('Event Created')
              return resData
            } catch (err) {
                toast.error(err.message)
            }
        },
        onSuccess : () => {
            
            eventNameRef.current.value = '';
            eventDetailsRef.current.value = '';
        }
    })

    
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-yellow-400 to-amber-500">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Create Event</h2>
                <form onSubmit={createEvent}>
                    {/* Event Name Input */}
                    <div htmlFor='name' className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Event Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter event name"
                            id='name'
                            className="input input-bordered w-full text-lg p-3 rounded-lg border-2 border-yellow-400 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                            ref={eventNameRef}
                            required
                        />
                    </div>

                    {/* Event Details Textarea */}
                    <div className="form-control mb-4">
                        <label htmlFor='detail' className="label">
                            <span className="label-text">Event Details</span>
                        </label>
                        <textarea
                            placeholder="Enter event details"
                            id='detail'
                            className="textarea textarea-bordered w-full text-lg p-3 rounded-lg border-2 border-yellow-400 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                            ref={eventDetailsRef}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="btn btn-primary w-full py-3 text-white font-semibold bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 rounded-lg transition duration-300 ease-in-out focus:ring-4 focus:ring-amber-500 focus:outline-none"
                        >
                            <span><GrTableAdd /></span>CREATE
                        </button>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default EventCreateion