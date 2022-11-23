

import "../Styles/NavBar.css"
import { useContext } from "react"
import { WalletContext } from "../Context/WalletContext"
import { Link } from "react-router-dom"


export default function NavBar() {

  const { ConnectWallet, connectedAccount } = useContext(WalletContext);

  return (

    <div className="NavBar">
      <div className="Left">
        <div className="Title" >
          <Link to="/">🤝FundChain</Link>
        </div>
      </div>

      <div className="Right">

        <div className="CreateCampaign">
          <button>
            <Link to="/newCampaign">Create Campaign</Link>
          </button>
        </div>

        <div className="HowitWorks" >
          <button>
            <Link href="/#howitworks"> How it Works</Link>
          </button>
        </div>

        <div className="Wallet">

          {connectedAccount ? (
            <div>
              <button>{connectedAccount}</button>
            </div>
          ) : (
            <div>
              <button onClick={() => {
                ConnectWallet();
              }}>
                Connect to MetaMask
              </button>
            </div>
          )}
        </div>
      </div>
    </div >
  );
}