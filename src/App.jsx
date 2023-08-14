import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import Register from "./components/Register"
import Content from "./components/Content"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/content" element={<Content />} />
        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App