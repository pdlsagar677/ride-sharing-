import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import LiveTracking from '../components/LiveTracking'

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false)
  const location = useLocation()
  const rideData = location.state?.ride

  return (
    <div className='h-screen relative flex flex-col justify-end'>

      {/* Header */}
      <div className='fixed p-6 top-0 flex items-center justify-between w-screen z-20'>
        <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="logo" />
        <Link to='/captain-home' className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      {/* Ride Info & Complete Button */}
      <div 
        className='h-1/5 p-6 flex items-center justify-between relative bg-yellow-400 pt-10 cursor-pointer'
        onClick={() => setFinishRidePanel(true)}
      >
        <h5 className='p-1 text-center w-[90%] absolute top-0'>
          <i className="text-3xl text-gray-800 ri-arrow-up-wide-line"></i>
        </h5>
        <h4 className='text-xl font-semibold'>{'4 KM away'}</h4>
        <button className='bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>Complete Ride</button>
      </div>

      {/* Finish Ride Panel */}
      <div 
        className={`fixed w-full z-[500] bottom-0 bg-white px-3 py-10 pt-12 transition-transform duration-300 ${
          finishRidePanel ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <FinishRide
          ride={rideData}
          setFinishRidePanel={setFinishRidePanel}
        />
      </div>

      {/* Live Tracking Background */}
      <div className='h-screen fixed w-screen top-0 z-[-1]'>
        <LiveTracking />
      </div>
    </div>
  )
}

export default CaptainRiding
