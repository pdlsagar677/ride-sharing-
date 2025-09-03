import React, { useEffect, useRef, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import LookingForDriver from '../components/LookingForDrivers'
import WaitingForDriver from '../components/WaitingForDrivers'
import LiveTracking from '../components/LiveTracking'
import { SocketContext } from '../context/SocketContext'
import { UserDataContext } from '../context/UserContext'

const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)
  const [pickupSuggestions, setPickupSuggestions] = useState([])
  const [destinationSuggestions, setDestinationSuggestions] = useState([])
  const [activeField, setActiveField] = useState(null)
  const [fare, setFare] = useState({})
  const [vehicleType, setVehicleType] = useState(null)
  const [ride, setRide] = useState(null)

  const panelRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)
  const panelCloseRef = useRef(null)

  const navigate = useNavigate()
  const { socket } = useContext(SocketContext)
  const { user } = useContext(UserDataContext)

  useEffect(() => {
    socket.emit('join', { userType: 'user', userId: user._id })

    socket.on('ride-confirmed', (ride) => {
      setVehicleFound(false)
      setWaitingForDriver(true)
      setRide(ride)
    })

    socket.on('ride-started', (ride) => {
      setWaitingForDriver(false)
      navigate('/riding', { state: { ride } })
    })
  }, [socket, user, navigate])

  const handlePickupChange = async (e) => {
    setPickup(e.target.value)
    try {
      const response = await axios.get('http://localhost:3000/api/maps/get-suggestions', {
        params: { input: e.target.value },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      setPickupSuggestions(response.data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value)
    try {
      const response = await axios.get('http://localhost:3000/api/maps/get-suggestions', {
        params: { input: e.target.value },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      setDestinationSuggestions(response.data)
    } catch (err) {
      console.error(err)
    }
  }

  const findTrip = async () => {
    setVehiclePanel(true)
    setPanelOpen(false)
    try {
      const response = await axios.get('http://localhost:3000/api/rides/get-fare', {
        params: { pickup, destination },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      setFare(response.data)
    } catch (err) {
      console.error(err)
    }
  }

  const createRide = async () => {
    try {
      await axios.post(
        'http://localhost:3000/api/rides/create',
        { pickup, destination, vehicleType },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      )
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="h-screen relative bg-gray-50 overflow-hidden">
      {/* Top logo */}
      <img
        className="w-16 absolute left-5 top-5 z-20"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="logo"
      />

      {/* Map / Live Tracking */}
      <LiveTracking />

      {/* Bottom panel */}
      <div className="absolute bottom-0 w-full flex flex-col items-center">
        {/* Trip Input Panel */}
        <div
          className={`w-full bg-white rounded-t-3xl p-6 shadow-lg transition-all duration-300 ${
            panelOpen ? 'h-[400px]' : 'h-[180px]'
          }`}
          ref={panelRef}
        >
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-2xl font-semibold">Find a Trip</h4>
            <button
              ref={panelCloseRef}
              onClick={() => setPanelOpen(false)}
              className="text-gray-600 text-2xl transition-opacity duration-300 opacity-80 hover:opacity-100"
            >
              <i className="ri-arrow-down-wide-line"></i>
            </button>
          </div>

          <form className="relative flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
            <div className="absolute left-5 top-6 h-16 w-1 bg-gray-400 rounded-full"></div>
            <input
              onClick={() => {
                setPanelOpen(true)
                setActiveField('pickup')
              }}
              value={pickup}
              onChange={handlePickupChange}
              className="bg-gray-100 px-12 py-3 rounded-xl w-full text-lg focus:outline-none"
              placeholder="Add a pick-up location"
            />
            <input
              onClick={() => {
                setPanelOpen(true)
                setActiveField('destination')
              }}
              value={destination}
              onChange={handleDestinationChange}
              className="bg-gray-100 px-12 py-3 rounded-xl w-full text-lg focus:outline-none"
              placeholder="Enter your destination"
            />
            <button
              type="button"
              onClick={findTrip}
              className="bg-black text-white py-3 rounded-xl mt-3 w-full font-semibold hover:bg-gray-900 transition-colors"
            >
              Find Trip
            </button>
          </form>

          {/* Suggestions */}
          {panelOpen && (
            <LocationSearchPanel
              suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
              setPanelOpen={setPanelOpen}
              setVehiclePanel={setVehiclePanel}
              setPickup={setPickup}
              setDestination={setDestination}
              activeField={activeField}
            />
          )}
        </div>

        {/* Vehicle Selection Panel */}
        {vehiclePanel && (
          <div className="fixed bottom-0 w-full z-20 transition-transform duration-300 bg-white rounded-t-3xl shadow-lg">
            <VehiclePanel
              selectVehicle={setVehicleType}
              fare={fare}
              setConfirmRidePanel={setConfirmRidePanel}
              setVehiclePanel={setVehiclePanel}
            />
          </div>
        )}

        {/* Confirm Ride Panel */}
        {confirmRidePanel && (
          <div className="fixed bottom-0 w-full z-20 transition-transform duration-300 bg-white rounded-t-3xl shadow-lg">
            <ConfirmRide
              createRide={createRide}
              pickup={pickup}
              destination={destination}
              fare={fare}
              vehicleType={vehicleType}
              setConfirmRidePanel={setConfirmRidePanel}
              setVehicleFound={setVehicleFound}
            />
          </div>
        )}

        {/* Vehicle Found Panel */}
        {vehicleFound && (
          <div className="fixed bottom-0 w-full z-20 transition-transform duration-300 bg-white rounded-t-3xl shadow-lg">
            <LookingForDriver
              createRide={createRide}
              pickup={pickup}
              destination={destination}
              fare={fare}
              vehicleType={vehicleType}
              setVehicleFound={setVehicleFound}
            />
          </div>
        )}

        {/* Waiting For Driver Panel */}
        {waitingForDriver && (
          <div className="fixed bottom-0 w-full z-20 transition-transform duration-300 bg-white rounded-t-3xl shadow-lg">
            <WaitingForDriver
              ride={ride}
              setVehicleFound={setVehicleFound}
              setWaitingForDriver={setWaitingForDriver}
              waitingForDriver={waitingForDriver}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
