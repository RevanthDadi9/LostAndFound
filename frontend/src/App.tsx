import { BrowserRouter, Route, Routes } from "react-router"
import Home from "./components/Home"
import Signup from "./components/Signup"
import Signin from "./components/Signin"
import PostItem from "./components/PostItem"
import LostItems from "./components/LostItems"
import FoundItems from "./components/FoundItems"
import MyListings from "./components/MyListings"
import { AuthProvider } from "./context/authContext"
import AboutPage from "./components/AboutPage"
import Navbar from "./components/Navbar"
import FooterComponent from "./components/Footer"
import ProfilePage from "./components/ProfilePage"


function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/lostitems" element={<LostItems />} />
          <Route path="/founditems" element={<FoundItems />} />
          <Route path="/postitem" element={<PostItem />} />
          <Route path="/mylistings" element={<MyListings />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/contact" element={<FooterComponent />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
