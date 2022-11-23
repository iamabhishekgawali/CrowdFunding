
import './App.css';
import NavBar from "./Components/NavBar"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import CreateCampaign from './Components/CreateCampaign';
import Home from './Components/Home';
function App() {

  return (
    <>
    <Router>
    <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/newCampaign' element={<CreateCampaign/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App;
