
import './App.css';
import NavBar from "./Components/NavBar"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import CreateCampaign from './Components/CreateCampaign';
import Home from './Components/Home';
import ShowDetails from './Components/ShowDetails';

function App() {

  return (
    <> 
    <Router>
    <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/newCampaign' element={<CreateCampaign/>} />
        <Route path='/:id' element={<ShowDetails/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App;
