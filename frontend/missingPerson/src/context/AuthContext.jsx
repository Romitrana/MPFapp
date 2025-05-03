"use client"

import { createContext, useState, useEffect, useContext } from "react"
import axios from "axios"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      setCurrentUser(user)
      // Set default auth header for axios
      axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`
    }
    setLoading(false)
  }, [])

  const login = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        username,
        password,
      })

      const userData = response.data

      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(userData))

      // Set user in context
      setCurrentUser(userData)

      // Set default auth header for axios
      axios.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`

      return userData
    } catch (error) {
      throw error
    }
  }

  const register = async (username, email, password) => {
    try {
      const response = await axios.post("http://localhost:8080/api/auth/register", {
        username,
        email,
        password,
      })
      return response.data
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem("user")
    delete axios.defaults.headers.common["Authorization"]
    setCurrentUser(null)
  }

  const value = {
    currentUser,
    login,
    register,
    logout,
    isAdmin: currentUser?.roles?.includes("ROLE_ADMIN") || false,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
