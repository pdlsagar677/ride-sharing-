import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'
import { Eye, EyeOff, Car, User, Mail, Lock, Shield } from 'lucide-react'
import { toast } from 'react-toastify';

const UserSignup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const { setUser } = useContext(UserDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email,
      password
    }

    try {
      const response = await axios.post('http://localhost:3000/api/users/register', newUser)

      if (response.status === 201) {
        const data = response.data
        setUser(data.user)
        localStorage.setItem('token', data.token)

        toast.success('Sign up successful! ', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        navigate('/home')
      }
    } catch (error) {
      console.error('Signup error:', error)
    } finally {
      setIsLoading(false)
      setEmail('')
      setFirstName('')
      setLastName('')
      setPassword('')
    }
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4" 
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f97316"/><path d="M30,40 C50,20 70,40 70,60 C70,80 50,100 30,80 C10,60 10,40 30,40 Z" fill="%23ff8c00" opacity="0.4"/><path d="M20,20 C40,0 60,20 60,40 C60,60 40,80 20,60 C0,40 0,20 20,20 Z" fill="%23fdba74" opacity="0.2"/></svg>')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-black py-4 px-6">
          <Link to="/" className="flex items-center text-2xl font-bold">
            <div className="bg-orange-500 p-2 rounded-md mr-3">
              <Car className="text-white" size={24} />
            </div>
            <span className="text-white">Ride</span>
            <span className="text-orange-500">Nepal</span>
          </Link>
        </div>

        {/* Form */}
        <div className="px-8 py-8">
          <h1 className="text-2xl font-bold mb-2 text-gray-900">Create your account</h1>
          <p className="text-gray-600 mb-6">Join Nepal's premier ride-sharing service</p>

          <form onSubmit={submitHandler} className="space-y-4">
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

            <div className="flex items-center text-sm">
              <Shield className="text-orange-500 mr-2" size={16} />
              <span className="text-gray-600">Your data is securely encrypted</span>
            </div>

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
              ) : 'Create account'}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Already have an account? <Link to='/login' className="text-orange-600 font-medium hover:underline">Login here</Link>
          </p>
        </div>

        {/* Captain Section */}
        <div className="bg-gray-50 px-8 py-6 border-t">
          <div className="flex items-center justify-center mb-2">
            <h3 className="text-lg font-semibold text-gray-900">Are you a Captain?</h3>
          </div>
          <p className="text-sm text-gray-600 text-center mb-4">
            Drive with RideNepal and earn by sharing rides with thousands of passengers.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/captain-login" className="px-4 py-2 bg-black text-white rounded-lg hover:bg-orange-600">Rider Login</Link>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 px-8 py-4">
          <p className="text-xs text-gray-500 text-center">
            This site is protected by reCAPTCHA and the Google <span className="underline">Privacy Policy</span> and <span className="underline">Terms of Service</span> apply.
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserSignup
