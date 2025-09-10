import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import Login from './pages/Login/Login'
import Setting from "./pages/Setting/Setting"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "./redux/store"
import { useEffect } from "react"
import { loadToken } from "./redux/authSlice"
import Signup from "./pages/Signup/Signup"

function App() {

const dispatch = useDispatch<AppDispatch>()

useEffect(() => {
  dispatch(loadToken())
},[dispatch])

  return (
<BrowserRouter>
<Routes>
  <Route path="/" element={<Layout />}></Route>
  <Route index element={<Login />} />
  <Route path="/login" element={<Login />} />
  <Route path="/setting" element={<Setting />} />
  <Route path="/signup" element={<Signup />} />
</Routes>
</BrowserRouter>
  )
}

export default App
