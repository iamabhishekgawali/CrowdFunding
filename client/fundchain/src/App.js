
import './App.css';
import NavBar from "./Components/NavBar"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import CreateCampaign from './Components/CreateCampaign';
import Home from './Components/Home';
import ShowDetails from './Components/ShowDetails';
import { WalletContext } from './Context/WalletContext';
import {useContext,useEffect} from "react"
import ConnectWallet from './Components/ConnectWallet';


function App() {

  const {connectedAccount} = useContext(WalletContext)
  console.log("Hello world")
  return (
    <Router>
    <NavBar/>
   
    {
      !connectedAccount ? (<ConnectWallet/>) : 
      (<Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/newCampaign' element={<CreateCampaign/>} />
        <Route path='/:id' element={<ShowDetails/>}/>
      </Routes>)
    }
    </Router>
  )
}

export default App;
