
import './App.css';
import NavBar from "./Components/NavBar"
import {useContext} from "react"
import {WalletContext} from "./Context/WalletContext"

function App() {

  const {connectedAccount} = useContext(WalletContext);
  return (
    <>
      <p>{connectedAccount}</p>
      <NavBar></NavBar>
    </>
  )
}

export default App;
