import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import Login from './pages/Login/Login'
import Setting from "./pages/Setting/Setting"

function App() {

  return (
<BrowserRouter>
<Routes>
  <Route path="/" element={<Layout />}></Route>
  <Route index element={<Login />} />
  <Route path="/setting" element={<Setting />} />
</Routes>
</BrowserRouter>
  )
}

export default App
