import React ,{useRef , useState} from 'react'
import {baseURL} from '../../constants/url.js'
import {useMutation} from '@tanstack/react-query'
import toast from 'react-hot-toast'

import EventCoordinatorInput from './EventCoordinatorInput.js'
// icons
import { GrTableAdd } from "react-icons/gr";
import SubEvents from './SubEvents.js'


const EventCreateion = () => {
  const [coordinators, setCoordinators] = useState([]);
  const [subEvents , setSubEvents] = useState([])

    const eventNameRef = useRef();
    const eventDetailsRef = useRef();
    const eventDateRef = useRef();
    const eventCountRef = useRef();
    const eventForRef = useRef();
  
    const {mutate : createEvent} = useMutation({
        mutationFn : async(e) => {
            e.preventDefault();
            
            const data = {
              eventName : eventNameRef.current.value,
              eventDetails : eventDetailsRef.current.value,
              eventDate : new Date(eventDateRef.current.value).toISOString(),
              expectedParticipantCount : parseFloat(eventCountRef.current.value),
              eventCoordinators : coordinators,
              eventFor : eventForRef.current.value,
              subEvents : subEvents,
    
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
            eventDateRef.current.value = '';
            eventCountRef.current.value = '';
            eventForRef.current.value = '';
            setCoordinators([]);
            setSubEvents([]);
        }
    })

    
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-yellow-400 to-amber-500">
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
                            <span className="label-text">Event Description</span>
                        </label>
                        <textarea
                            placeholder="Enter event details"
                            id='detail'
                            className="textarea textarea-bordered w-full text-lg p-3 rounded-lg border-2 border-yellow-400 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                            ref={eventDetailsRef}
                            required
                        />
                    </div>
                    {/* DATE */}
                    <div htmlFor='Date' className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Event Date</span>
                        </label>
                        <input
                            type="date"
                            placeholder="Enter event name"
                            id='Date'
                            className="input input-bordered w-full text-lg p-3 rounded-lg border-2 border-yellow-400 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                            ref={eventDateRef}
                            required
                        />
                    </div>
                                    

                    {/* PARTICIPANT COUNT */}
                    <div htmlFor='ParticipantCount' className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Expected Participant Count</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter event name"
                            id='ParticipantCount'
                            className="input input-bordered w-full text-lg p-3 rounded-lg border-2 border-yellow-400 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                            ref={eventCountRef}
                            required
                            
                        />
                    </div>

                    {/* COORDINATORS */}

                    <div htmlFor='EventCoordinators' className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Event Coordinators</span>
                        </label>
                        <EventCoordinatorInput 
                            inputs = {coordinators}
                            setInputs = {setCoordinators}
                        />

                        
                    </div>
                    {/* EVENT FOR */}
                    <div htmlFor='eventfor' className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Event For</span>
                        </label>
                        <select name="select" id="select" className='input input-bordered w-full text-lg   rounded-lg border-2 border-yellow-400 focus:ring-2 focus:ring-amber-500 focus:outline-none'
                        ref={eventForRef}  >
                            <option value="Students">Students</option>
                            <option value="Staffs">Staffs</option>
                        </select>
                    </div>

                    {/* COORDINATORS */}

                    <div htmlFor='EventCoordinators' className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Event Coordinators</span>
                        </label>
                        <SubEvents
                            inputs = {subEvents}
                            setInputs = {setSubEvents}
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