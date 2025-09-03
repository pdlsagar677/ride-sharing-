import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'
import { Eye, EyeOff, Car, User, Mail, Lock, Shield, Car as Vehicle, Palette, Hash, Users } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const CaptainSignup = () => {
  const navigate = useNavigate()
  const { setCaptain } = useContext(CaptainDataContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')

  const submitHandler = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const captainData = {
      fullname: {
        firstname: firstName.trim(),
        lastname: lastName.trim(),
      },
      email: email.trim(),
      password: password,
      vehicle: {
        color: vehicleColor.trim(),
        plate: vehiclePlate.trim(),
        capacity: Number(vehicleCapacity), // ✅ ensure it's a number
        vehicleType: vehicleType
      }
    }

    console.log("🚀 Sending captainData:", captainData) // ✅ debug log

    try {
      const response = await axios.post('http://localhost:3000/api/captain/register', captainData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.status === 201) {
        const data = response.data
        setCaptain(data.captain)
        localStorage.setItem('token', data.token)
        toast.success('Captain account created successfully!')
        navigate('/captain-home')
      }
    } catch (error) {
      console.error('Signup error:', error)
      if (error.response?.status === 400) {
        toast.error('Invalid data. Please check your inputs.')
      } else if (error.response?.status === 409) {
        toast.error('An account with this email already exists.')
      } else {
        toast.error('Something went wrong, please try again later.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-black py-4 px-6">
          <div className="flex items-center">
            <div className="bg-orange-500 p-2 rounded-md mr-3">
              <Car className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold">
              <span className="text-white">Ride</span>
              <span className="text-orange-500">Nepal</span>
              <span className="text-white text-sm ml-2">Captain</span>
            </h1>
          </div>
        </div>

        <div className="px-8 py-6">
          <h1 className="text-2xl font-bold mb-2 text-gray-900">Become a Captain</h1>
          <p className="text-gray-600 mb-6">Join our team of professional drivers</p>

          {/* Form */}
          <form onSubmit={submitHandler} className="space-y-4">
            {/* First/Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    id="firstname"
                    required
                    className="pl-10 bg-gray-50 w-full rounded-lg px-4 py-3 border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
              </div>

              <div className="relative">
                <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    id="lastname"
                    required
                    className="pl-10 bg-gray-50 w-full rounded-lg px-4 py-3 border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-gray-50 w-full rounded-lg px-4 py-3 border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  type="email"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  className="pl-10 bg-gray-50 w-full rounded-lg px-4 py-3 border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                />
                <button 
                  type="button" 
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Vehicle Info */}
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-lg font-medium mb-4 text-gray-900">Vehicle Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <label htmlFor="vehicleColor" className="block text-sm font-medium text-gray-700 mb-1">Vehicle Color</label>
                  <div className="relative">
                    <Palette className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      id="vehicleColor"
                      required
                      className="pl-10 bg-gray-50 w-full rounded-lg px-4 py-3 border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      type="text"
                      placeholder="Vehicle Color"
                      value={vehicleColor}
                      onChange={(e) => setVehicleColor(e.target.value)}
                    />
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="vehiclePlate" className="block text-sm font-medium text-gray-700 mb-1">License Plate</label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      id="vehiclePlate"
                      required
                      className="pl-10 bg-gray-50 w-full rounded-lg px-4 py-3 border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      type="text"
                      placeholder="Vehicle Plate"
                      value={vehiclePlate}
                      onChange={(e) => setVehiclePlate(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="relative">
                  <label htmlFor="vehicleCapacity" className="block text-sm font-medium text-gray-700 mb-1">Passenger Capacity</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      id="vehicleCapacity"
                      required
                      className="pl-10 bg-gray-50 w-full rounded-lg px-4 py-3 border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      type="number"
                      placeholder="Capacity"
                      value={vehicleCapacity}
                      onChange={(e) => setVehicleCapacity(e.target.value)}
                    />
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
                  <div className="relative">
                    <Vehicle className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <select
                      id="vehicleType"
                      required
                      className="pl-10 bg-gray-50 w-full rounded-lg px-4 py-3 border border-gray-300 text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none"
                      value={vehicleType}
                      onChange={(e) => setVehicleType(e.target.value)}
                    >
                      <option value="" disabled>Select Vehicle Type</option>
                      <option value="car">Car</option>
                      <option value="auto">Auto</option>
                      <option value="motorcycle">Motorcycle</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Note */}
            <div className="flex items-center text-sm">
              <Shield className="text-orange-500 mr-2" size={16} />
              <span className="text-gray-600">Your information is securely stored</span>
            </div>

            {/* Submit */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-black text-white font-semibold rounded-lg px-4 py-3 text-lg hover:bg-orange-600 transition duration-300 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </>
              ) : 'Create Captain Account'}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Already have an account? <Link to='/captain-login' className="text-orange-600 font-medium hover:underline">Login here</Link>
          </p>
        </div>

        <div className="bg-gray-100 px-8 py-4">
          <p className="text-xs text-gray-500 text-center">
            This site is protected by reCAPTCHA and the Google <span className="underline">Privacy Policy</span> and <span className="underline">Terms of Service</span> apply.
          </p>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastStyle={{
          background: "#000",
          color: "#fff",
          border: "1px solid #f97316"
        }}
        progressStyle={{
          background: "#f97316"
        }}
      />
    </div>
  )
}

export default CaptainSignup
