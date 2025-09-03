import React, { useContext } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext)

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover border border-gray-200"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s"
            alt="Captain Avatar"
          />
          <h4 className="text-lg font-semibold capitalize text-gray-900">
            {captain.fullname.firstname + ' ' + captain.fullname.lastname}
          </h4>
        </div>
        <div className="text-right">
          <h4 className="text-xl font-bold text-gray-900">₹295.20</h4>
          <p className="text-sm text-gray-500">Earned</p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-around mt-8 bg-gray-50 rounded-lg p-4">
        <div className="text-center">
          <i className="ri-timer-2-line text-2xl text-gray-700 mb-1"></i>
          <h5 className="text-lg font-medium text-gray-900">10.2</h5>
          <p className="text-sm text-gray-500">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="ri-speed-up-line text-2xl text-gray-700 mb-1"></i>
          <h5 className="text-lg font-medium text-gray-900">25</h5>
          <p className="text-sm text-gray-500">Trips Completed</p>
        </div>
        <div className="text-center">
          <i className="ri-booklet-line text-2xl text-gray-700 mb-1"></i>
          <h5 className="text-lg font-medium text-gray-900">4.9</h5>
          <p className="text-sm text-gray-500">Rating</p>
        </div>
      </div>
    </div>
  )
}

export default CaptainDetails
