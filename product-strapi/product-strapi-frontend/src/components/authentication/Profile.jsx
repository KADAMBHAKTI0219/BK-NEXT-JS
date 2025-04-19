"use client"
import { profileUserData } from '@/lib/authApi'
import React, { useEffect, useState } from 'react'
import Layout from '../layout'

const Profile = () => {
    const [profile, setProfile] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        profileUserData()
            .then(res => {
                setProfile(res)
                setIsLoading(false)
            })
            .catch(err => {
                console.error(err)
                setError('Failed to fetch profile data')
                setIsLoading(false)
            })
    }, [])

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <div className="text-gray-600 text-lg">Loading...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <div className="text-red-500 text-lg">{error}</div>
            </div>
        )
    }

    return (
        <Layout>
               <div className="flex items-center justify-center p-4 mt-16">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">User Profile</h2>
                <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <span className="text-3xl font-semibold text-blue-600">
                        {profile?.username?.charAt(0).toUpperCase() || 'U'}
                    </span>
                </div>
                <div className="text-center space-y-3 w-full">
                    <div>
                        <h3 className="text-sm font-medium text-gray-600">Username</h3>
                        <p className="text-lg text-gray-800">{profile?.username || 'N/A'}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-600">Email</h3>
                        <p className="text-lg text-gray-800">{profile?.email || 'N/A'}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-600">Joined</h3>
                        <p className="text-lg text-gray-800">
                            {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => localStorage.clear() & window.location.reload()}
                    className="mt-6 w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200 transform hover:scale-105"
                >
                    Logout
                </button>
            </div>
        </div>
        </Layout>
    )
}

export default Profile