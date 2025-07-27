import React from 'react'
import { Link } from "react-router-dom";
import { Login } from "./auth/Login"

function App() {
  return (
    <>
      <Link to="/login"><Login /></Link>
    </>
  )
}

export default App
