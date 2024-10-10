import React from 'react'
import { useLocation } from 'react-router-dom'

function Home() {

    const location=useLocation();
  return (
    <div>
      <h1>HELLO BRO</h1>
    </div>
  )
}

export default Home
