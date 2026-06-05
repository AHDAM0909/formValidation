import React, { useState } from 'react'

const Signup = () => {
  const [formsData, setFormsData] = useState({ 
    fullName: "", 
    email: "", 
    password: "", 
    confirmPassword: "", 
    age: "" 
  })
  const [error, setError] = useState({})
  const [submitted, setSubmitted] = useState(false)

  // Real-time validation function
  const validateField = (fieldName, value) => {
    const newError = { ...error }

    // Validate Full Name
    if (fieldName === "fullName") {
      if (!value.trim()) {
        newError.fullName = "Full name is required"
      } else if (value.trim().length < 3) {
        newError.fullName = "Full name must be at least 3 characters"
      } else {
        delete newError.fullName // Valid - remove error
      }
    }

    // Validate Email
    if (fieldName === "email") {
      if (!value.trim()) {
        newError.email = "Email must be provided"
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
        newError.email = "Invalid email address"
      } else {
        delete newError.email // Valid - remove error
      }
    }

    // Validate Password
    if (fieldName === "password") {
      if (!value.trim()) {
        newError.password = "Password is required"
      } else if (value.trim().length < 8) {
        newError.password = "Password must be at least 8 characters"
      } else {
        delete newError.password // Valid - remove error
      }
    }

    // Validate Confirm Password
    if (fieldName === "confirmPassword") {
      if (!value.trim()) {
        newError.confirmPassword = "Please confirm your password"
      } else if (formsData.password !== value) {
        newError.confirmPassword = "Passwords do not match"
      } else {
        delete newError.confirmPassword // Valid - remove error
      }
    }

    // Validate Age
    if (fieldName === "age") {
      if (!value.trim()) {
        newError.age = "Age is required"
      } else if (isNaN(value) || parseInt(value) < 18) {
        newError.age = "You must be at least 18 years old"
      } else {
        delete newError.age // Valid - remove error
      }
    }

    setError(newError)
  }

  // Handle input changes with real-time validation
  const changeData = (e) => {
    const { name, value } = e.target
    setFormsData({ ...formsData, [name]: value })
    validateField(name, value) // Validate as they type!
  }

  // Check if form is completely valid
  const isFormValid = () => {
    return (
      formsData.fullName.trim() &&
      formsData.email.trim() &&
      formsData.password &&
      formsData.confirmPassword &&
      formsData.age &&
      Object.keys(error).length === 0
    )
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault() // Prevent page refresh

    // Do final validation check on all fields
    let finalErrors = {}
    
    if (!formsData.fullName.trim()) {
      finalErrors.fullName = "Full name is required"
    } else if (formsData.fullName.trim().length < 3) {
      finalErrors.fullName = "Full name must be at least 3 characters"
    }

    if (!formsData.email.trim()) {
      finalErrors.email = "Email must be provided"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formsData.email)) {
      finalErrors.email = "Invalid email address"
    }

    if (!formsData.password.trim()) {
      finalErrors.password = "Password is required"
    } else if (formsData.password.trim().length < 8) {
      finalErrors.password = "Password must be at least 8 characters"
    }

    if (!formsData.confirmPassword.trim()) {
      finalErrors.confirmPassword = "Please confirm your password"
    } else if (formsData.password.trim() !== formsData.confirmPassword.trim()) {
      finalErrors.confirmPassword = "Passwords do not match"
    }

    if (!formsData.age.trim()) {
      finalErrors.age = "Age is required"
    } else if (isNaN(formsData.age) || parseInt(formsData.age) < 18) {
      finalErrors.age = "You must be at least 18 years old"
    }

    // If there are errors, show them
    if (Object.keys(finalErrors).length > 0) {
      setError(finalErrors)
      return
    }

    // No errors - form is valid!
    setError({})
    setSubmitted(true)
  }

  // Reset form to create another account
  const handleResetForm = () => {
    setFormsData({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      age: ""
    })
    setError({})
    setSubmitted(false)
  }

  // SUCCESS SCREEN
  if (submitted) {
    return (
      <div className="w-full max-w-md mx-auto mt-10 border-2 border-green-500 rounded-lg p-8 text-center bg-green-50">
        <h2 className="text-2xl font-bold mb-2 text-green-700">Success!</h2>
        <p className="text-green-700 mb-6">Welcome, {formsData.fullName}! Your account has been created.</p>
        
        <div className="bg-white border border-green-200 rounded-md p-4 mb-6 text-left text-sm">
          <p className="font-semibold text-gray-700 mb-3">Your Information:</p>
          <p><span className="font-semibold">Name:</span> {formsData.fullName}</p>
          <p><span className="font-semibold">Email:</span> {formsData.email}</p>
          <p><span className="font-semibold">Age:</span> {formsData.age} years old</p>
        </div>

        <button
          onClick={handleResetForm}
          className="w-full bg-green-300 hover:bg-green-400 text-white font-bold py-2 px-4 rounded-md transition"
        >
          Create Another Account
        </button>
      </div>
    )
  }

  // SIGNUP FORM
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto border border-gray-300 rounded-lg p-6 mt-10 bg-white">
      <h1 className="text-center text-4xl text-green-300 mb-6 font-serif font-bold">Sign Up</h1>

      {/* Full Name Field */}
      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="fullName" className="font-medium">Full Name</label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          placeholder="Enter your name"
          className={`border rounded-md p-2 focus:outline-none focus:ring-2 transition ${
            error.fullName
              ? 'border-red-400 bg-red-50 focus:ring-red-200'
              : formsData.fullName && !error.fullName
              ? 'border-green-400 bg-green-50 focus:ring-green-200'
              : 'border-gray-300 focus:ring-green-300'
          }`}
          value={formsData.fullName}
          onChange={changeData}
        />
        {error.fullName && <p className="text-red-500 text-sm font-medium">{error.fullName}</p>}
        {formsData.fullName && !error.fullName && <p className="text-green-600 text-sm font-medium"> Looks good!</p>}
      </div>

      {/* Email Field */}
      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="email" className="font-medium">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          className={`border rounded-md p-2 focus:outline-none focus:ring-2 transition ${
            error.email
              ? 'border-red-400 bg-red-50 focus:ring-red-200'
              : formsData.email && !error.email
              ? 'border-green-400 bg-green-50 focus:ring-green-200'
              : 'border-gray-300 focus:ring-green-300'
          }`}
          value={formsData.email}
          onChange={changeData}
        />
        {error.email && <p className="text-red-500 text-sm font-medium">{error.email}</p>}
        {formsData.email && !error.email && <p className="text-green-600 text-sm font-medium"> Valid email!</p>}
      </div>

      {/* Password Field */}
      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="password" className="font-medium">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          className={`border rounded-md p-2 focus:outline-none focus:ring-2 transition ${
            error.password
              ? 'border-red-400 bg-red-50 focus:ring-red-200'
              : formsData.password && !error.password
              ? 'border-green-400 bg-green-50 focus:ring-green-200'
              : 'border-gray-300 focus:ring-green-300'
          }`}
          value={formsData.password}
          onChange={changeData}
        />
        {error.password && <p className="text-red-500 text-sm font-medium"> {error.password}</p>}
        {formsData.password && !error.password && <p className="text-green-600 text-sm font-medium"> Strong password!</p>}
      </div>

      {/* Confirm Password Field */}
      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="confirmPassword" className="font-medium">Confirm Password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          className={`border rounded-md p-2 focus:outline-none focus:ring-2 transition ${
            error.confirmPassword
              ? 'border-red-400 bg-red-50 focus:ring-red-200'
              : formsData.confirmPassword && !error.confirmPassword
              ? 'border-green-400 bg-green-50 focus:ring-green-200'
              : 'border-gray-300 focus:ring-orange-300'
          }`}
          value={formsData.confirmPassword}
          onChange={changeData}
        />
        {error.confirmPassword && <p className="text-red-500 text-sm font-medium">{error.confirmPassword}</p>}
        {formsData.confirmPassword && !error.confirmPassword && <p className="text-green-600 text-sm font-medium"> Passwords match!</p>}
      </div>

      {/* Age Field */}
      <div className="flex flex-col gap-2 mb-6">
        <label htmlFor="age" className="font-medium">Age</label>
        <input
          id="age"
          name="age"
          type="number"
          placeholder="Enter your age"
          className={`border rounded-md p-2 focus:outline-none focus:ring-2 transition ${
            error.age
              ? 'border-red-400 bg-red-50 focus:ring-red-200'
              : formsData.age && !error.age
              ? 'border-green-400 bg-green-50 focus:ring-green-200'
              : 'border-gray-300 focus:ring-orange-300'
          }`}
          value={formsData.age}
          onChange={changeData}
        />
        {error.age && <p className="text-red-500 text-sm font-medium">{error.age}</p>}
        {formsData.age && !error.age && <p className="text-green-600 text-sm font-medium">Age verified!</p>}
      </div>

      {/* Submit Button - Disabled until form is valid */}
      <button
        type="submit"
        disabled={!isFormValid()}
        className={`w-full font-bold py-2 px-4 rounded-md transition ${
          isFormValid()
            ? 'bg-orange-300 hover:bg-orange-400 text-white cursor-pointer'
            : 'bg-green-300 text-green-500 cursor-not-allowed'
        }`}
      >
        {isFormValid() ? 'Create Account' : 'Fill all fields correctly'}
      </button>

      <p className="text-center text-sm text-gray-600 mt-4">
        Already have an account? <a href="#" className="text-green-300 hover:text-green-400">Login</a>
      </p>
    </form>
  )
}

export default Signup