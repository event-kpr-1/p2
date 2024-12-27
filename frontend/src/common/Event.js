import React from "react";
import { baseURL, eventURL } from "../constants/url";
import { useQuery , useQueryClient} from "@tanstack/react-query";
import toast from 'react-hot-toast'

const Event = ({ event }) => {
	const {data : authAdmin} = useQuery({queryKey : ['authAdmin']})
  const eventLink = `${eventURL}/${event._id}/home`
  const queryClient = useQueryClient()

  const handleCopy = () => {
    // Try copying the text to the clipboard
    navigator.clipboard.writeText(eventLink)
      .then(() => {
        // Successfully copied
        toast.success('Text copied to clipboard!');
      })
      .catch((error) => {
        // If an error occurred
        console.error('Error copying text: ', error);
        toast.error('Failed to copy text!');
      });
  };

  const handleDeleteEvent = async() => {
    try {
      const res = await fetch(`${baseURL}/api/event/delete/${event._id}`,{
        method : 'DELETE',
        credentials : 'include',
        headers : {
          'Content-Type' : 'application/json'
        }
      });
      if(!res.ok){
        throw new Error (resData.error || 'something went wrong')
      }
      const resData = await res.json();
      toast.success('deleted')
      queryClient.invalidateQueries({
        queryKey : ['getEvents']
      })
      
    } catch (err) {
      toast.error(err.message)
      
    }
  }

  const notifyYesNo = () => {
    toast.custom((t) => (
      <div
        style={{
          padding: '20px',
          borderRadius: '8px',
          background: 'white',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <p>Do you want to delete?</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              handleDeleteEvent()
            }}
            style={{ padding: '8px 16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            Yes
          </button>
          <button
            onClick={() => {
              toast.dismiss(t.id);
            }}
            style={{ padding: '8px 16px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            No
          </button>
        </div>
      </div>
    ));
  };
  
  return (
  

  <div className="mx-auto w-full max-w-sm p-6 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-lg shadow-lg transform transition hover:scale-105 hover:shadow-2xl">
  <div className="text-xl font-bold mb-4 border-b border-white pb-2 flex justify-between">
    <h3>{event.eventName}</h3>
    <div className="flex space-x-4">
      { authAdmin._id === event.createdBy._id &&

        <button className="flex items-center justify-center w-8 h-8 bg-red-600 text-white  hover:bg-red-700 transition duration-300" onClick={notifyYesNo}>
        X
      </button>
      }
      <button className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white  hover:bg-blue-700 transition duration-300" onClick={handleCopy}>
        O
      </button>
    </div>
  </div>
  <p>{event.eventDetails}</p>
  <p>{event.createdBy.username}</p>
</div>

  );
};



export default Event;
