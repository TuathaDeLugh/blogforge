'use client'
import React from 'react'
import { Toaster } from 'react-hot-toast';

export default function Toast() {
  return (
    <Toaster 
    position="top-center"
    toastOptions={{duration: 5000 
    }} />
  )
}
