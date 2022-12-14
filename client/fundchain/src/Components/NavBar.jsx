

import "../Styles/NavBar.css"
import { useContext } from "react"
import { WalletContext } from "../Context/WalletContext"
import { Link } from "react-router-dom"
import { Card,Button } from '@mui/material'
import Brightness4 from '@mui/icons-material/Brightness4';
import Brightness7 from "@mui/icons-material/Brightness7"


export default function NavBar() {

  const { ConnectWallet, connectedAccount,mode,setMode } = useContext(WalletContext);

  return (

    <Card sx={{boxShadow: 2, display: "flex",padding: 1,flexdirection: "row",width: 1}}>
      <div className="NavLeft">
        <div className="Title" >
          <Link to="/">🤝FundChain</Link>
        </div>
      </div>

      <div className="NavRight">

        <div className="CreateCampaign">
          <Button variant="contained" size="small">
            <Link to="/newCampaign">Create Campaign</Link>
          </Button>
        </div>

        <div className="HowitWorks" >
          <Button variant="contained" size="small">
            <Link to="/howitworks"> How it Works</Link>
          </Button>
        </div>

        <div className="Wallet">

          {connectedAccount ? (
            <div>
              <Button  size="small" variant="contained">{connectedAccount}</Button>
            </div>
          ) : (
            <div>
              <Button size="small"  onClick={() => {
                ConnectWallet();
              }}>
                Connect to MetaMask
              </Button>
            </div>
          )}
        </div>

        <div className="Wallet">

          {mode == 'dark' ? (
              <Brightness4  onClick={()=>{
                setMode('light')
              }}>

              </Brightness4>
          ) : (
            <div>
              <Brightness7 onClick={()=>{
                setMode('dark');
              }
              }></Brightness7>
            </div>
          )}
        </div>
      </div>
    </Card >
  );
}