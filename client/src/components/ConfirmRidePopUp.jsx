import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const ConfirmRidePopUp = (props) => {
  const [otp, setOtp] = useState('')
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()

    const response = await axios.get(`http://localhost:3000/api/rides/start-ride`, {
      params: {
        rideId: props.ride._id,
        otp: otp
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    if (response.status === 200) {
      props.setConfirmRidePopupPanel(false)
      props.setRidePopupPanel(false)
      navigate('/captain-riding', { state: { ride: props.ride } })
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 relative">
        {/* Close Button */}
        <button
          onClick={() => props.setConfirmRidePopupPanel(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <i className="ri-close-line text-2xl"></i>
        </button>

        {/* Header */}
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-5">
          Confirm this ride to Start
        </h3>

        {/* Rider Info */}
        <div className="flex items-center justify-between p-4 border border-yellow-400 rounded-lg bg-yellow-50">
          <div className="flex items-center gap-3">
            <img
              className="h-12 w-12 rounded-full object-cover border"
              src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"
              alt="Rider"
            />
            <h2 className="text-lg font-semibold text-gray-900 capitalize">
              {props.ride?.user.fullname.firstname}
            </h2>
          </div>
          <h5 className="text-lg font-bold text-gray-900">2.2 KM</h5>
        </div>

        {/* Ride Details */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-4 border-b pb-3">
            <i className="ri-map-pin-user-fill text-orange-500 text-xl"></i>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Pickup</h3>
              <p className="text-sm text-gray-600">{props.ride?.pickup}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 border-b pb-3">
            <i className="ri-map-pin-2-fill text-red-500 text-xl"></i>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Destination</h3>
              <p className="text-sm text-gray-600">{props.ride?.destination}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <i className="ri-currency-line text-green-600 text-xl"></i>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                ₹{props.ride?.fare}
              </h3>
              <p className="text-sm text-gray-600">Cash Payment</p>
            </div>
          </div>
        </div>

        {/* OTP Input */}
        <form onSubmit={submitHandler} className="mt-6 space-y-3">
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            type="text"
            className="w-full bg-gray-100 px-5 py-3 rounded-lg font-mono text-lg border focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter OTP"
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg px-4 py-3 text-lg transition duration-300"
          >
            Confirm Ride
          </button>
          <button
            type="button"
            onClick={() => {
              props.setConfirmRidePopupPanel(false)
              props.setRidePopupPanel(false)
            }}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg px-4 py-3 text-lg transition duration-300"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  )
}

export default ConfirmRidePopUp
