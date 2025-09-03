import React from 'react'

const RidePopUp = (props) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 relative">
        {/* Close Button */}
        <button
          onClick={() => props.setRidePopupPanel(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <i className="ri-close-line text-2xl"></i>
        </button>

        {/* Header */}
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-5">
          🚖 New Ride Available!
        </h3>

        {/* Rider Info */}
        <div className="flex items-center justify-between p-4 border border-yellow-400 rounded-lg bg-yellow-50">
          <div className="flex items-center gap-3">
            <img
              className="h-12 w-12 rounded-full object-cover border"
              src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"
              alt="User"
            />
            <h2 className="text-lg font-semibold text-gray-900 capitalize">
              {props.ride?.user.fullname.firstname +
                " " +
                props.ride?.user.fullname.lastname}
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
              <h3 className="text-lg font-semibold text-gray-900">
                Destination
              </h3>
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

        {/* Buttons */}
        <div className="mt-6 space-y-3">
          <button
            onClick={() => {
              props.setConfirmRidePopupPanel(true)
              props.confirmRide()
            }}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg px-4 py-3 text-lg transition duration-300"
          >
            Accept Ride
          </button>

          <button
            onClick={() => props.setRidePopupPanel(false)}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg px-4 py-3 text-lg transition duration-300"
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  )
}

export default Ri
