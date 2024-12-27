import React from 'react';
import { baseURL } from '../../constants/url.js';
import Event from '../../common/Event.js';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast'

const AllEventsList = () => {
  const { data: events = [], isLoading, isError, error } = useQuery({
    queryKey: ['getEvents'],
    queryFn: async () => {
      try {
        const res = await fetch(`${baseURL}/api/event/allevents`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const resData = await res.json();
        if (!res.ok) {
          throw new Error(resData.error || 'Something went wrong');
        }
        return resData;
      } catch (err) {
        toast.error(err.message);
        
      }
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
        <p className="text-white text-2xl">Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
        <p className="text-white text-2xl">Error: {error.message}</p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
        <p className="text-white text-2xl">No events found.</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="w-full max-w-5xl p-6">
        <h1 className="text-3xl font-extrabold text-center text-white mb-8">
          Event List
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <Event key={index} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllEventsList;
